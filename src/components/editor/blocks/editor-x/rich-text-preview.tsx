"use client";

import isEmptyHTML from "@/lib/utilities/isEmptyHTML";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  html: string;
};

export function RichTextPreview({ className, html }: Props) {
  if (isEmptyHTML(html)) return null;

  return (
    <div
      className={cn("rich_text", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
