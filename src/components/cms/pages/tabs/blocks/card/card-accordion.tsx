import { useFormContext } from "react-hook-form"
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
import { Textarea } from "@/components/ui/textarea";
import { TMediaSchema } from "@/schemas/media.schema";
import { MediaInput, MediaItem } from "@/components/forms/media-field";
import { ELinkType } from "../../../../../../../types/global.types";
import { InternalLinkField } from "../../common/internal-link-field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/editor/blocks/editor-x/editor";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"

type Props = {
    fieldId: string
    idx: number
    name: string
    onRemove?: () => void,
    isFieldError: boolean
}

export default function CardAccordion({ fieldId, idx, name, onRemove, isFieldError }: Props) {
    const form = useFormContext();

    const { attributes, listeners, isDragging, setNodeRef, transform, transition } = useSortable({ id: fieldId })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <section ref={setNodeRef} style={style} className={`${isDragging ? "opacity-50" : ""}`}>
            <Accordion type="multiple">
                <AccordionItem value={`${name}.id`} className={cn(
                    "bg-secondary/50 border !border-b-1 rounded-md overflow-hidden",
                    isFieldError && "bg-destructive/10 border-destructive"
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
                            <span>Card {idx + 1}</span>
                        </AccordionTrigger>
                        <section className="absolute right-10">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="p-2">
                                    <MoreHorizontal size={16} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="top">
                                    {
                                        idx !== 0 && <DropdownMenuItem><ChevronUp /> Move Up</DropdownMenuItem>
                                    }
                                    <DropdownMenuItem><ChevronDown /> Move Down</DropdownMenuItem>
                                    <DropdownMenuItem><Plus /> Add Below</DropdownMenuItem>
                                    <DropdownMenuItem><Copy /> Duplicate</DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={onRemove}
                                    >
                                        <X /> Remove
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </section>
                    </section>
                    <AccordionContent className="px-3 py-5 bg-background space-y-6">
                        <FormField
                            control={form.control}
                            name={`${name}.title`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="py-5"
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
                            name={`${name}.subtitle`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subtitle</FormLabel>
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

                        <FormField
                            control={form.control}
                            name={`${name}.description`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Editor
                                            placeholder="Card content goes here..."
                                            editorSerializedState={field.value.json}
                                            onSerializedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={`${name}.image`}
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
                                                    <MediaInput onChange={field.onChange} />
                                                )
                                            }
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <div className="flex items-center gap-3">
                            <Checkbox
                                id={`${name}-enable-link`}
                                checked={!!form.watch(`${name}.link`)}
                                onCheckedChange={val => {
                                    if (val) {
                                        form.setValue(`${name}.link`, {
                                            url: "",
                                            type: ELinkType.Internal
                                        });
                                    } else {
                                        form.setValue(`${name}.link`, undefined);
                                    }
                                }}
                            />
                            <Label htmlFor={`${name}-enable-link`}>Enable link?</Label>
                        </div>

                        {
                            !!form.watch(`${name}.link`) && (
                                <>
                                    <section className="grid grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name={`${name}.link.type`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Type</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={val => {
                                                                form.setValue(`${name}.link.url`, "");
                                                                field.onChange(val);
                                                            }}
                                                            defaultValue={field.value}
                                                            className="flex"
                                                        >
                                                            <FormItem className="flex items-center gap-3">
                                                                <FormControl>
                                                                    <RadioGroupItem value={ELinkType.Internal} />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Internal Link
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center gap-3">
                                                                <FormControl>
                                                                    <RadioGroupItem value={ELinkType.External} />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Custom URL
                                                                </FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <section className="flex gap-6">
                                            <FormField
                                                control={form.control}
                                                name={`${name}.link.borderLess`}
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={(checked) => field.onChange(checked)}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal">
                                                                Borderless
                                                            </FormLabel>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )
                                                }}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`${name}.link.newTab`}
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={(checked) => field.onChange(checked)}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal">
                                                                Open in new tab
                                                            </FormLabel>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        </section>
                                    </section>

                                    <FormField
                                        control={form.control}
                                        name={`${name}.link.url`}
                                        render={({ field }) => {
                                            return form.watch(`${name}.link.type`) === ELinkType.External ? (
                                                <FormItem>
                                                    <FormLabel>Custom URL <span className='text-destructive'>*</span></FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="url"
                                                            placeholder="Eg. https://example.com"
                                                            required
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            ) : (
                                                <InternalLinkField
                                                    name={`${name}.link.url`}
                                                    onChange={field.onChange}
                                                />
                                            )
                                        }}
                                    />
                                </>
                            )
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    )
}