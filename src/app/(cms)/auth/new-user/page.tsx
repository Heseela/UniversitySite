import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation';
import { UpdateProfileForm } from './components/update-profile.form';

export default async function NewUserPage() {
    const session = await getSession();

    if (!session) {
        redirect('/api/auth/signin');
    }

    if (session.user.profileCompleted === true) {
        redirect('/profile');
    }

    return (
        <section className='flex flex-col items-center justify-center min-h-screen'>
            <h1 className="text-2xl font-bold mb-4">New User</h1>
            <p>Welcome to the new user page.</p>

            <p>Please complete your profile to continue.</p>

            <div className='h-10' />

            <UpdateProfileForm />
        </section>
    )
}