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
import { cn, showServerError } from "@/lib/utils";
import { createFormSubmission } from "@/lib/actions/forms.action";
import { toast } from "sonner";
import { FormBlockDto } from "@/schemas/page.schema";
import { TForm } from "../../../../../types/form.types";
import { useState, useTransition } from "react";
import { FormFieldType } from "@/schemas/forms.schema";
import { MediaInput__Public, MediaItem__Public } from "@/components/media/media-field-public";
import { TMediaSchema } from "@/schemas/media.schema";

export default function RenderFormFields({ fields, introContent, id, submitBtnLabel }: FormBlockDto & TForm) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string[]>([]);
    const [media, setMedia] = useState<TMediaSchema | null>(null);
    
    // Initialize form data state with default values
    const [formData, setFormData] = useState<Record<string, unknown>>(() => {
        const initialData: Record<string, unknown> = {};
        fields?.forEach((field) => {
            if (field.type === FormFieldType.Checkbox) {
                initialData[field.name] = typeof field.defaultValue === "boolean" 
                    ? field.defaultValue 
                    : field.defaultValue === "true";
            } else if (field.type === FormFieldType.File) {
                initialData[field.name] = "";
            } else {
                initialData[field.name] = field.defaultValue || "";
            }
        });
        return initialData;
    });

    function handleFormSubmission(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        const data: Record<string, unknown> = { ...formData };

        const mediaFieldName = fields.find(f => f.type === FormFieldType.File)?.name;
        
        if (media && mediaFieldName) {
            data[mediaFieldName] = media.secure_url;
        }

        startTransition(async () => {
            try {
                const res = await createFormSubmission(id, data);
                if (res.errors) throw res.errors;
                toast.success("Submitted successfully");
                // Reset form after successful submission
                setFormData(() => {
                    const resetData: Record<string, unknown> = {};
                    fields?.forEach((field) => {
                        if (field.type === FormFieldType.Checkbox) {
                            resetData[field.name] = typeof field.defaultValue === "boolean" 
                                ? field.defaultValue 
                                : field.defaultValue === "true";
                        } else if (field.type === FormFieldType.File) {
                            resetData[field.name] = "";
                        } else {
                            resetData[field.name] = field.defaultValue || "";
                        }
                    });
                    return resetData;
                });
                setMedia(null);
                setError([]);
            } catch (error) {
                if (error instanceof Object) {
                    setError(Object.values(error));
                    return;
                }
                showServerError(error);
            }
        })
    }

    return (
        <Card className="w-full  mx-auto h-fit">
            <CardHeader>
                <RichTextPreview html={introContent?.html || ""} />
            </CardHeader>
            <CardContent>
                <form onSubmit={handleFormSubmission} className="space-y-6">
                    {fields?.map((field, idx) => (
                        <div key={idx} className="space-y-2">
                            <Label field={field} />
                            {field.type === FormFieldType.File ? (
                                <>
                                    {
                                        media ? (
                                            <MediaItem__Public
                                                media={media}
                                                onRemove={() => {
                                                    setMedia(null)
                                                }}
                                            />
                                        ) : (
                                            <MediaInput__Public
                                                onChange={(media) => { setMedia(media) }}
                                                allowedFormats={field.accept.replaceAll(/\s+/g, "").toLowerCase().split(",")}
                                            />
                                        )
                                    }
                                </>
                            ) : (
                                <RenderField 
                                    field={field} 
                                    value={formData[field.name]}
                                    onChange={(value) => setFormData(prev => ({ ...prev, [field.name]: value }))}
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
                {
                    !!error.length && (
                        <ul className="p-2 border border-destructive bg-destructive/10 text-destructive text-sm rounded-md mb-6">
                            {
                                error.map((err, idx) => (
                                    <li key={idx} className="list-disc list-inside">{err}</li>
                                ))
                            }
                        </ul>
                    )
                }
            </CardContent>
        </Card>
    );
}

const Label = ({ field }: { field: TForm["fields"][0] }) => {
    return (
        <label
            className={cn("block font-medium text-sm text-muted-foreground")}
            htmlFor={field.name}
        >
            {field.label}
            {field.required && <span className="text-destructive"> *</span>}
        </label>
    );
};

const RenderField = ({ 
    field, 
    value, 
    onChange 
}: { 
    field: TForm["fields"][0];
    value: unknown;
    onChange: (value: unknown) => void;
}) => {
    switch (field.type) {
        case FormFieldType.Text:
            return <Input
                type="text"
                id={field.name}
                placeholder={field.placeholder}
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
                name={field.name}
                required={field.required}
                {...field.validation}
                className="h-10"
            />
        case FormFieldType.Number:
            return <Input
                type="number"
                placeholder={field.placeholder}
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
                name={field.name}
                required={field.required}
                {...field.validation}
                className="h-10"
            />
        case FormFieldType.Tel:
            return <Input
                type="tel"
                id={field.name}
                placeholder={field.placeholder}
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
                name={field.name}
                required={field.required}
                {...field.validation}
                className="h-10"
            />
        case FormFieldType.Email:
            return <Input
                type="email"
                id={field.name}
                placeholder={field.placeholder}
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
                name={field.name}
                required={field.required}
                {...field.validation}
                className="h-10"
            />
        case FormFieldType.Textarea:
            return <Textarea
                id={field.name}
                className={cn("resize-none field-sizing-content whitespace-pre-wrap break-words")}
                placeholder={field.placeholder}
                rows={4}
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
                name={field.name}
                required={field.required}
                {...field.validation}
            />
        case FormFieldType.Checkbox:
            return <Checkbox
                id={field.name}
                name={field.name}
                checked={value as boolean}
                onCheckedChange={(checked) => onChange(checked)}
            />
        case FormFieldType.Radio:
            return <RadioGroup
                id={field.name}
                name={field.name}
                value={value as string}
                onValueChange={(value) => onChange(value)}
            >
                {field.options?.map((option, optIdx) => (
                    <div key={optIdx} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`${field.name}-${optIdx}`} />
                        <Label field={{ ...field, label: option.label }} />
                    </div>
                ))}
            </RadioGroup>
        case FormFieldType.Select:
            return <Select
                name={field.name}
                value={value as string}
                onValueChange={(value) => onChange(value)}
            >
                <SelectTrigger>
                    <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {field.options?.map((option, optIdx) => (
                        <SelectItem key={optIdx} value={option.value}>{option.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        default:
            return null;
    }
}