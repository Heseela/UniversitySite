import { publishBlog, unpublishBlog } from "@/lib/actions/blogs.action";
import { showServerError } from "@/lib/utils";
import { blogSummarySchema } from "@/schemas/blog.schema";
import { useState, useTransition } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ResponsiveAlertDialog } from "@/components/ui/responsive-alert-dialog";
import { Globe, GlobeLock } from "lucide-react";
import { TBlogTableSelect } from "@/db/schema/blog";

type Props = {
  blog: TBlogTableSelect;
};

const schema = z.object({
  summary: blogSummarySchema,
  coverImage: z
    .string({ required_error: "Cover image is required" })
    .min(1, { message: "Cover image is required" }),
});

export default function PublishButton({ blog }: Props) {
  const { id, summary = "", publishedAt, coverImage = "", categoryId } = blog;

  const [unpublishOpen, setUnpublishOpen] = useState(false);
  const [publishOpen, setpublishOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onPublishOpen() {
    if (coverImage === null) return toast.error("Cover image is required");

    if (!z.string().uuid().safeParse(categoryId).success)
      return toast.error("Please select category");

    const { success, error } = schema.safeParse({ summary, coverImage });

    if (!success) return showServerError(error);

    setpublishOpen(true);
  }

  function onPublish() {
    startTransition(async () => {
      try {
        await publishBlog({ id });
        toast.success("Blog published successfully");
        setpublishOpen(false);
      } catch (e) {
        showServerError(e);
      }
    });
  }

  function onUnpublish() {
    startTransition(async () => {
      try {
        await unpublishBlog(id);
        toast.success("Blog unpublished successfully");
        setUnpublishOpen(false);
      } catch (e) {
        showServerError(e);
      }
    });
  }

  return (
    <>
      <ResponsiveAlertDialog
        title="Are you sure you want to unpublish this blog?"
        description="This action will unpublish the blog. Viewers will no longer be able to view the blog."
        isOpen={unpublishOpen}
        setIsOpen={setUnpublishOpen}
        action={onUnpublish}
        actionLabel="Unpublish"
        isLoading={isPending}
        loadingText="Unpublishing..."
      />

      <ResponsiveAlertDialog
        title="Publish Blog?"
        description="It will take upto an hour to publish the blog. You cannot edit the blog once it is published."
        isOpen={publishOpen}
        setIsOpen={setpublishOpen}
        action={onPublish}
        actionLabel="Publish"
        isLoading={isPending}
        loadingText="Publishing..."
        loadingButtonProps={{
          variant: "success",
        }}
      />

      {publishedAt ? (
        <Button variant={"ghost"} onClick={() => setUnpublishOpen(true)}>
          <GlobeLock />
          Unpublish
        </Button>
      ) : (
        <Button variant={"ghost"} onClick={onPublishOpen}>
          <Globe />
          Publish
        </Button>
      )}
    </>
  );
}
