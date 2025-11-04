import { MediaInput, MediaItem } from '@/components/forms/media-field'
import { BlockComponentProps } from './blocks'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useFormContext } from 'react-hook-form'
import { TMediaSchema } from '@/schemas/media.schema'
import { TPageDto } from '@/schemas/page.schema'

const MAX_IMAGES = 3;

export default function ImageBlock({ blockIdx, sectionIdx }: BlockComponentProps) {
    const form = useFormContext<TPageDto>();

    const blockName = `sections.${sectionIdx}.blocks.items.${blockIdx}` as const;

    return (
        <FormField
            control={form.control}
            name={`${blockName}.images`}
            render={({ field }) => {
                const value = field.value as TMediaSchema[];

                return (
                    <FormItem>
                        <FormLabel>Images <span className='text-destructive'>*</span></FormLabel>
                        <section className='space-y-1'>
                            {
                                Array.isArray(value) && value.map((media, index) => (
                                    <MediaItem
                                        key={index}
                                        media={media}
                                        onRemove={() => {
                                            field.onChange(value.filter((_, i) => i !== index))
                                        }}
                                    />
                                ))
                            }
                        </section>
                        <FormControl>
                            {
                                field.value?.length < MAX_IMAGES && (
                                    <MediaInput
                                        onChange={(value) => {
                                            field.onChange(Array.isArray(value) ? [...field.value, ...value] : [...field.value, value])
                                        }}
                                    />
                                )
                            }
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}