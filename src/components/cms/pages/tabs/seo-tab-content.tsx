import { TPageDto } from "@/schemas/page.schema";
import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MediaInput, MediaItem } from "@/components/forms/media-field";

export default function SeoTabContent() {
    const form = useFormContext<TPageDto>();

    return (
        <section className="space-y-6">
            <FormField
                control={form.control}
                name={`metadata.title`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                            <Input
                                className='py-5'
                                required
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            This should be between 50 and 60 characters. For help in writing quality meta titles, see&nbsp;
                            <a
                                href="https://developers.google.com/search/docs/advanced/appearance/title-link#page-titles"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                best practices
                            </a>.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`metadata.description`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea
                                className="field-sizing-content overflow-y-hidden resize-none w-full"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            This should be between 100 and 150 characters. For help in writing quality meta descriptions, see&nbsp;
                            <a
                                href="https://developers.google.com/search/docs/advanced/appearance/snippet#meta-descriptions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                best practices
                            </a>
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`metadata.keywords`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Keywords</FormLabel>
                        <FormControl>
                            <Input
                                className='py-5'
                                {...field}
                                value={field.value?.join(',')}
                                onChange={(e) => field.onChange(e.target.value.split(','))}
                            />
                        </FormControl>
                        <FormDescription>
                            Comma(,) separated values that describe the page and are relevant.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`metadata.ogImage`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Open Graph Image</FormLabel>
                        <FormControl>
                            {
                                field.value ? (
                                    <MediaItem
                                        media={field.value}
                                        onRemove={() => {
                                            field.onChange(null)
                                        }}
                                    />
                                ) : (
                                    <MediaInput onChange={(value) => {
                                        field.onChange(value)
                                    }} />
                                )
                            }
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </section>
    )
}