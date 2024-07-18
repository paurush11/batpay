import db from '@repo/db';
import bcrypt from 'bcrypt';

export interface IRequestToken {
    provider: string;
    amount: number;
    userId: string;
}

export interface IResponseToken {
    token: string;
}

const generateToken = (provider: string, amount: number): string => {
    const hash = bcrypt.hashSync(provider + amount.toString(), 10)
    return hash;
};

const processToken = async (data: IRequestToken): Promise<IResponseToken> => {
    const token = generateToken(data.provider, data.amount);
    try {
        await db.bankToken.create({
            data: {
                userId: data.userId,
                token,
                amount: data.amount,
                timeGenerated: new Date(),
                isUsed: false,
            }
        })
        return { token };
    } catch (E) {
        console.log(E)
        throw new Error("Something went wrong")
    }
};

export {
    processToken
};
