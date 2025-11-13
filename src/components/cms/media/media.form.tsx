"use client";

import { Button, LoadingButton } from "@/components/ui/button";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TMediaSelect } from "@/db/schema/media";
import { updateMedia } from "@/lib/actions/media.action";
import { formatBytes, showServerError } from "@/lib/utils";
import { mediaSchema, TMediaSchema } from "@/schemas/media.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

type Props = {
    media: TMediaSelect;
};

export default function MediaForm({ media }: Props) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<TMediaSchema>({
        resolver: zodResolver(mediaSchema),
        defaultValues: media,
    });

    function onSubmit(values: TMediaSchema) {
        startTransition(async () => {
            try {
                await updateMedia(media.id, values);
                toast.success("Successfully updated");
                router.push("/cms/globals/media");
            } catch (e) {
                showServerError(e);
                console.log(e);
            }
        });
    }

    const name = useWatch({
        control: form.control,
        name: "name",
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <section className="@container space-y-6 pb-40">
                    <header className="container">
                        <h3 className="text-3xl font-bold capitalize max-w-[50ch] break-words">
                            {name || "Untitled"}
                        </h3>
                    </header>
                    <section className="border-y sticky z-[1] backdrop-blur-3xl top-0">
                        <section className="container flex flex-wrap gap-3 justify-between items-center py-3">
                            <section className="text-sm @lg:flex gap-6">
                                <p>
                                    <span className="text-muted-foreground">Last Modified:&nbsp;</span>
                                    <time className="font-medium">{media.updatedAt.toLocaleString()}</time>
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Created:&nbsp;</span>
                                    <time className="font-medium">{media.createdAt.toLocaleString()}</time>
                                </p>
                            </section>
                            <section className="flex flex-wrap gap-3 grow @lg:grow-0">
                                <Button
                                    type="button"
                                    variant={'outline'}
                                    size={'lg'}
                                    onClick={() => router.push("/cms/globals/media")}
                                    className="grow"
                                >
                                    Cancel
                                </Button>

                                <LoadingButton
                                    type="submit"
                                    size={"lg"}
                                    isLoading={isPending}
                                    disabled={isPending}
                                    loadingText="Saving..."
                                    className="grow"
                                >
                                    Save
                                </LoadingButton>
                            </section>
                        </section>
                    </section>

                    <section className="container space-y-6">
                        <section className='flex items-center gap-6 flex-wrap'>
                            <Link
                                href={form.getValues("secure_url")}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <CloudinaryImage
                                    src={form.getValues("secure_url")}
                                    alt='alt'
                                    width={150}
                                    height={150}
                                    crop="auto"
                                />
                            </Link>

                            <section className='flex-1 space-y-3'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name <span className='text-destructive'>*</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='py-5 min-w-[300px]'
                                                    placeholder="Eg. brandLogo"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <p className="text-muted-foreground text-sm">
                                    <span>{formatBytes(media.bytes)} | </span>
                                    <span>{media.width} x {media.height} | </span>
                                    <span>{media.resource_type}/{media.format}</span>
                                </p>
                            </section>
                        </section>

                        <FormField
                            control={form.control}
                            name="alt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alt</FormLabel>
                                    <FormControl>
                                        <Input
                                            className='py-5'
                                            placeholder="Eg. an alternative text to describe the media"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="caption"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Caption</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Title"
                                            className="field-sizing-content overflow-y-hidden resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>

                </section>
            </form>
        </Form>
    );
}
