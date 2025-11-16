import SignInForm from '@/components/auth/signIn-form'
import { getSiteSettings } from '@/lib/data-access.ts/site-settings.data';
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your account",
}

export default async function SignInPage() {
    const setting = await getSiteSettings();

    return (
        <SignInForm logo={setting?.logoLight_primary} />
    )
}