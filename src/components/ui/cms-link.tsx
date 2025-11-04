import { CTADto } from "@/schemas/hero-section.schema";
import { ELinkType } from "../../../types/global.types";
import { Button, ButtonProps } from "./button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CMSLink({
    arrow,
    link,
    newTab,
    text,
    type,
    variant, // "primary" | "outline"
    className,
    size
}: CTADto & Pick<ButtonProps, 'className' | 'size'>) {
    const href = type === ELinkType.External
        ? link
        : link.startsWith("/")
            ? link
            : `/${link}`

    const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

    return (
        <Button
            type="button"
            asChild
            variant={variant}
            size={size}
            className={cn("group", className)}
        >
            <Link href={href} {...newTabProps}>
                {text}
                {arrow && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform ease-in-out duration-300" />}
            </Link>
        </Button>
    )
}