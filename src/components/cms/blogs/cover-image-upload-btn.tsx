import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { CLOUDINARY_SIGNATURE_ENDPOINT } from '@/CONSTANTS';
import { updateBlog } from '@/lib/actions/blogs.action';
import { uploadMedia } from '@/lib/actions/media.action';
import { showServerError } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus, PenLine } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type Props = {
    blogId: string;
    coverImage?: string | null;
    onChange: (value: string | null | undefined) => void;
    title: string;
    disabled?: boolean;
}

const formSchema = z.object({
    coverImage: z.string().nullish(),
});


export default function CoverImageUploadBtn({ blogId, coverImage, title, onChange, disabled = false }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            coverImage,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (disabled) return;

        try {
            onChange(values.coverImage); // necessary to set in main form

            await updateBlog(
                blogId,
                {
                    coverImage: values.coverImage,
                }
            );
            toast.success("Cover image updated");
        } catch (e) {
            showServerError(e);
            onChange(coverImage); // revert if something went wrong 
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <CldUploadWidget
                                    signatureEndpoint={CLOUDINARY_SIGNATURE_ENDPOINT}
                                    onSuccess={async (result) => {
                                        if (typeof result.info === "object" && "secure_url" in result.info) {
                                            field.onChange(result.info.public_id);
                                            await uploadMedia([{
                                                public_id: result.info.public_id,
                                                alt: "<No alt>",
                                                bytes: result.info.bytes,
                                                caption: "<No caption>",
                                                format: result.info.format,
                                                height: result.info.height,
                                                name: result.info.original_filename + '.' + result.info.format,
                                                originalName: result.info.original_filename + '.' + result.info.format,
                                                resource_type: result.info.resource_type,
                                                secure_url: result.info.secure_url,
                                                width: result.info.width,
                                            }]);
                                            form.handleSubmit(onSubmit)(); // save immediately
                                        }
                                    }}
                                    options={{
                                        cropping: true,
                                        maxFiles: 1,
                                        maxFileSize: 2 * 1024 * 1024, // 2MB
                                        clientAllowedFormats: ["image", "jpg", "png", "gif", "webp"],
                                        tags: ["blogs", title?.replace(/\s/g, "_")],
                                    }}
                                >
                                    {({ open }) => {
                                        function handleOnClick() {
                                            if (disabled) return;
                                            open();
                                        }
                                        return (
                                            <Button
                                                type="button"
                                                onClick={handleOnClick}
                                                variant={'ghost'}
                                                size={'sm'}
                                                disabled={disabled}
                                                className="w-fit text-muted-foreground"
                                            >
                                                {
                                                    field.value ? (
                                                        <>
                                                            <PenLine />
                                                            Change Cover
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ImagePlus />
                                                            Add Cover
                                                        </>
                                                    )
                                                }
                                            </Button>
                                        );
                                    }}
                                </CldUploadWidget>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}