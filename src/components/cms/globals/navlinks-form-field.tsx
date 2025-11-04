import { FieldArrayWithId, useFieldArray, UseFieldArrayInsert, UseFieldArrayRemove, UseFieldArraySwap, useFormContext, useWatch } from "react-hook-form"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox";
import { InternalLinkField } from "../pages/tabs/common/internal-link-field";
import { ECtaVariant } from "../../../../types/blocks.types";
import { ENavLinkType, MAX_NAV_SUB_LINKS, navLinkDefaultValue } from "@/schemas/globals.schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import FieldArraySortableContext from "@/components/dnd/field-array-sortable-context";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"

type Props = {
    idx: number
    name: string
    isSubLink?: boolean
    isFieldError?: boolean
    navLinkType?: ENavLinkType,
    accordionActions?: {
        onMoveUp?: () => void
        onMoveDown?: () => void
        onRemove?: () => void,
        onDuplicate?: () => void
        onAddBelow?: () => void
    }
    draggableAttributes: DraggableAttributes
    listeners?: SyntheticListenerMap
}

export default function NavLinkFormField({
    idx,
    name,
    accordionActions,
    isSubLink = false,
    isFieldError,
    navLinkType,
    draggableAttributes,
    listeners
}: Props) {
    const form = useFormContext();

    // this fieldArray is for subLinks, for fieldArray of navLinks look the parent of this component
    const { fields, append, remove, insert, swap, move } = useFieldArray({
        name: `${name}.subLinks`,
        control: form.control,
    });

    const label = useWatch({
        control: form.control,
        name: `${name}.text`
    });

    return (
        <Accordion type="multiple">
            <AccordionItem value={`${name}.id`} className={cn(
                "bg-secondary/50 border !border-b-1 rounded-md overflow-hidden",
                isFieldError && "bg-destructive/10 border-destructive"
            )}>
                <section className="relative flex items-center gap-2 px-2">
                    <button
                        type="button"
                        className="cursor-grab active:cursor-grabbing "
                        {...draggableAttributes}
                        {...listeners}
                    >
                        <GripVertical className="text-muted-foreground" size={16} />
                    </button>
                    <AccordionTrigger className="text-sm hover:no-underline py-3">
                        <span>
                            <span className="font-normal text-muted-foreground">{(idx + 1).toString().padStart(2, "0")}</span>
                            &nbsp;&nbsp;
                            {label}
                        </span>
                    </AccordionTrigger>
                    <section className="absolute right-10">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="p-2">
                                <MoreHorizontal size={16} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top">
                                {
                                    idx !== 0 && <DropdownMenuItem onClick={accordionActions?.onMoveUp}>
                                        <ChevronUp /> Move Up
                                    </DropdownMenuItem>
                                }
                                <DropdownMenuItem onClick={accordionActions?.onMoveDown}>
                                    <ChevronDown /> Move Down
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={accordionActions?.onAddBelow}>
                                    <Plus /> Add Below
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={accordionActions?.onDuplicate}><Copy /> Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={accordionActions?.onRemove}>
                                    <X /> Remove
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </section>
                </section>
                <AccordionContent className="px-3 py-5 bg-background space-y-6">
                    <section className="grid grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name={`${name}.type`}
                            render={({ field }) => (
                                <FormItem className={cn(navLinkType === ENavLinkType.DropDown && "col-span-2")}>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={val => {
                                                form.setValue(`${name}.link`, "");
                                                field.onChange(val);
                                            }}
                                            defaultValue={field.value}
                                            className="flex"
                                        >
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value={ENavLinkType.Internal} />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Internal Link
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value={ENavLinkType.External} />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Custom URL
                                                </FormLabel>
                                            </FormItem>
                                            {
                                                !isSubLink && (
                                                    <FormItem className="flex items-center gap-3">
                                                        <FormControl>
                                                            <RadioGroupItem value={ENavLinkType.DropDown} />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Drop Down
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {
                            navLinkType !== ENavLinkType.DropDown && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name={`${name}.newTab`}
                                        render={({ field }) => {
                                            return (
                                                <FormItem className="flex flex-row items-center gap-2 self-end">
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
                                    <FormField
                                        control={form.control}
                                        name={`${name}.url`}
                                        render={({ field }) => {
                                            return navLinkType === ENavLinkType.External ? (
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
                                                    onChange={field.onChange}
                                                    name={`${name}.url`}
                                                />
                                            )
                                        }}
                                    />
                                </>
                            )
                        }

                        <FormField
                            control={form.control}
                            name={`${name}.text`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label <span className='text-destructive'>*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Eg. Learm More"
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
                            name={`${name}.variant`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Appearance</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full capitalize">
                                                <SelectValue placeholder="Select an option" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                [ECtaVariant.Default, ECtaVariant.Link].map((v) => (
                                                    <SelectItem key={v} value={v} className="capitalize">{v}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>

                    {
                        !isSubLink && navLinkType === ENavLinkType.DropDown && (
                            <FormField
                                control={form.control}
                                name={`navLinks.${idx}.subLinks`}
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Sub Nav Links</FormLabel>
                                        <section className="space-y-2">
                                            <FieldArraySortableContext
                                                fields={fields}
                                                move={move}
                                            >
                                                <section className="space-y-2">
                                                    {
                                                        fields.map((f, subIdx) => (
                                                            <SubLinkSortableField
                                                                key={f.id}
                                                                f={f}
                                                                idx={subIdx}
                                                                name={name}
                                                                subIdx={subIdx}
                                                                actions={{ swap, remove, insert }}
                                                            />
                                                        ))
                                                    }
                                                </section>
                                            </FieldArraySortableContext>
                                            {
                                                fields.length < MAX_NAV_SUB_LINKS && (
                                                    <FormControl>
                                                        <Button
                                                            type="button"
                                                            variant={"outline"}
                                                            size={"sm"}
                                                            className="font-normal text-xs w-fit"
                                                            disabled={fields.length >= MAX_NAV_SUB_LINKS}
                                                            onClick={() => {
                                                                if (fields.length >= MAX_NAV_SUB_LINKS) return;

                                                                append({
                                                                    type: ENavLinkType.Internal,
                                                                    text: "",
                                                                    newTab: false,
                                                                    subLinks: [],
                                                                    url: "",
                                                                    icon: "",
                                                                    variant: ECtaVariant.Link
                                                                })
                                                            }}
                                                        >
                                                            <Plus size={16} /> Add Sub Link
                                                        </Button>
                                                    </FormControl>
                                                )
                                            }
                                        </section>
                                    </FormItem>
                                )}
                            />
                        )
                    }
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

function SubLinkSortableField({
    f,
    idx,
    name,
    subIdx,
    actions: { swap, insert, remove }
}: {
    f: FieldArrayWithId,
    idx: number,
    subIdx: number,
    name: string
    actions: {
        swap: UseFieldArraySwap
        remove: UseFieldArrayRemove
        insert: UseFieldArrayInsert<any>
    }
}) {
    const form = useFormContext();
    const { attributes, listeners, isDragging, setNodeRef, transform, transition } = useSortable({ id: f.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <section ref={setNodeRef} style={style} className={`${isDragging ? "opacity-50" : ""}`}>
            <FormField
                key={f.id}
                control={form.control}
                name={`${name}.subLinks.${subIdx}`}
                render={({ field }) => {
                    const isFieldError = Array.isArray(form.formState.errors.navLinks) && !!form.formState.errors.navLinks[idx]?.subLinks?.[subIdx];

                    return (
                        <FormItem>
                            <FormControl>
                                <NavLinkFormField
                                    idx={subIdx}
                                    name={`${name}.subLinks.${subIdx}`}
                                    accordionActions={{
                                        onMoveUp: () => swap(idx, idx - 1),
                                        onMoveDown: () => swap(idx, idx + 1),
                                        onRemove: () => remove(idx),
                                        onDuplicate: () => insert(idx + 1, field.value),
                                        onAddBelow: () => insert(idx + 1, navLinkDefaultValue),
                                    }}
                                    isSubLink
                                    isFieldError={isFieldError}
                                    draggableAttributes={attributes}
                                    listeners={listeners}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }}
            />
        </section>
    )
}