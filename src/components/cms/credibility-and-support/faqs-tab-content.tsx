import { useMemo } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDown, ChevronUp, Copy, GripVertical, MoreHorizontal, Plus, Trash, X } from "lucide-react";
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
import { faqDefaultValue, TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import { Editor } from "@/components/editor/blocks/editor-x/editor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FaqsTabContent() {

    return (
        <div className="@container h-full">
            <div className="@5xl:grid @5xl:grid-cols-3 h-full">
                <section className="@5xl:col-span-2 py-4 @5xl:pr-8">
                    <FaqsForm />
                </section>
                <section className="h-full @5xl:border-l py-4 @5xl:pl-8">
                    <CategoriesForm />
                </section>
            </div>
        </div>
    )
}

function FaqsForm() {
    const form = useFormContext<TCredibilityAndSupport>();

    const { fields, append, remove, swap, insert } = useFieldArray({
        control: form.control,
        name: "faqs",
    });

    const categories = useWatch({
        control: form.control,
        name: "faqCategories",
    });

    const nonDuplicateCategories = useMemo(() => {
        return categories.filter((cat, idx) => {
            return categories.findIndex(c => !!c.name && c.name.toLowerCase() === cat.name.toLowerCase()) === idx
        })
    }, [categories]);

    return (
        <FormField
            control={form.control}
            name={`faqs`}
            render={() => (
                <FormItem>
                    <section className="space-y-2">
                        {
                            fields.map((f, idx) => {
                                return (
                                    <FormField
                                        key={f.id}
                                        control={form.control}
                                        name={`faqs.${idx}`}
                                        render={({ field }) => {
                                            const fieldError = Array.isArray(form.formState.errors.faqs) && !!form.formState.errors.faqs[idx];

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
                                                                                name={`faqs.${idx}.question`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormControl>
                                                                                            <input
                                                                                                maxLength={100}
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
                                                                                <DropdownMenuItem onClick={() => insert(idx + 1, faqDefaultValue)}>
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
                                                                        name={`faqs.${idx}.question`}
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>Question <span className="text-destructive">*</span></FormLabel>
                                                                                <FormControl>
                                                                                    <Input
                                                                                        className='py-5'
                                                                                        maxLength={100}
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
                                                                        name={`faqs.${idx}.answer`}
                                                                        render={({ field }) => {
                                                                            return (
                                                                                <FormItem>
                                                                                    <FormControl>
                                                                                        <Editor
                                                                                            placeholder="Answer the question..."
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
                                                                        name={`faqs.${idx}.category`}
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>Category <span className="text-destructive">*</span></FormLabel>
                                                                                <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                                                                    <FormControl>
                                                                                        <SelectTrigger className="w-full py-5">
                                                                                            <SelectValue placeholder={"Select an option"} />
                                                                                        </SelectTrigger>
                                                                                    </FormControl>
                                                                                    <SelectContent>
                                                                                        {
                                                                                            nonDuplicateCategories.map((value, ind) => (
                                                                                                <SelectItem key={ind} value={value.name}>{value.name}</SelectItem>
                                                                                            ))
                                                                                        }
                                                                                    </SelectContent>
                                                                                </Select>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
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
                    <FormControl>
                        <Button
                            type="button"
                            variant={"outline"}
                            size={"sm"}
                            className="font-normal text-xs w-fit"
                            onClick={() => append(faqDefaultValue)}
                        >
                            <Plus size={16} /> Add FAQ
                        </Button>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

function CategoriesForm() {
    const form = useFormContext<TCredibilityAndSupport>();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "faqCategories",
    });

    return (
        <FormField
            control={form.control}
            name={`faqCategories`}
            render={() => (
                <FormItem>
                    <FormLabel>Categories</FormLabel>

                    <section className="space-y-2">
                        {
                            fields.map((f, idx) => {
                                return (
                                    <FormField
                                        key={f.id}
                                        control={form.control}
                                        name={`faqCategories.${idx}`}
                                        render={() => {
                                            return (
                                                <FormItem className="flex gap-2">
                                                    <FormControl>
                                                        <FormField
                                                            control={form.control}
                                                            name={`faqCategories.${idx}.name`}
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem className="flex-1">
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <Button
                                                        type="button"
                                                        variant={"destructive"}
                                                        size={"icon"}
                                                        disabled={fields.length === 1}
                                                        onClick={() => {
                                                            if (fields.length === 1) return;
                                                            remove(idx);
                                                        }}
                                                    >
                                                        <Trash size={16} />
                                                    </Button>
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
                            onClick={() => append({ name: "" })}
                        >
                            <Plus size={16} /> Add Category
                        </Button>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}