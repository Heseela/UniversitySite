import LoadingButton from '@/components/forms/loading-button';
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ResponsiveDialog } from '@/components/ui/responsive-dialog';
import TagsInput from '@/components/ui/tags-input';
import { updateBlog } from '@/lib/actions/blogs.action';
import { showServerError } from '@/lib/utils';
import { blogKeywordsSchema } from '@/schemas/blog.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pen, Plus } from 'lucide-react'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type Props = {
    blogId: string;
    keywords?: string[];
    onChange: (value: string[]) => void
    disabled?: boolean
}

const formSchema = z.object({
    keywords: blogKeywordsSchema,
});

export default function AddKeywordsButton({ blogId, keywords = [], onChange, disabled = false }: Props) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            keywords,
        },
        mode: 'onChange',
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (disabled) return;

        startTransition(async () => {
            try {
                onChange(values.keywords); // instantly update the main form

                await updateBlog(
                    blogId,
                    {
                        keywords: values.keywords,
                    }
                );
                setOpen(false);
                toast.success("Keywords updated");
            } catch (e) {
                showServerError(e);
                onChange(keywords);  // revert if something went wrong
            }
        })
    }

    return (
        <>
            <ResponsiveDialog
                title="Provide Keywords"
                description="Add relevant keywords naturally to your blog to boost visibility and help readers find your content through search engines."
                isOpen={open}
                setIsOpen={setOpen}
                className="min-w-[600px]"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name={"keywords"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Keywords</FormLabel>
                                    <FormControl>
                                        <TagsInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder='Type and press space to add a new keyword...'
                                            max={5}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        You can add up to 5 keywords.
                                    </FormDescription>
                                    <FormMessage />
                                    {
                                        !!form.formState.errors.keywords?.length && (
                                            <p className="text-destructive text-sm">{form.formState.errors.keywords[0]?.message}</p>
                                        )
                                    }
                                </FormItem>
                            )}
                        />

                        <div className="mt-3 flex justify-end">
                            <LoadingButton
                                isLoading={isPending}
                                loadingText="Updating..."
                                disabled={isPending || disabled}
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
                disabled={disabled}
                className="w-fit text-muted-foreground"
            >
                {
                    !!keywords?.length ? (
                        <>
                            <Pen />
                            Update Keywords
                        </>
                    ) : (
                        <>
                            <Plus />
                            Add Keywords
                        </>
                    )
                }
            </Button>
        </>
    )
}