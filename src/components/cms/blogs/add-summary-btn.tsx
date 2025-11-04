import LoadingButton from '@/components/forms/loading-button';
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ResponsiveDialog } from '@/components/ui/responsive-dialog';
import { Textarea } from '@/components/ui/textarea';
import { updateBlog } from '@/lib/actions/blogs.action';
import { showServerError } from '@/lib/utils';
import { blogSummarySchema } from '@/schemas/blog.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pen, Plus } from 'lucide-react'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type Props = {
    blogId: string;
    summary?: string;
    onChange: (value: string) => void,
    disabled?: boolean
}

const formSchema = z.object({
    summary: blogSummarySchema,
});

export default function AddSummaryButton({ blogId, summary = "", onChange, disabled = false }: Props) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            summary,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (disabled) return;
        
        startTransition(async () => {
            onChange(values.summary);

            try {
                await updateBlog(
                    blogId,
                    {
                        summary: values.summary,
                    }
                );
                setOpen(false);
                toast.success("Summary updated");
            } catch (e) {
                showServerError(e);
                onChange(summary); // revert if something went wrong
            }
        })
    }

    return (
        <>
            <ResponsiveDialog
                title="Provide summary"
                description="This summary will be used in the blog's preview and will be displayed on the blog page."
                isOpen={open}
                setIsOpen={setOpen}
                className="min-w-[600px]"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="summary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            autoFocus
                                            placeholder="Summary goes here..."
                                            className="field-sizing-content overflow-y-hidden resize-none w-full focus-visible:outline-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="mt-3 flex justify-end">
                            <LoadingButton
                                isLoading={isPending}
                                loadingText="Updating..."
                                disabled={isPending || disabled || summary === form.watch('summary')}
                                type="submit"
                            >
                                Update
                            </LoadingButton>
                        </div>
                    </form>
                </Form>
            </ResponsiveDialog>

            <Button
                type="button"
                onClick={() => {
                    if (disabled) return;
                    setOpen(true);
                }}
                variant={'ghost'}
                size={'sm'}
                disabled={isPending || disabled}
                className="w-fit text-muted-foreground"
            >
                {
                    !!summary?.length ? (
                        <>
                            <Pen />
                            Update Summary
                        </>
                    ) : (
                        <>
                            <Plus />
                            Add Summary
                        </>
                    )
                }
            </Button>
        </>
    )
}