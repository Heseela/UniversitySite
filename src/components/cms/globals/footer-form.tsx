"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import LoadingButton from "@/components/forms/loading-button";
import { useTransition } from "react";
import { showServerError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ENavLinkType, footerSchema, MAX_NAV_LINKS, navLinkDefaultValue, TFooterDto } from "@/schemas/globals.schema";
import { FieldArrayWithId, useFieldArray, UseFieldArrayInsert, UseFieldArrayRemove, UseFieldArraySwap, useForm, useFormContext } from "react-hook-form";
import NavLinkFormField from "./navlinks-form-field";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { updateFooter } from "@/lib/actions/globals.action";
import { toast } from "sonner";
import { ECtaVariant } from "../../../../types/blocks.types";
import { TFooterSelect } from "@/db/schema/globals";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import FieldArraySortableContext from "@/components/dnd/field-array-sortable-context";

type Props = {
    defaultValues: TFooterSelect;
}

export default function FooterForm({ defaultValues }: Props) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<TFooterDto>({
        resolver: zodResolver(footerSchema),
        defaultValues: defaultValues ?? {
            navLinks: [],
            footerText: ""
        }
    });

    function onSubmit(values: TFooterDto) {
        startTransition(async () => {
            try {
                await updateFooter(defaultValues.id, values);
                toast.success("Footer updated");
            } catch (e) {
                showServerError(e);
                console.log(e);
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <section className="space-y-6 pb-40">
                    <header className="container">
                        <h3 className="text-3xl font-bold capitalize max-w-[50ch] break-words">Footer</h3>
                    </header>
                    <section className="border-y sticky z-[1] backdrop-blur-3xl top-0">
                        <section className="container flex justify-between items-center py-3">
                            <section className="text-sm">
                                <p>
                                    <span className="text-muted-foreground">Last Modified:&nbsp;</span>
                                    <time className="font-medium">{defaultValues.updatedAt.toLocaleString()}</time>
                                </p>
                            </section>
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
                        <NavLinksField />

                        <FormField
                            control={form.control}
                            name="footerText"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Footer Text</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="field-sizing-content overflow-y-hidden resize-none w-full"
                                            {...field}
                                        />
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


function NavLinksField() {
    const form = useFormContext<TFooterDto>();

    const { fields, append, remove, swap, insert, move } = useFieldArray({
        control: form.control,
        name: `navLinks`,
    });

    return (
        <FormField
            control={form.control}
            name={`navLinks`}
            render={() => (
                <FormItem>
                    <FormLabel>Navigation Links</FormLabel>
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
                    {
                        fields.length < MAX_NAV_LINKS && (
                            <FormControl>
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    size={"sm"}
                                    className="font-normal text-xs w-fit"
                                    disabled={fields.length >= MAX_NAV_LINKS}
                                    onClick={() => {
                                        if (fields.length >= MAX_NAV_LINKS) return;

                                        append({
                                            type: ENavLinkType.Internal,
                                            text: "",
                                            newTab: false,
                                            subLinks: [],
                                            url: "",
                                            variant: ECtaVariant.Link,
                                        })
                                    }}
                                >
                                    <Plus size={16} /> Add Link
                                </Button>
                            </FormControl>
                        )
                    }
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
    f: FieldArrayWithId<TFooterDto, "navLinks", "id">,
    idx: number,
    actions: {
        swap: UseFieldArraySwap
        remove: UseFieldArrayRemove
        insert: UseFieldArrayInsert<TFooterDto, "navLinks">
    }
}) {
    const form = useFormContext<TFooterDto>();
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
                name={`navLinks.${idx}`}
                render={({ field }) => {
                    const isFieldError = Array.isArray(form.formState.errors.navLinks) && !!form.formState.errors.navLinks[idx]
                    const navLinkType = form.watch(`navLinks.${idx}.type`);

                    return (
                        <FormItem>
                            <FormControl>
                                <NavLinkFormField
                                    idx={idx}
                                    name={`navLinks.${idx}`}
                                    isFieldError={isFieldError}
                                    navLinkType={navLinkType}
                                    accordionActions={{
                                        onMoveUp: () => swap(idx, idx - 1),
                                        onMoveDown: () => swap(idx, idx + 1),
                                        onRemove: () => remove(idx),
                                        onDuplicate: () => insert(idx + 1, field.value),
                                        onAddBelow: () => insert(idx + 1, navLinkDefaultValue),
                                    }}
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