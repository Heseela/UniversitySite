import React from 'react'
import { BlockComponentProps } from './blocks'
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TPageDto } from '@/schemas/page.schema';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TMediaSchema } from '@/schemas/media.schema';
import { MediaInput, MediaItem } from '@/components/media/media-field';

export default function TimelineBlock({ blockIdx, sectionIdx }: BlockComponentProps) {
    const form = useFormContext<TPageDto>();
    const blockName = `sections.${sectionIdx}.blocks.items.${blockIdx}` as const;
    const eventsFieldName = `${blockName}.events` as const;

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: eventsFieldName,
    });

    return (
        <section className="space-y-6">
            <FormField
                control={form.control}
                name={eventsFieldName}
                render={() => (
                    <FormItem>
                        <FormLabel>Events</FormLabel>
                        <section className="space-y-2">
                            {fields.map((f, idx) => {
                                return (
                                    <FormField
                                        key={f.id}
                                        control={form.control}
                                        name={`${eventsFieldName}.${idx}`}
                                        render={() => {
                                            const isFieldError =
                                                Array.isArray(form.formState.errors.sections) &&
                                                !!form.formState.errors.sections[sectionIdx]?.blocks
                                                    ?.items?.[blockIdx]?.cta?.[idx];

                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <EventAccordion
                                                            sectionIdx={sectionIdx}
                                                            blockIdx={blockIdx}
                                                            idx={idx}
                                                            name={`${eventsFieldName}.${idx}`}
                                                            onRemove={() => remove(idx)}
                                                            isFieldError={isFieldError}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                );
                            })}
                        </section>

                        <FormControl>
                            <section>
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    size={"sm"}
                                    className="font-normal text-xs"
                                    onClick={() => {
                                        append({
                                            title: "",
                                            description: "",
                                            date: "",
                                            media: null,
                                        });
                                    }}
                                >
                                    <Plus size={16} /> Add Event
                                </Button>
                            </section>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </section>
    )
}

type TimelineEventProps = {
    sectionIdx: number,
    blockIdx: number,
    idx: number
    name: string
    onRemove?: () => void
    isFieldError: boolean
}

function EventAccordion({ sectionIdx, blockIdx, idx, name, onRemove, isFieldError }: TimelineEventProps) {
    const form = useFormContext<TPageDto>();
    const fieldName = `sections.${sectionIdx}.blocks.items.${blockIdx}.events` as const;

    return (
        <Accordion type="multiple">
            <AccordionItem value={`${name}.id`} className={cn(
                "bg-secondary/50 border !border-b-1 rounded-md overflow-hidden",
                isFieldError && "bg-destructive/10 border-destructive"
            )}>
                <section className="relative flex items-center gap-2 px-2">
                    <button type="button" className="hover:cursor-grab">
                        <GripVertical className="text-muted-foreground" size={16} />
                    </button>
                    <AccordionTrigger className="text-sm hover:no-underline py-3">
                        <span>Event {idx + 1}</span>
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
                        name={`${fieldName}.${idx}.title`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title <span className="text-destructive">*</span></FormLabel>
                                <FormControl>
                                    <Input className="py-5" maxLength={100} {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`${fieldName}.${idx}.date`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Time <span className="text-destructive">*</span></FormLabel>
                                <FormControl>
                                    <Input
                                        className="py-5"
                                        placeholder='eg. Jan 2012'
                                        {...field} required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`${fieldName}.${idx}.description`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea className='field-sizing-content' rows={2} maxLength={1000} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`${fieldName}.${idx}.media`}
                        render={({ field }) => {
                            const value = field.value as TMediaSchema | null;

                            return (
                                <FormItem>
                                    <FormLabel>Media</FormLabel>
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
    )
}