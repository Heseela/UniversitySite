import { useFieldArray, useFormContext } from "react-hook-form"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDown, ChevronUp, Copy, GripVertical, MoreHorizontal, Plus, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { alumniDefaultvalue, TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import { TMediaSchema } from "@/schemas/media.schema";
import { MediaInput, MediaItem } from "@/components/forms/media-field";
import { Editor } from "@/components/editor/blocks/editor-x/editor";

export default function AlumniTabContent() {
    const form = useFormContext<TCredibilityAndSupport>();

    const { fields, append, remove, swap, insert } = useFieldArray({
        control: form.control,
        name: "alumni",
    });

    return (
        <section className="py-4">
            <FormField
                control={form.control}
                name={`alumni`}
                render={() => (
                    <FormItem>
                        <FormControl>
                            <section className="space-y-2">
                                {
                                    fields.map((f, idx) => {
                                        return (
                                            <FormField
                                                key={f.id}
                                                control={form.control}
                                                name={`alumni.${idx}`}
                                                render={({ field }) => {
                                                    const fieldError = Array.isArray(form.formState.errors.alumni) && !!form.formState.errors.alumni[idx];

                                                    return (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Accordion type="multiple">
                                                                    <AccordionItem value={f.id} className={cn(
                                                                        "bg-secondary/50 border !border-b-1 rounded-md overflow-hidden",
                                                                        fieldError && "bg-destructive/10 border-destructive"
                                                                    )}>
                                                                        <section className="relative flex items-center gap-2 px-2">
                                                                            <button type="button" className="hover:cursor-grab">
                                                                                <GripVertical className="text-muted-foreground" size={16} />
                                                                            </button>
                                                                            <AccordionTrigger className="text-sm hover:no-underline py-3">
                                                                                <section className="flex items-center gap-3">
                                                                                    <span className="font-light">{(idx + 1).toString().padStart(2, "0")}</span>
                                                                                    <FormField
                                                                                        control={form.control}
                                                                                        name={`alumni.${idx}.name`}
                                                                                        render={({ field }) => (
                                                                                            <FormItem>
                                                                                                <FormControl>
                                                                                                    <input
                                                                                                        maxLength={50}
                                                                                                        onClick={(e) => e.stopPropagation()}
                                                                                                        className="focus:outline-0 text-sm field-sizing-content"
                                                                                                        placeholder="Untitled"
                                                                                                        readOnly
                                                                                                        disabled
                                                                                                        {...field}
                                                                                                    />
                                                                                                </FormControl>
                                                                                            </FormItem>
                                                                                        )}
                                                                                    />
                                                                                </section>
                                                                            </AccordionTrigger>
                                                                            <section className="absolute right-10">
                                                                                <DropdownMenu>
                                                                                    <DropdownMenuTrigger className="p-2">
                                                                                        <MoreHorizontal size={16} />
                                                                                    </DropdownMenuTrigger>
                                                                                    <DropdownMenuContent side="top">
                                                                                        {
                                                                                            idx !== 0 && <DropdownMenuItem onClick={() => swap(idx, idx - 1)}>
                                                                                                <ChevronUp /> Move Up
                                                                                            </DropdownMenuItem>
                                                                                        }
                                                                                        <DropdownMenuItem onClick={() => swap(idx, idx + 1)}>
                                                                                            <ChevronDown /> Move Down
                                                                                        </DropdownMenuItem>
                                                                                        <DropdownMenuItem onClick={() => insert(idx + 1, alumniDefaultvalue)}>
                                                                                            <Plus /> Add Below
                                                                                        </DropdownMenuItem>
                                                                                        <DropdownMenuItem onClick={() => insert(idx + 1, field.value)}><Copy /> Duplicate
                                                                                        </DropdownMenuItem>
                                                                                        <DropdownMenuItem onClick={() => remove(idx)}>
                                                                                            <X /> Remove
                                                                                        </DropdownMenuItem>
                                                                                    </DropdownMenuContent>
                                                                                </DropdownMenu>
                                                                            </section>
                                                                        </section>
                                                                        <AccordionContent className="px-3 py-5 bg-background space-y-6">
                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`alumni.${idx}.name`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel>Name <span className="text-destructive">*</span></FormLabel>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                                className='py-5'
                                                                                                maxLength={50}
                                                                                                required
                                                                                                {...field}
                                                                                            />
                                                                                        </FormControl>
                                                                                        <FormMessage />
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`alumni.${idx}.story`}
                                                                                render={({ field }) => {
                                                                                    return (
                                                                                        <FormItem>
                                                                                            <FormControl>
                                                                                                <Editor
                                                                                                    placeholder="Alumni story here..."
                                                                                                    editorSerializedState={field.value.json}
                                                                                                    onSerializedChange={field.onChange}
                                                                                                />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )
                                                                                }}
                                                                            />
                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`alumni.${idx}.link`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel>Link</FormLabel>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                                type="url"
                                                                                                className='py-5'
                                                                                                {...field}
                                                                                            />
                                                                                        </FormControl>
                                                                                        <FormMessage />
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`alumni.${idx}.image`}
                                                                                render={({ field }) => {
                                                                                    const value = field.value as TMediaSchema | null;

                                                                                    return (
                                                                                        <FormItem>
                                                                                            <FormLabel>Image</FormLabel>
                                                                                            <FormControl>
                                                                                                {
                                                                                                    value ? (
                                                                                                        <MediaItem
                                                                                                            media={value}
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
                                                                                    )
                                                                                }}
                                                                            />
                                                                        </AccordionContent>
                                                                    </AccordionItem>
                                                                </Accordion>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        )
                                    })
                                }
                            </section>
                        </FormControl>
                        <Button
                            type="button"
                            variant={"outline"}
                            size={"sm"}
                            className="font-normal text-xs w-fit"
                            onClick={() => append(alumniDefaultvalue)}
                        >
                            <Plus size={16} /> Add Alumni
                        </Button>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </section>
    )
}