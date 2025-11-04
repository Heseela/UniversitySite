import { FieldArrayWithId, useFieldArray, useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BlockComponentProps } from "../blocks";
import { ECardsBlockLayout } from "../../../../../../../types/blocks.types";
import CardAccordion from "./card-accordion";
import { MAX_CARD_BLOCK_CARDS, TPageDto } from "@/schemas/page.schema";
import { richTextDefaultValues } from "@/schemas/rich-text.schema";
import { Input } from "@/components/ui/input";
import { NUMBER_REGEX_STRING } from "@/CONSTANTS";
import FieldArraySortableContext from "@/components/dnd/field-array-sortable-context";
import { useSortable } from "@dnd-kit/sortable";

export default function CardsBlock({ sectionIdx, blockIdx }: BlockComponentProps) {
    const form = useFormContext<TPageDto>();

    const blockName = `sections.${sectionIdx}.blocks.items.${blockIdx}` as const;
    const cardFieldName = `${blockName}.cards` as const;

    const { fields, append, remove, move } = useFieldArray({
        control: form.control,
        name: cardFieldName,
    });

    return (
        <section className="space-y-6">
            <FormField
                control={form.control}
                name={`${blockName}.layout`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Layout <span className="text-destructive">*</span></FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            required
                        >
                            <FormControl>
                                <SelectTrigger className="w-full py-5">
                                    <SelectValue placeholder={"Select an option"} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {
                                    Object.entries(ECardsBlockLayout).map(([key, value]) => (
                                        <SelectItem key={key} value={value}>{key}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={`${blockName}.columns`}
                render={() => (
                    <FormItem>
                        <FormLabel>Columns</FormLabel>
                        <section className="grid grid-cols-4 gap-2">
                            <FormField
                                control={form.control}
                                name={`${blockName}.columns.sm`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Small</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="py-5"
                                                type="number"
                                                pattern={NUMBER_REGEX_STRING}
                                                max={MAX_CARD_BLOCK_CARDS}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`${blockName}.columns.md`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Medium</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="py-5"
                                                type="number"
                                                pattern={NUMBER_REGEX_STRING}
                                                max={MAX_CARD_BLOCK_CARDS}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`${blockName}.columns.lg`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Large</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="py-5"
                                                type="number"
                                                pattern={NUMBER_REGEX_STRING}
                                                max={MAX_CARD_BLOCK_CARDS}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`${blockName}.columns.xl`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Extra Large</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="py-5"
                                                type="number"
                                                pattern={NUMBER_REGEX_STRING}
                                                max={MAX_CARD_BLOCK_CARDS}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </section>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Cards */}
            <FieldArraySortableContext
                fields={fields}
                move={move}
            >
                <section className="space-y-2">
                    <FormField
                        control={form.control}
                        name={`${blockName}.cards`}
                        render={() => (
                            <FormItem>
                                <FormLabel>Cards <span className='text-destructive'>*</span></FormLabel>

                                <section className="space-y-2" style={{ marginBottom: "0" }}>
                                    {
                                        fields.map((f, idx) => {
                                            return (
                                                <FormField
                                                    key={f.id}
                                                    control={form.control}
                                                    name={`${cardFieldName}.${idx}`}
                                                    render={() => {
                                                        const isFieldError = Array.isArray(form.formState.errors.sections) && !!form.formState.errors.sections[sectionIdx]?.blocks.items[blockIdx].cards?.[idx];

                                                        return (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <CardAccordion
                                                                        idx={idx}
                                                                        name={`${cardFieldName}.${idx}`}
                                                                        onRemove={() => remove(idx)}
                                                                        isFieldError={isFieldError}
                                                                        fieldId={f.id}
                                                                    />
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

                                <FormControl>
                                    <Button
                                        type="button"
                                        variant={"outline"}
                                        size={"sm"}
                                        className="font-normal text-xs w-fit"
                                        onClick={() => {
                                            append({
                                                title: "",
                                                subtitle: "",
                                                description: richTextDefaultValues,
                                                link: undefined,
                                                image: undefined,
                                                borderLess: false,
                                                newTab: false
                                            })
                                        }}
                                    >
                                        <Plus size={16} /> Add Card
                                    </Button>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
            </FieldArraySortableContext>
        </section>
    )
}