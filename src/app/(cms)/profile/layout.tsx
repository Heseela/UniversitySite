import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    children: React.ReactNode;
}

export default async function ProfileLayout({ children }: Props) {
    const session = await getSession();

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/profile');
    }

    // check if user has completed their profile
    if (session && session?.user?.profileCompleted === false) {
        redirect('/auth/new-user');
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>{children}</div>
    )
}