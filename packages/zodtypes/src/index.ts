import { z } from 'zod';

const LoginFormSchema = z.object({
    phone: z.string().min(1, "Phone number is required").regex(/^\d{3}-\d{3}-\d{4}$/, "Phone number must be in the format xxx-xxx-xxxx"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});
const SignUpFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(2, "Name should be at least 2 characters"),
    phone: z.string().min(1, "Phone number is required").regex(/^\d{3}-\d{3}-\d{4}$/, "Phone number must be in the format xxx-xxx-xxxx"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm password should be at least 8 characters"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
const RAMPTransactionFormSchema = z.object({
    provider: z.enum(["HDFC", "CHASE", "BANK_OF_AMERICA", "ICICI", "GOLDMAN_SACHS", "Select Options"], {
        required_error: "Please select a valid provider.",
    }),
    amount: z.number({
        required_error: "Please enter an amount",
    }).int().min(1, { message: "Amount must be at least 1" }).max(1000000, { message: "Amount must be at most 1,000,000" }),
})
const P2PTransferFormSchema = z.object({
    email: z.string().email("Invalid email address").optional(),
    phone: z.string().min(12, "Phone number is required")
        .regex(/^\d{3}-\d{3}-\d{4}$/, "Phone number must be in the format xxx-xxx-xxxx").optional(),
    amount: z.number({
        required_error: "Please enter an amount"
    }).int().min(1, { message: "Amount must be at least 1" })
        .max(1000000, { message: "Amount must be at most 1,000,000" }),
}).refine(data => data.email || data.phone, {
    message: "Either email or phone must be provided",
});


export {
    LoginFormSchema,
    SignUpFormSchema,
    RAMPTransactionFormSchema,
    P2PTransferFormSchema
}