import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight, LoaderCircle } from "lucide-react";
import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils"
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center font-semibold text-lg justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-primary/10 hover:text-primary dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-600 text-white shadow-xs hover:bg-green-600/90",
        gradient: "text-white bg-gradient-to-r from-primary to-[var(--pinkish)] shadow-lg hover:shadow-xl hover:scale-105"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

interface Props extends ButtonProps, PropsWithChildren {
  isLoading: boolean;
  loadingText?: string;
}

function LoadingButton({ children, isLoading, loadingText, ...props }: Props) {
  return (
    <Button {...props} disabled={isLoading || props.disabled}>
      {
        isLoading ?
          <>
            <LoaderCircle className="animate-spin" />
            <span className="break-words max-w-full">{loadingText}</span>
          </> :
          <>{children}</>
      }
    </Button>
  )
}

function LinkButton({
  className,
  href = "#",
  children,
  ...props
}: ButtonProps & {
  href: string;
}) {
  return (
    <Button {...props} variant={'link'} asChild className={cn("!px-0", className)}>
      <Link href={href} className="group" data-slot="button">
        {children}
        <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform ease-in-out duration-300" />
      </Link>
    </Button>
  )
}

export { Button, buttonVariants, LoadingButton, type ButtonProps, LinkButton };
