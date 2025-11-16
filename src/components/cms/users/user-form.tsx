"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTransition } from "react";
import { createUser } from "@/lib/actions/users.action";
import { toast } from "sonner";
import LoadingButton from "@/components/forms/loading-button";
import { Plus } from "lucide-react";
import { TUserFormSchema, userFormDefaultValues, userFormSchema } from "@/schemas/users.schema";

export default function UserForm({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<TUserFormSchema>({
        resolver: zodResolver(userFormSchema),
        defaultValues: userFormDefaultValues,
    });

    function onSubmit(values: TUserFormSchema) {
        startTransition(async () => {
            try {
                await createUser(values);
                toast.success("User created successfully");
                setIsOpen(false);
            } catch (error) {
                toast.error("Failed to create user");
                console.error(error);
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Input type="email" {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role <span className="text-destructive">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="moderator">Moderator</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton
                    type="submit"
                    isLoading={isPending}
                    disabled={isPending}
                    loadingText="Creating..."
                    className="w-full"
                >
                    <Plus />
                    Create User
                </LoadingButton>
            </form>
        </Form>
    )
}