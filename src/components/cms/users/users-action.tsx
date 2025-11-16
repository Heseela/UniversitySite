"use client";

import { Button } from '@/components/ui/button'
import { ResponsiveAlertDialog } from '@/components/ui/responsive-alert-dialog';
import { deleteUser } from '@/lib/actions/users.action';
import { Trash } from 'lucide-react'
import React, { useState, useTransition } from 'react'
import { toast } from 'sonner';

type Props = {
    userId: string;
}

export default function UserActions({ userId }: Props) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, startTransition] = useTransition();

    function handleDelete() {
        startTransition(async () => {
            try {
                await deleteUser(userId);
                toast.success("User deleted");
                setIsDeleteOpen(false);
            } catch (e) {
                if (e instanceof Error) {
                    toast.error("Unexpected Error", { description: e.message });
                } else {
                    toast.error("An unexpected error occurred");
                }
            }
        })
    }

    return (
        <div>
            <ResponsiveAlertDialog
                isOpen={isDeleteOpen}
                setIsOpen={setIsDeleteOpen}
                action={handleDelete}
                title="Delete User"
                description="Are you sure you want to delete this user? This action cannot be undone."
                actionLabel="Yes, delete"
                isLoading={isDeleting}
                loadingText="Deleting..."
            />

            <Button variant="destructive" size="icon" onClick={() => setIsDeleteOpen(true)}>
                <Trash />
                <span className='sr-only'>Delete</span>
            </Button>
        </div>
    )
}