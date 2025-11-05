"use client";

import { Editor } from "@/components/editor/blocks/editor-x/editor";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TJobsTabelSelect } from "@/db/schema/jobs";
import { createJob, updateJob } from "@/lib/actions/jobs.action";
import { showServerError } from "@/lib/utils";
import { EJobStatus, EJobType, jobFormDefaultValues, jobSchema, TJobSchemaType } from "@/schemas/job.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

type Props = {
    defaultValues?: TJobsTabelSelect & { id: string };
  };
  
  export default function JobForm({ defaultValues }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<TJobSchemaType>({
    resolver: zodResolver(jobSchema),
    defaultValues: defaultValues ? {
      title: defaultValues.title,
      department: defaultValues.department,
      type: defaultValues.type,
      description: defaultValues.description,
      status: defaultValues.status,
    } : jobFormDefaultValues,
  });

  function onSubmit(values: TJobSchemaType) {
    startTransition(async () => {
      try {
        if (defaultValues?.id) {
          await updateJob(defaultValues.id, values);
          toast.success("Job updated successfully");
        } else {
          await createJob(values);
          toast.success("Job created successfully");
        }
        router.push("/cms/jobs");
      } catch (e) {
        showServerError(e);
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
            <h3 className="text-3xl font-bold capitalize max-w-[50ch] break-words">
              {title || "Untitled Job"}
            </h3>
          </header>
          
          <section className="border-y sticky z-[1] backdrop-blur-3xl top-0">
            <section className="container flex justify-between items-center py-3">
              <p className="text-sm text-muted-foreground">
                {defaultValues ? "Editing job" : "Creating new job"}
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title<span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Senior Frontend Developer" 
                      className="min-h-10" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department<span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Engineering, Marketing, Design" 
                      className="min-h-10" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type<span className="text-destructive">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={EJobType.FullTime}>Full Time</SelectItem>
                        <SelectItem value={EJobType.PartTime}>Part Time</SelectItem>
                        <SelectItem value={EJobType.Internship}>Internship</SelectItem>
                        <SelectItem value={EJobType.Contract}>Contract</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status<span className="text-destructive">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={EJobStatus.Open}>Open</SelectItem>
                        <SelectItem value={EJobStatus.Closed}>Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Job Description<span className="text-destructive">*</span></FormLabel>
                    <FormDescription className="pb-4">
                      Provide detailed information about the job responsibilities, requirements, and benefits.
                    </FormDescription>
                    <FormControl>
                      <Editor
                        placeholder="Describe the job position, responsibilities, requirements, and benefits..."
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