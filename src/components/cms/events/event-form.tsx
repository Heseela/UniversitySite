"use client";

import { Editor } from "@/components/editor/blocks/editor-x/editor";
import { InfiniteSelect } from "@/components/forms/infinite-select";
import { MediaInput, MediaItem } from "@/components/forms/media-field";
import { LoadingButton } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
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
import { TEvent } from "@/db/schema/event";
import { createEvent, updateEvent } from "@/lib/actions/events.action";
import { showServerError } from "@/lib/utils";
import {
  eventFormDefaultValues,
  eventSchema,
  eventSchemaType,
} from "@/schemas/event.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  defaultValues?: TEvent;
  selectedCategory?: { label: string; value: string | null };
};

export default function EventForm({ defaultValues, selectedCategory }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<eventSchemaType>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      ...(defaultValues ?? eventFormDefaultValues),
      categoryId: selectedCategory?.value ?? undefined,
      categoryName: selectedCategory?.label ?? "",
    },
  });

  function onSubmit(values: eventSchemaType) {
    startTransition(async () => {
      try {
        defaultValues
          ? await updateEvent(defaultValues.id, values)
          : await createEvent(values);

        toast.success("Successfully done");
        router.push("/cms/events");
      } catch (e) {
        showServerError(e);
        console.log(e);
      }
    });
  }

  const name = useWatch({
    control: form.control,
    name: "title",
  });
  
  console.log(form.getValues())

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="space-y-6 pb-40">
          <header className="container">
            <h3 className="text-3xl font-bold capitalize max-w-[50ch] break-words">
              {name || "Untitled"}
            </h3>
          </header>
          <section className="border-y sticky z-[1] backdrop-blur-3xl top-0">
            <section className="container flex justify-between items-center py-3">
              <p className="text-sm text-muted-foreground">
                Creating new event
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
                  <FormLabel>Title<span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input required className="min-h-10" {...field} />
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
              name="venue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg. Future Creatify Headquarters, City, Country"
                      {...field}
                      className="min-h-10"
                    />
                  </FormControl>
                  <FormDescription>
                    Leave empty if the event is virtual.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      value={field.value || 0}
                      className="min-h-10"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Schedule <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      className="min-h-10"
                      {...field}
                      value={format(field.value, "yyyy-MM-dd'T'HH:mm:ss")}
                      onChange={e => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <InfiniteSelect
                      endpoint="/categories/options"
                      placeholder="Select a category"
                      selected={{
                        label: form.getValues("categoryName") || "",
                        value: field.value,
                      }}
                      onSelectionChange={(val) => {
                        field.onChange(val.value);
                        form.setValue("categoryName", val.label);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    About Event<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Summary of this event"
                      required
                      className="field-sizing-content resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`content`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Editor
                        placeholder="Event description here..."
                        editorSerializedState={field.value.json}
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
