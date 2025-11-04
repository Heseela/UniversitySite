"use client";

import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import { LoadingButton } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import isEmptyHTML from "@/lib/utilities/isEmptyHTML";
import { cn, showServerError } from "@/lib/utils";
import { createFormSubmission } from "@/lib/actions/forms.action";
import { toast } from "sonner";
import { FormBlockDto } from "@/schemas/page.schema";
import { TForm } from "../../../../../types/form.types";
import { useTransition } from "react";

export default function RenderFormFields({ fields, introContent, id, submitBtnLabel }: FormBlockDto & TForm) {
    const [isPending, startTransition] = useTransition();

    async function handleFormSubmission(formData: FormData) {
        // Convert FormData to object
        const data: Record<string, unknown> = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        startTransition(async () => {
            try {
                await createFormSubmission(id, data);
                toast.success("Submitted successfully");
            } catch (error) {
                showServerError(error);
            }
        })
    }

    return (
        <Card className="w-full">
            <CardHeader>
                {!isEmptyHTML(introContent?.html || "") && (
                    <section>
                        <RichTextPreview html={introContent?.html || ""} />
                    </section>
                )}
            </CardHeader>
            <CardContent>
                <form action={handleFormSubmission} className="space-y-6">
                    {fields?.map((field, idx) => (
                        <div key={idx} className="space-y-2">
                            <Label className="mb-2">
                                {field.label}
                                {field.required && <span className="text-destructive"> *</span>}
                            </Label>

                            {/* Field type rendering with proper validation */}
                            {field.type === "text" && (
                                <Input
                                    type="text"
                                    placeholder={field.placeholder}
                                    defaultValue={field.defaultValue}
                                    name={field.name}
                                    required={field.required}
                                    {...field.validation}
                                    className="h-10"
                                />
                            )}

                            {field.type === "number" && (
                                <Input
                                    type="number"
                                    placeholder={field.placeholder}
                                    defaultValue={field.defaultValue}
                                    name={field.name}
                                    required={field.required}
                                    {...field.validation}
                                    className="h-10"
                                />
                            )}

                            {field.type === "tel" && (
                                <Input
                                    type="tel"
                                    placeholder={field.placeholder}
                                    defaultValue={field.defaultValue}
                                    name={field.name}
                                    required={field.required}
                                    {...field.validation}
                                    className="h-10"
                                />
                            )}




                            {field.type === "select" && (
                                <Select name={field.name} defaultValue={field.defaultValue}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={field.placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.options?.map((option, optIdx) => (
                                            <SelectItem key={optIdx} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}

                            {field.type === "radio" && (
                                <RadioGroup name={field.name} defaultValue={field.defaultValue}>
                                    {field.options?.map((option, optIdx) => (
                                        <div key={optIdx} className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value={option.value}
                                                id={`${field.name}-${optIdx}`}
                                            />
                                            <Label htmlFor={`${field.name}-${optIdx}`}>
                                                {option.label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}

                            {field.type === "checkbox" && (
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        name={field.name}
                                        id={field.name}
                                        defaultChecked={
                                            typeof field.defaultValue === "boolean"
                                                ? field.defaultValue
                                                : field.defaultValue === "true"
                                        }
                                    />
                                    <Label htmlFor={field.name}>{field.placeholder}</Label>
                                </div>
                            )}

                            {field.type === "email" && (
                                <Input
                                    type="email"
                                    placeholder={field.placeholder}
                                    defaultValue={field.defaultValue}
                                    name={field.name}
                                    required={field.required}
                                    {...field.validation}
                                    className="h-10"
                                />
                            )}
                            {field.type === "textarea" && (
                                <Textarea
                                    className={cn("max-h-24 overflow-y-auto resize-none field-sizing-content whitespace-pre-wrap break-words")}
                                    placeholder={field.placeholder}
                                    rows={4}
                                    defaultValue={field.defaultValue}
                                    name={field.name}
                                    required={field.required}
                                    {...field.validation}
                                />
                            )}
                        </div>
                    ))}
                    <LoadingButton
                        type="submit"
                        isLoading={isPending}
                        className="w-full"
                        disabled={isPending}
                        loadingText="Submitting..."
                    >
                        {submitBtnLabel}
                    </LoadingButton>
                </form>
            </CardContent>
        </Card>
    );
}

const Label = ({
    children,
    className,
    htmlFor,
}: {
    children: React.ReactNode;
    className?: string;
    htmlFor?: string;
}) => {
    return (
        <label
            className={cn(
                "block font-medium text-sm text-muted-foreground",
                className
            )}
            htmlFor={htmlFor}
        >
            {children}
        </label>
    );
};
