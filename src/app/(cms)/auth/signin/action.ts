"use server"

import { signIn } from '@/auth'
import { z } from 'zod'

const emailSchema = z.string().email("Invalid email address").trim();

export async function signInAction(email: string) {
    if (typeof email !== "string") {
        throw new Error("Email must be a string");
    }

    const parsedEmail = emailSchema.safeParse(email);

    if (!parsedEmail.success) {
        throw new Error(parsedEmail.error.message);
    }

    await signIn("resend", { email, redirect: false });
}