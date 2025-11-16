import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import getSession from '@/lib/getSession';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { UpdateProfileForm } from '../auth/new-user/components/update-profile.form';

export default async function ProfilePage() {
    const session = await getSession();

    return (
        <div className='space-y-8'>
            <section>
                <h1 className='text-2xl'>Profile</h1>
                <p>Email: {session?.user?.email}</p>
                <p className='capitalize'>Role: {session?.user?.role}</p>
            </section>

            <UpdateProfileForm
                defaultValues={{
                    name: session?.user?.name || '',
                    image: session?.user?.image || null,
                }}
            />

            <section className='space-x-4'>
                <Button>
                    <Link href="/cms">Go to CMS</Link>
                </Button>

                <Button type="button" onClick={async () => {
                    "use server"
                    await signOut()
                }}>
                    <LogOut />
                    Logout
                </Button>
            </section>
        </div>
    )
}