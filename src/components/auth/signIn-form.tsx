"use client";

import { LoadingButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { signInAction } from "@/app/(cms)/auth/signin/action";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { TMediaSchema } from "@/schemas/media.schema";
import CloudinaryImage from "../ui/cloudinary-image";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
});

export default function SignInForm({ logo }: { logo?: TMediaSchema | null }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            try {
                await signInAction(values.email);
                router.push("/auth/signin/verify-request?email=" + values.email);
            } catch (e) {
                if (e instanceof Error) {
                    form.setError("email", { type: "manual", message: e.message });
                } else {
                    form.setError("email", {
                        type: "manual",
                        message: "An unexpected error occurred",
                    });
                }
            }
        })
    }

    return (
        <>
            <Card className="min-w-[400px] mt-auto shadow-none border-none bg-transparent">
                <CardHeader>
                    {logo && <Link href={"/"}>
                        <CloudinaryImage
                            src={logo.secure_url}
                            alt="Feature Creatify Logo"
                            width={64}
                            height={64}
                            className="h-16 w-auto block mx-auto"
                        />
                    </Link>}
                    <CardTitle>
                        <h1 className="text-2xl font-bold text-center">Welcome</h1>
                    </CardTitle>
                    <CardDescription className="text-center">
                        Please sign in to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pb-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                required
                                                placeholder="name@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            A signin link will be sent to this email address.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <LoadingButton
                                isLoading={isPending}
                                disabled={isPending}
                                type="submit"
                                loadingText="Sending..."
                                className="w-full"
                            >
                                Sign In
                            </LoadingButton>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <section className="mt-auto px-3 py-10">
                <p className="text-sm text-muted-foreground text-center">
                    By continuing, you agree to our{" "}
                    <Link href="/privacy-policy" className="underline">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="underline">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </section>
        </>
    );
}
