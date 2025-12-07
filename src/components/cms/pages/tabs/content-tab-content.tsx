import { TPageDto, TPageSection } from "@/schemas/page.schema";
import { FieldArrayWithId, useFieldArray, UseFieldArrayInsert, UseFieldArrayRemove, UseFieldArraySwap, useFormContext } from "react-hook-form"
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
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import BlockField from "./block-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils";
import { EAlignment } from "../../../../../types/global.types";
import FieldArraySortableContext from "@/components/dnd/field-array-sortable-context";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import { BLOGS_SLUG, COURSES_SLUG, EVENTS_SLUG, APPLY_FOR_JOB_SLUG, GALLERY_SLUG, JOBS_SLUG } from "@/app/slugs";
import { Checkbox } from "@/components/ui/checkbox";
import { ColorPicker } from "@/components/ui/color-picker";
import { TMediaSchema } from "@/schemas/media.schema";
import { MediaInput, MediaItem } from "@/components/media/media-field";
import { Label } from "@radix-ui/react-label";

const sectionDefaultValue: TPageSection = {
    tagline: "",
    title: "",
    headline: "",
    subheadline: "",
    headlineAlignment: EAlignment.Center,
    blocks: {
        direction: "horizontal",
        items: []
    },
    isContainer: true,
    backgroundColor: "#fff",
}

export default function ContentTabContent({ slug }: { slug: string }) {
    const form = useFormContext<TPageDto>();

    const { fields, append, remove, swap, insert, move } = useFieldArray({
        control: form.control,
        name: "sections",
    });

    if (([BLOGS_SLUG, EVENTS_SLUG, COURSES_SLUG, APPLY_FOR_JOB_SLUG, GALLERY_SLUG, JOBS_SLUG] as string[]).includes(slug)) {
        return <div className="px-4 text-muted-foreground">
            Cannot update the content of {slug} page.
        </div>
    }

    return (
        <section className="space-y-2">
            <p className="text-sm font-medium">Sections</p>
            {
                form.formState.errors.sections && <p className="text-destructive text-sm">{form.formState.errors.sections?.message || form.formState.errors.sections?.root?.message}</p>
            }
            <Accordion type="multiple">
                <FieldArraySortableContext
                    fields={fields}
                    move={move}
                >
                    <section className="space-y-2">
                        {
                            fields.map((f, idx) => {
                                return (
                                    <SortableField
                                        key={f.id}
                                        f={f}
                                        idx={idx}
                                        actions={{ swap, remove, insert }}
                                    />
                                )
                            })
                        }
                    </section>
                </FieldArraySortableContext>
            </Accordion>
            <Button
                type="button"
                variant={"outline"}
                size={"sm"}
                className="font-normal text-xs"
                onClick={() => append(sectionDefaultValue)}
            >
                <Plus size={16} /> Add Section
            </Button>
        </section>
    )
}

function SortableField({
    f,
    idx,
    actions: { swap, insert, remove }
}: {
    f: FieldArrayWithId<TPageDto, "sections", "id">,
    idx: number,
    actions: {
        swap: UseFieldArraySwap
        remove: UseFieldArrayRemove
        insert: UseFieldArrayInsert<TPageDto, "sections">
    }
}) {
    const form = useFormContext<TPageDto>();
    const { attributes, listeners, isDragging, setNodeRef, transform, transition } = useSortable({ id: f.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <section ref={setNodeRef} style={style} className={`${isDragging ? "opacity-50" : ""}`}>
            <FormField
                control={form.control}
                name={`sections.${idx}`}
                render={({ field }) => {
                    const fieldError = Array.isArray(form.formState.errors.sections) && !!form.formState.errors.sections[idx];

                    return (
                        <FormItem>
                            <FormControl>
                                <AccordionItem value={f.id} className={cn(
                                    "bg-secondary/50 border !border-b-1 rounded-md overflow-hidden",
                                    fieldError && "bg-destructive/10 border-destructive"
                                )}>
                                    <section className="relative flex items-center gap-2 px-2">
                                        <button
                                            type="button"
                                            className="cursor-grab active:cursor-grabbing "
                                            {...attributes}
                                            {...listeners}
                                        >
                                            <GripVertical className="text-muted-foreground" size={16} />
                                        </button>
                                        <AccordionTrigger className="text-sm hover:no-underline py-3">
                                            <section className="flex items-center gap-3">
                                                <span className="font-light">{(idx + 1).toString().padStart(2, "0")}</span>
                                                <FormField
                                                    control={form.control}
                                                    name={`sections.${idx}.title`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <input
                                                                    maxLength={100}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="focus:outline-0 text-sm field-sizing-content"
                                                                    placeholder="Untitled"
                                                                    autoComplete="off"
                                                                    // prevent spacebar from toggling the accordion
                                                                    onKeyDown={(e) => e.key === ' ' && e.stopPropagation()}
                                                                    onKeyUp={(e) => {
                                                                        if (e.key === ' ') {
                                                                            e.stopPropagation();
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
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
                                                    <DropdownMenuItem onClick={() => insert(idx + 1, sectionDefaultValue)}>
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
                                    <AccordionContent className="px-3 py-5 bg-background">
                                        <Accordion type="multiple" className="space-y-2">
                                            <AccordionItem value={"layout"} className={cn(
                                                "bg-secondary/50 border !border-b-1 rounded-md overflow-hidden",
                                                fieldError && "bg-destructive/10 border-destructive"
                                            )}>
                                                <AccordionTrigger className="hover:no-underline p-3 font-medium">Headings & Layout</AccordionTrigger>
                                                <AccordionContent className="px-3 py-5 bg-background space-y-6">
                                                    <FormField
                                                        control={form.control}
                                                        name={`sections.${idx}.tagline`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Tagline</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        className='py-5'
                                                                        maxLength={50}
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name={`sections.${idx}.headline`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Headline</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        className='py-5'
                                                                        maxLength={100}
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name={`sections.${idx}.subheadline`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Sub Headline</FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        className="field-sizing-content overflow-y-hidden resize-none w-full focus-visible:outline-0"
                                                                        maxLength={300}
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <section className="flex flex-row gap-3 [&>*]:grow">
                                                        <FormField
                                                            control={form.control}
                                                            name={`sections.${idx}.headlineAlignment`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Headline Alignment</FormLabel>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                                                        <FormControl>
                                                                            <SelectTrigger className="w-full py-5">
                                                                                <SelectValue placeholder={"Select an option"} />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            <SelectItem value={EAlignment.Left}>Left</SelectItem>
                                                                            <SelectItem value={EAlignment.Center}>Center</SelectItem>
                                                                            <SelectItem value={EAlignment.Right}>Right</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name={`sections.${idx}.blocks.direction`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Blocks Direction</FormLabel>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                                                        <FormControl>
                                                                            <SelectTrigger className="w-full py-5">
                                                                                <SelectValue placeholder={"Select an option"} />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            <SelectItem value={"horizontal"}>Horizontal</SelectItem>
                                                                            <SelectItem value={"vertical"}>Vertical</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </section>

                                                    <section className="flex flex-col gap-2">
                                                        <Label className="font-medium">Background</Label>
                                                        <section className="space-y-2">
                                                            <FormField
                                                                control={form.control}
                                                                name={`sections.${idx}.backgroundColor`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <ColorPicker
                                                                                value={field.value || "#ffffff"}
                                                                                onChange={color => field.onChange(color)}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name={`sections.${idx}.backgroundImage`}
                                                                render={({ field }) => {
                                                                    const value = field.value as TMediaSchema | null;

                                                                    return (
                                                                        <FormItem>
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
                                                        </section>
                                                    </section>

                                                    <FormField
                                                        control={form.control}
                                                        name={`sections.${idx}.isContainer`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 h-fit">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel>
                                                                        Is Container?
                                                                    </FormLabel>
                                                                    <FormDescription>
                                                                        Enable this to wrap the section content within a centered container with horizontal padding.
                                                                    </FormDescription>
                                                                    <FormMessage />
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value={"blocks"} className={cn(
                                                "bg-secondary/50 border !border-b-1 rounded-md overflow-hidden",
                                                fieldError && "bg-destructive/10 border-destructive"
                                            )}>
                                                <AccordionTrigger className="hover:no-underline p-3 font-medium">Blocks</AccordionTrigger>
                                                <AccordionContent className="px-3 py-5 bg-background space-y-6">
                                                    <BlockField sectionIdx={idx} />
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </AccordionContent>
                                </AccordionItem>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }}
            />
        </section >
    )
}