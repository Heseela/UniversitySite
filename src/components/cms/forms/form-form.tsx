"use client";

import { FormDtoSchema, TFormDto } from "@/schemas/forms.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldArrayWithId, useFieldArray, UseFieldArrayInsert, UseFieldArrayRemove, UseFieldArraySwap, useForm, useFormContext, useWatch } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AddFormFieldDialog from "./form-field-add-dialog";
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
import LoadingButton from "@/components/forms/loading-button";
import { useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { fields as formFields } from "./fields/fields"
import { createForm, updateForm } from "@/lib/actions/forms.action";
import { cn, showServerError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable";
import FieldArraySortableContext from "@/components/dnd/field-array-sortable-context";

type Props = {
    defaultValues: Partial<TFormDto>,
    meta: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }
} | {
    defaultValues?: undefined,
    meta?: undefined
}

export default function FormForm({ defaultValues, meta }: Props) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<TFormDto>({
        resolver: zodResolver(FormDtoSchema),
        defaultValues: defaultValues ?? {
            title: "",
            fields: [],
            submitBtnLabel: "Submit"
        }
    });

    function onSubmit(values: TFormDto) {
        startTransition(async () => {
            try {
                if (!!meta) {
                    await updateForm(meta.id, values);
                    toast.success("Updated successfully");
                } else {
                    await createForm(values);
                    toast.success("Form created");
                    router.push("/cms/forms");
                }
            } catch (e) {
                showServerError(e);
                console.log(e);
            }
        });
    }

    const title = useWatch({
        control: form.control,
        name: "title",
    });


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <section className="space-y-6 pb-40">
                    <header className="container">
                        <h3 className="text-3xl font-bold capitalize max-w-[50ch] break-words">{title || "[Untitled]"}</h3>
                    </header>
                    <section className="border-y sticky z-[1] backdrop-blur-3xl top-0">
                        <section className="container flex items-center justify-between py-3">
                            {
                                meta ? (
                                    <section className="text-sm flex gap-6">
                                        <p>
                                            <span className="text-muted-foreground">Last Modified:&nbsp;</span>
                                            <time className="font-medium">{meta.updatedAt.toLocaleString()}</time>
                                        </p>
                                        <p>
                                            <span className="text-muted-foreground">Created:&nbsp;</span>
                                            <time className="font-medium">{meta.createdAt.toLocaleString()}</time>
                                        </p>
                                    </section>
                                ) : (
                                    <span className="text-sm text-muted-foreground">Creating new Form</span>
                                )
                            }
                            <LoadingButton
                                type="submit"
                                size={'lg'}
                                isLoading={isPending}
                                disabled={isPending}
                                loadingText="Saving..."
                            >
                                Save
                            </LoadingButton>
                        </section>
                    </section>

                    <section className="container space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title <span className="text-destructive">*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            required
                                            placeholder="Eg. Contact Form"
                                            minLength={3}
                                            maxLength={50}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Fields />

                        <FormField
                            control={form.control}
                            name="submitBtnLabel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Submit Button Label</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>
                </section>
            </form>
        </Form>
    )
}

function Fields() {
    const form = useFormContext<TFormDto>();

    const { fields, append, remove, insert, swap, move } = useFieldArray({
        control: form.control,
        name: "fields",
    });

    return (
        <FormField
            control={form.control}
            name="fields"
            render={() => (
                <FormItem>
                    <FormLabel>Fields <span className="text-destructive">*</span></FormLabel>

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

                    <FormControl>
                        <section>
                            <AddFormFieldDialog
                                onSelect={(field) => {
                                    append(field);
                                }}
                            >
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    size={"sm"}
                                    className="font-normal text-xs"
                                >
                                    <Plus size={16} /> Add Field
                                </Button>
                            </AddFormFieldDialog>
                        </section>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

function SortableField({
    f,
    idx,
    actions: { swap, insert, remove }
}: {
    f: FieldArrayWithId<TFormDto, "fields", "id">,
    idx: number,
    actions: {
        swap: UseFieldArraySwap
        remove: UseFieldArrayRemove
        insert: UseFieldArrayInsert<TFormDto, "fields">
    }
}) {
    const form = useFormContext<TFormDto>();
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
                name={`fields.${idx}`}
                render={({ field }) => {
                    const fieldType = field.value.type;
                    const FormFieldComponent = formFields[fieldType];
                    const fieldError = Array.isArray(form.formState.errors.fields) && form.formState.errors.fields[idx];

                    return (
                        <FormItem>
                            <FormControl>
                                <Accordion type="multiple">
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
                                            <AccordionTrigger className="text-sm hover:no-underline py-2.5">
                                                <section className="space-x-3">
                                                    <span className="font-light">{(idx + 1).toString().padStart(2, "0")}</span>
                                                    <Badge className="capitalize">{fieldType}</Badge>
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
                                                        <AddFormFieldDialog
                                                            onSelect={(field) => {
                                                                insert(idx + 1, field);
                                                            }}
                                                        >
                                                            <Button
                                                                variant={"ghost"}
                                                                className="w-full justify-start !px-2 !py-1.5 hover:!bg-accent font-normal"
                                                            >
                                                                <span className="text-muted-foreground"><Plus /></span>
                                                                Add Below
                                                            </Button>
                                                        </AddFormFieldDialog>
                                                        <DropdownMenuItem onClick={() => insert(idx + 1, field.value)}>
                                                            <Copy /> Duplicate
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => remove(idx)}>
                                                            <X /> Remove
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </section>
                                        </section>
                                        <AccordionContent className="px-3 py-5 bg-background">
                                            {
                                                FormFieldComponent && <FormFieldComponent
                                                    idx={idx}
                                                />
                                            }
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }}
            />
        </section>
    )
}