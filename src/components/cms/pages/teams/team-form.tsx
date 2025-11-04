"use client";

import { MediaInput, MediaItem } from "@/components/forms/media-field";
import { Button, LoadingButton } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TTeamTableSelect } from "@/db/schema/team";
import { createTeam, updateTeam } from "@/lib/actions/teams.action";
import { showServerError } from "@/lib/utils";
import { teamDefaultValue, teamSchema, TTeamDto } from "@/schemas/team.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  defaultValues?: TTeamTableSelect;
};

export default function TeamForm({ defaultValues }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<TTeamDto>({
    resolver: zodResolver(teamSchema),
    defaultValues: defaultValues ?? teamDefaultValue,
  });

  function onSubmit(values: TTeamDto) {
    startTransition(async () => {
      try {
        defaultValues
          ? await updateTeam(defaultValues.id, values)
          : await createTeam(values);
        toast.success("Team Saved");
        router.push("/cms/teams");
      } catch (e) {
        showServerError(e);
        console.log(e);
      }
    });
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

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
              {name || "[No name]"}
            </h3>
          </header>
          <section className="border-y sticky z-[1] backdrop-blur-3xl top-0">
            <section className="container flex items-center justify-between py-3">
              {defaultValues ? (
                <section className="text-sm flex gap-6">
                  <p>
                    <span className="text-muted-foreground">
                      Last Modified:&nbsp;
                    </span>
                    <time className="font-medium">
                      {defaultValues.updatedAt?.toLocaleString()}
                    </time>
                  </p>
                  <p>
                    <span className="text-muted-foreground">
                      Created:&nbsp;
                    </span>
                    <time className="font-medium">
                      {defaultValues.createdAt?.toLocaleString()}
                    </time>
                  </p>
                </section>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Creating new team member
                </span>
              )}
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
                  <FormLabel>
                    Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input className="min-h-10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => {
                const value = field.value;

                return (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Role <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input className="min-h-10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>More Info</FormLabel>
                  <FormControl>
                    <Textarea
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
              name="socialLinks"
              render={() => (
                <FormItem>
                  <FormLabel className="w-fit">Social Links</FormLabel>
                  <section className="space-y-2">
                    {fields.map((f, idx) => {
                      return (
                        <FormField
                          key={f.id}
                          control={form.control}
                          name={`socialLinks.${idx}.link`}
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormControl>
                                  <section className="flex items-center gap-2">
                                    <Input
                                      placeholder="Eg. https://facebook.com/yourpage"
                                      {...field}
                                    />
                                    <Button
                                      size={"icon"}
                                      variant={"destructive"}
                                      type="button"
                                      className="p-5"
                                      onClick={() => remove(idx)}
                                    >
                                      <Trash />
                                    </Button>
                                  </section>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      );
                    })}
                  </section>
                  {fields.length < 5 && (
                    <FormControl>
                      <Button
                        type="button"
                        variant={"outline"}
                        size={"sm"}
                        className="font-normal text-xs w-fit"
                        disabled={fields.length >= 5}
                        onClick={() => {
                          if (fields.length >= 5) return;

                          append({
                            link: "",
                          });
                        }}
                      >
                        <Plus size={16} /> Add Link
                      </Button>
                    </FormControl>
                  )}
                </FormItem>
              )}
            />
          </section>
        </section>
      </form>
    </Form>
  );
}
