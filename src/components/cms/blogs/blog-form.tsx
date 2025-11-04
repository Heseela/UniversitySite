"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useTransition } from "react";
import FullYooptaEditor from "@/components/yoopta-editor";
import { blogSchema, blogSchemaType } from "@/schemas/blog.schema";
import { toast } from "sonner";
import { updateBlog } from "@/lib/actions/blogs.action";
import { Badge } from "@/components/ui/badge";
import { CldImage } from "next-cloudinary";
import { Button, buttonVariants } from "@/components/ui/button";
import { Star } from "lucide-react";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import PublishButton from "./blog-publish-btn";
import AddSummaryButton from "./add-summary-btn";
import AddKeywordsBtn from "./add-keywords-btn";
import CoverImageUploadBtn from "./cover-image-upload-btn";
import useEffectAfterMount from "@/hooks/useEffectAfterMount";
import YooptaEditorReadonly from "@/components/yoopta-editor/readonly";
import { Form } from "@/components/ui/form";
import { TBlog } from "../../../../types/blog.types";
import { SelectOption } from "../../../../types/global.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  defaultValues: TBlog;
  categoriesOptions: SelectOption[];
};

export default function BlogForm({ defaultValues, categoriesOptions }: Props) {
  const [isPending, startTransition] = useTransition();
  const isPublished = defaultValues.publishedAt !== null;

  const form = useForm<blogSchemaType>({
    resolver: zodResolver(blogSchema),
    defaultValues,
  });

  function update({
    values = form.getValues(),
  }: {
    values?: Partial<blogSchemaType>;
  }) {
    if (isPublished) return;

    startTransition(async () => {
      try {
        await updateBlog(defaultValues.id, {
          ...values,
          title: values.title?.length
            ? values.title
            : defaultValues.title || "Untitled",
          length: form.getValues("length"),
        });
      } catch (e) {
        if (e instanceof Error) {
          toast.error("Unexpected Error", {
            description: e.message,
          });
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    });
  }

  const title = form.watch("title");
  const content = form.watch("content");
  const isFavourite = form.watch("isFavourite");

  // auto save
  useEffectAfterMount(() => {
    const dataToUpdate =
      title !== defaultValues.title // this is to ensure if only title is change don't save content again
        ? { title }
        : { content };

    const handler = setTimeout(() => {
      update({ values: dataToUpdate });
    }, 500);

    return () => clearTimeout(handler);
  }, [title, content]);

  // add event listener to save
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.userAgent.includes("Mac");
      if ((isMac ? event.metaKey : event.ctrlKey) && event.key === "s") {
        event.preventDefault(); // prevent the default browser save
        update({});
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  async function onSubmit(values: blogSchemaType) {
    update({ values });
  }

  async function onFavoutiteChange() {
    try {
      form.setValue("isFavourite", !isFavourite);
      await updateBlog(
        defaultValues.id,
        {
          isFavourite: !isFavourite,
        },
        false
      );
    } catch (e) {
      form.setValue("isFavourite", !isFavourite);
      console.log(e);
    }
  }

  return (
    <section>
      <div className="px-4">
        <section className="flex justify-end gap-2">
          <TooltipWrapper
            label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          >
            <Button
              type="button"
              size={"icon"}
              variant={"ghost"}
              onClick={onFavoutiteChange}
            >
              <Star
                className={cn(isFavourite && "text-orange-400 fill-orange-400")}
              />
            </Button>
          </TooltipWrapper>

          <PublishButton blog={defaultValues} />
        </section>
        {defaultValues.publishedAt && (
          <p className="text-right text-sm text-muted-foreground">
            Last published at: {defaultValues.publishedAt?.toLocaleString()}
          </p>
        )}
      </div>

      <section className="px-6 max-w-4xl mx-auto min-h-[calc(100vh-128px)]">
        {defaultValues.coverImage && (
          <CldImage
            width="200"
            height="200"
            src={defaultValues.coverImage}
            sizes="200px"
            alt="Blog Cover Image"
            title="Blog Cover Image"
            crop={"auto"}
            className="rounded-sm"
          />
        )}

        <section className="flex mt-1">
          <CoverImageUploadBtn
            blogId={defaultValues.id}
            title={title}
            coverImage={form.watch("coverImage")}
            onChange={(value) => form.setValue("coverImage", value)}
            disabled={isPublished}
          />

          <AddSummaryButton
            blogId={defaultValues.id}
            summary={form.watch("summary")}
            onChange={(value) => form.setValue("summary", value)}
            disabled={isPublished}
          />
          <AddKeywordsBtn
            blogId={defaultValues.id}
            keywords={form.watch("keywords")}
            onChange={(value) => form.setValue("keywords", value)}
            disabled={isPublished}
          />
          <Select
            onValueChange={(val) => {
              form.setValue("categoryId", val);
              update({
                values: {
                  categoryId: val,
                },
              });
            }}
            defaultValue={form.getValues("categoryId") || ""}
            disabled={isPublished}
          >
            <SelectTrigger
              className={cn(
                "border-none shadow-none !h-8 !text-muted-foreground",
                buttonVariants({ variant: "ghost" })
              )}
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoriesOptions.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 space-y-2 h-full"
          >
            <textarea
              autoFocus
              placeholder="Title"
              className="field-sizing-content overflow-y-hidden py-3 pt-2 resize-none text-4xl xl:text-5xl font-extrabold text-slate-800 dark:text-slate-200 w-full focus-visible:outline-0"
              value={title}
              onChange={(e) => form.setValue("title", e.target.value)}
              disabled={defaultValues.publishedAt !== null}
              aria-disabled={defaultValues.publishedAt !== null}
              readOnly={defaultValues.publishedAt !== null}
              aria-readonly={defaultValues.publishedAt !== null}
            />

            <section className="flex justify-end gap-1">
              <Badge variant={"secondary"}>
                {isPending ? "Saving..." : "Saved"}
              </Badge>

              <Badge variant={"secondary"}>
                {form.getValues("length")} chars
              </Badge>
            </section>

            {isPublished ? (
              <YooptaEditorReadonly value={defaultValues.content} />
            ) : (
              <FullYooptaEditor
                value={form.watch("content")}
                onChange={(value) => form.setValue("content", value)}
                containerClassName="min-h-full"
                setLength={(length) => {
                  form.setValue("length", length);
                }}
                readOnly={defaultValues.publishedAt !== null} // TODO: idk why this prop is not causing the editor to be readonly, so used conditional editors
              />
            )}
          </form>
        </Form>
      </section>
    </section>
  );
}
