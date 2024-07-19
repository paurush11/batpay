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
				try {
					const result = await client.query(
						'UPDATE "onRampTransaction" SET "status" = $1 WHERE "token" = $2 RETURNING *',
						['COMPLETED', token]
					);
					await client.end();

					if (result.rowCount === 0) {
						return new Response(JSON.stringify({ message: 'Token not found' }), { status: 404 });
					}

					return new Response(JSON.stringify({ message: 'Webhook received', result: result.rows[0] }), { status: 200 });
				} catch (e: any) {
					await client.end();
					return new Response(JSON.stringify({ message: 'Error while processing payment', error: e.message }), { status: 411 });
				}

			} else if (pathname === '/webhook') {
				const { amount, provider, userId } = body;
				try {
					await client.query('BEGIN');
					// Locking the row for transaction
					const lockResult = await client.query(
						'SELECT * FROM "Balance" WHERE "userId" = $1 FOR UPDATE',
						[userId]
					);

					if (lockResult.rowCount === 0) {
						await client.query('ROLLBACK');
						await client.end();
						return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
					}

					const balance = lockResult.rows[0];
					if (!balance.amount || balance.amount < amount) {
						await client.query('ROLLBACK');
						await client.end();
						throw new Error("Insufficient balance");
					}

					await client.query(
						'UPDATE "Balance" SET "amount" = "amount" - $1 WHERE "userId" = $2',
						[amount, userId]
					);

					const updateResult = await client.query(
						'UPDATE "onRampTransaction" SET "status" = $1 WHERE "userId" = $2 AND "amount" = $3 AND "provider" = $4 AND "status" = $5 RETURNING *',
						['AUTHORIZED', userId, amount, provider, 'PROCESSING']
					);

					if (updateResult.rowCount === 0) {
						await client.query('ROLLBACK');
						await client.end();
						return new Response(JSON.stringify({ message: 'Transaction not found or already processed' }), { status: 404 });
					}

					await client.query('COMMIT');
					await client.end();

					return new Response(JSON.stringify({ message: 'Webhook received', result: updateResult.rows[0] }), { status: 200 });
				} catch (e: any) {
					await client.query('ROLLBACK');
					await client.end();
					return new Response(JSON.stringify({ message: 'Error while processing payment', error: e.message }), { status: 411 });
				}
			}
		}
		
		return new Response(JSON.stringify({
			message: 'Invalid request'
		}), { status: 400 });
	}
};
