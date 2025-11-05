"use client";

import { Editor } from "@/components/editor/blocks/editor-x/editor";
import { MediaInput, MediaItem } from "@/components/forms/media-field";
import { LoadingButton } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCourse, updateCourse } from "@/lib/actions/courses.action";
import { showServerError } from "@/lib/utils";
import {
    courseFormDefaultValues,
    courseSchema,
    EAcademicDegree,
    EAcademicFaculty,
    TCourseSchema,
} from "@/schemas/courses.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TCourseTableSelect } from "@/db/schema/courses";

type Props = {
    defaultValues?: TCourseTableSelect;
};

export default function CourseForm({ defaultValues }: Props) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<TCourseSchema>({
        resolver: zodResolver(courseSchema),
        defaultValues: defaultValues ? {
            name: defaultValues.name,
            summary: defaultValues.summary,
            description: defaultValues.description,
            coverImage: defaultValues.coverImage ?? null,
            duration: defaultValues.duration,
            degree: defaultValues.degree,
            faculty: defaultValues.faculty,
            eligibility: defaultValues.eligibility,
        } : courseFormDefaultValues,
    });

    function onSubmit(values: TCourseSchema) {
        startTransition(async () => {
            try {
                defaultValues
                    ? await updateCourse(defaultValues.id, values)
                    : await createCourse(values);

                toast.success("Course saved successfully");
                router.push("/cms/courses");
            } catch (e) {
                showServerError(e);
                console.log(e);
            }
        });
    }

    const name = useWatch({
        control: form.control,
        name: "name",
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <section className="space-y-6 pb-40">
                    <header className="container">
                        <h3 className="text-3xl font-bold capitalize max-w-[50ch] break-words">
                            {name || "Untitled Course"}
                        </h3>
                    </header>
                    <section className="border-y sticky z-[1] backdrop-blur-3xl top-0">
                        <section className="container flex justify-between items-center py-3">
                            <p className="text-sm text-muted-foreground">
                                {defaultValues ? "Editing course" : "Creating new course"}
                            </p>
                            <LoadingButton
                                type="submit"
                                size={"lg"}
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Name<span className="text-destructive">*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            required
                                            className="min-h-10"
                                            placeholder="Enter course name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="coverImage"
                            render={({ field }) => {
                                const value = field.value;
                                return (
                                    <FormItem>
                                        <FormLabel>Cover Image</FormLabel>
                                        <FormControl>
                                            {value ? (
                                                <MediaItem
                                                    media={value}
                                                    onRemove={() => {
                                                        field.onChange(null);
                                                    }}
                                                />
                                            ) : (
                                                <MediaInput
                                                    onChange={(value) => {
                                                        field.onChange(value);
                                                    }}
                                                />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duration (Years)<span className="text-destructive">*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            max={10}
                                            {...field}
                                            className="min-h-10"
                                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Duration of the course in years
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="degree"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Degree<span className="text-destructive">*</span></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select degree level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={EAcademicDegree.Undergraduate}>Undergraduate</SelectItem>
                                                <SelectItem value={EAcademicDegree.Graduate}>Graduate</SelectItem>
                                                <SelectItem value={EAcademicDegree.Post_Graduate}>Post Graduate</SelectItem>
                                                <SelectItem value={EAcademicDegree.PhD}>PhD</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="faculty"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Faculty<span className="text-destructive">*</span></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select faculty" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={EAcademicFaculty.Science}>Science</SelectItem>
                                                <SelectItem value={EAcademicFaculty.Management}>Management</SelectItem>
                                                <SelectItem value={EAcademicFaculty.Arts}>Arts</SelectItem>
                                                <SelectItem value={EAcademicFaculty.Humanity}>Humanity</SelectItem>
                                                <SelectItem value={EAcademicFaculty.Law}>Law</SelectItem>
                                                <SelectItem value={EAcademicFaculty.Other}>Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="summary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Summary<span className="text-destructive">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Brief summary of the course"
                                            required
                                            className="field-sizing-content resize-none min-h-20"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="eligibility"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Eligibility Criteria<span className="text-destructive">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Eligibility requirements for the course"
                                            required
                                            className="field-sizing-content resize-none min-h-20"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Course Description</FormLabel>
                                        <FormControl>
                                            <Editor
                                                placeholder="Detailed course description here..."
                                                editorSerializedState={field.value?.json}
                                                onSerializedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </section>
                </section>
            </form>
        </Form>
    );
}