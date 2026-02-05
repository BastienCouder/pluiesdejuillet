import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
    BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL must be a valid URL").optional().default("http://localhost:3000"),
    BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
});

export const env = envSchema.parse(process.env);