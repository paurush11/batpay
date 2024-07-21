/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler deploy src/index.ts --name my-worker` to deploy your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { ExecutionContext } from '@cloudflare/workers-types';
import { Client } from '@neondatabase/serverless';

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	DATABASE_URL: string;
}

async function handleOnRampTransaction(token: string, client: Client) {
	try {
		await client.query('BEGIN');
		const onRampTransactionResult = await client.query(
			'UPDATE "OnRampTransaction" SET "status" = $1 WHERE "token" = $2 RETURNING *',
			['COMPLETED', token]
		);
		if (onRampTransactionResult.rowCount === 0) {
			await client.query('ROLLBACK');
			return new Response(JSON.stringify({ message: 'Token not found' }), { status: 404 });
		}
		const userId = onRampTransactionResult.rows[0].userId;
		const lockedBalanceResult = await client.query(
			'SELECT * FROM "Balance" WHERE "userId" = $1 AND "locked" = $2 AND "version" = $3 AND "status" = $4 FOR UPDATE',
			[userId, true, 1, 'LOCKED_FOR_TRANSACTION']
		);
		if (lockedBalanceResult.rowCount === 0) {
			await client.query('ROLLBACK');
			return new Response(JSON.stringify({ message: 'Balance not found or conditions not met' }), { status: 404 });
		}
		await client.query(
			'UPDATE "Balance" SET "status" = $1 , "version" = "version" + 1 WHERE "userId" = $2 AND "locked" = $3 AND "version" = $4 AND "status" = $5',
			['COMPLETED_FOR_TRANSACTION', userId, true, 1, 'LOCKED_FOR_TRANSACTION']
		);
		await client.query('COMMIT');
		return new Response(JSON.stringify({ message: 'Webhook received', result: onRampTransactionResult.rows[0] }), { status: 200 });

	} catch (error: any) {
		await client.query('ROLLBACK');
		return new Response(JSON.stringify({ message: 'Transaction failed', error: error.message }), { status: 500 });
	} finally {
		await client.end();
	}

}
async function handleP2PTransaction(transactionId: string, client: Client) {
	try {
		await client.query('BEGIN');
		const p2pTransactionResult = await client.query(
			'UPDATE "P2PTransaction" SET "status" = $1 WHERE "id" = $2 AND "status" = $3 RETURNING *',
			['COMPLETED', transactionId, 'PENDING']
		);
		if (p2pTransactionResult.rowCount === 0) {
			await client.query('ROLLBACK');
			return new Response(JSON.stringify({ message: 'Transaction not found or not pending' }), { status: 404 });
		}
		const { fromUserId, toUserId, amount } = p2pTransactionResult.rows[0];
		const fromUserBalanceResult = await client.query(
			'SELECT * FROM "Balance" WHERE "userId" = $1 AND "locked" = $2 FOR UPDATE',
			[fromUserId, false]
		);
		if (fromUserBalanceResult.rowCount === 0) {
			// No unlocked balance exists, create a new balance
			await client.query(
				'INSERT INTO "Balance" ("amount", "userId", "locked", "version", "decimal", "status") VALUES ($1, $2, $3, $4, $5, $6)',
				[amount, fromUserId, false, 0, 2, 'NEW']
			);
		} else {
			// Increment the existing unlocked balance
			await client.query(
				'UPDATE "Balance" SET "amount" = "amount" + $1 WHERE "userId" = $2 AND "locked" = $3',
				[amount, fromUserId, false]
			);
		}
		await client.query(
			'UPDATE "Balance" SET "status" = $1, "version" = "version" + 1 WHERE "userId" = $2 AND "version" = $3 AND "status" = $4',
			['COMPLETED_FOR_TRANSACTION', toUserId, 0, 'LOCKED_FOR_TRANSACTION']
		);
		// Commit transaction
		await client.query('COMMIT');
		return new Response(JSON.stringify({ message: 'Transaction processed', result: p2pTransactionResult.rows[0] }), { status: 200 });
	} catch (error: any) {
		await client.query('ROLLBACK');
		return new Response(JSON.stringify({ message: 'Transaction failed', error: error.message }), { status: 500 });
	} finally {
		await client.end();
	}
}
export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const client = new Client(env.DATABASE_URL);
		await client.connect();

		if (request.method === 'POST') {
			const url = new URL(request.url);
			const body: any = await request.json();
			const pathname = url.pathname;
			if (pathname === '/webhookRAMP') {
				const { token } = body;
				return handleOnRampTransaction(token, client);

			} else if (pathname === "/p2pTransactionWebhook") {
				const { transactionId } = body;
				return handleP2PTransaction(transactionId, client);
			}
		}
		await client.end();

		return new Response(JSON.stringify({
			message: 'Invalid request'
		}), { status: 400 });
	}
};
