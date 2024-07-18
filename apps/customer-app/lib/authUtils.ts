import bcrypt from "bcrypt";
import { User } from "next-auth";
import db from "@repo/db";

const generatePassword = (user: User): string => {
    // Combine user information to create a unique password
    const rawPassword = `${user.id}-${user.name}-${user.email}`;
    return rawPassword;
};

const hashPassword = (password: string): string => {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
};

const createAndHashPassword = (user: User): string => {
    const rawPassword = generatePassword(user);
    const hashedPassword = hashPassword(rawPassword);
    return hashedPassword;
};

const generateUUIDPhoneNumber = (): string => {
    // Generate a UUID
    const uuid = crypto.randomUUID();
    // Extract digits from the UUID and format it as a phone number
    const digits = uuid.replace(/\D/g, '').slice(0, 10);
    const phoneNumber = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;

    return phoneNumber;
};

const isPhoneNumberUnique = async (phoneNumber: string): Promise<boolean> => {
    const existingUser = await db.user.findUnique({
        where: { number: phoneNumber },
    });
    return !existingUser;
};
const generateUniquePhoneNumber = async (): Promise<string> => {
    let phoneNumber = "";
    let isUnique = false;
    while (!isUnique) {
        phoneNumber = generateUUIDPhoneNumber();
        isUnique = await isPhoneNumberUnique(phoneNumber);
    }
    return phoneNumber;
};

const createAccountForGoogleOrGitHub = async (user: User) => {
    const hashedPassword = createAndHashPassword(user);
    const newPhoneNumber = await generateUniquePhoneNumber();
    const email = user.email as string
    const name = user.name as string
    try {
        const user = await db.user.upsert({
            where: { email: email },
            update: {
                name: name,
                number: newPhoneNumber,
                password: hashedPassword,
            },
            create: {
                name: name,
                number: newPhoneNumber,
                password: hashedPassword,
                email: email,
                phoneAndPasswordRegistered: false
            },
        });
        return {
            user
        };
    } catch (e) {
        console.log(e)
    }

    return null;

}


export {
    createAccountForGoogleOrGitHub
}