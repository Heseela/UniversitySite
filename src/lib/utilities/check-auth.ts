"use server";

import { redirect } from "next/navigation";
import getSession from "../getSession";

export default async function checkAuth(role?: 'admin' | 'user') {
    const session = await getSession();

    if (!session) {
        redirect('/auth/signin');
    }

    if (role && session.user.role !== role) {
        redirect('/profile');
    }
    return session;
}