"use server"
import db from "@repo/db";
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError } from "@repo/db";
import bcrypt from "bcrypt";

interface ISignupProps {
    name: string;
    phone: string;
    password: string;
    email: string;
}

const identifyTypeOfError = (e: any) => {
    if (e.errorCode) {
        return e as PrismaClientInitializationError;
    } else if (e.code) {
        return e as PrismaClientKnownRequestError;
    } else {
        return e as PrismaClientRustPanicError || PrismaClientUnknownRequestError;
    }
}

const mapPrismaErrorToMessage = (error: PrismaClientKnownRequestError) => {
    switch (error.code) {
        case "P1000":
            return "Authentication failed. Please check your database credentials.";
        case "P1001":
            return "Can't reach database server. Please ensure it's running.";
        case "P1002":
            return "Database server timed out. Please try again later.";
        case "P1003":
            return "Database does not exist.";
        case "P2002":
            return "Unique constraint violation. This email or phone number is already in use.";
        case "P2003":
            return "Foreign key constraint failed.";
        case "P2025":
            return "An operation failed because it depends on one or more records that were required but not found.";
        default:
            return "An unexpected error occurred. Please try again later.";
    }
};
const signUp = async (signupProp: ISignupProps) => {

    const hashPassword = bcrypt.hashSync(signupProp.password, 10)
    try {
        const user = await db.user.create({
            data: {
                name: signupProp.name,
                number: signupProp.phone,
                password: hashPassword,
                email: signupProp.email,
                phoneAndPasswordRegistered: true
            }
        })
        return {
            id: user.id.toString(),
            name: user.name,
            email: user.number
        } as any;
    } catch (e: any) {
        const error = identifyTypeOfError(e);
        if (error && error instanceof PrismaClientKnownRequestError) {
            const errorMessage = mapPrismaErrorToMessage(error);
            throw new Error(errorMessage);
        }
        throw new Error("Signup failed.");
    }
}

export {
    signUp
}