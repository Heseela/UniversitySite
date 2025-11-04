import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { BlockComponentProps } from "./blocks";
import { InfiniteSelect } from "@/components/forms/infinite-select";
import { TPageDto } from "@/schemas/page.schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { richTextDefaultValues } from "@/schemas/rich-text.schema";
import { Editor } from "@/components/editor/blocks/editor-x/editor";

export default function FormBlock({ blockIdx, sectionIdx }: BlockComponentProps) {
    const form = useFormContext<TPageDto>();
    const blockName = `sections.${sectionIdx}.blocks.items.${blockIdx}` as const;

    return (
        <section className="space-y-6">
            <FormField
                control={form.control}
                name={`${blockName}.form`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Form <span className='text-destructive'>*</span></FormLabel>
                        <FormControl>
                            <InfiniteSelect
                                endpoint="/forms/options"
                                placeholder="Select a form"
                                selected={{
                                    label: field.value?.title,
                                    value: field.value?.id
                                }}
                                onSelectionChange={val => {
                                    field.onChange({
                                        id: val.value,
                                        title: val.label
                                    })
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="flex items-center gap-3">
                <Checkbox
                    id={blockName + '-intro'}
                    checked={form.watch(`${blockName}.introContent`) !== undefined}
                    onCheckedChange={val => {
                        if (val) {
                            form.setValue(`${blockName}.introContent`, richTextDefaultValues);
                        } else {
                            form.setValue(`${blockName}.introContent`, undefined);
                        }
                    }}
                />
                <Label htmlFor={blockName + '-intro'}>Enable Intro Content?</Label>
            </div>

            {
                form.watch(`${blockName}.introContent`) !== undefined && (
                    <FormField
                        control={form.control}
                        name={`${blockName}.introContent`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Intro Content</FormLabel>
                                <FormControl>
                                    <Editor
                                        placeholder="Intro content..."
                                        editorSerializedState={field.value?.json || richTextDefaultValues}
                                        onSerializedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )
            }

        </section>
    )
}