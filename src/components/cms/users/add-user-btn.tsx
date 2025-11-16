"use client";

import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import UserForm from "./user-form";

export default function AddUserBtn() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ResponsiveDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Add User"
                description="Add a new user to your CMS"
            >
                <UserForm setIsOpen={setIsOpen} />
            </ResponsiveDialog>

            <Button onClick={() => setIsOpen(true)}>
                <Plus />
                Add User
            </Button>
        </>
    )
}