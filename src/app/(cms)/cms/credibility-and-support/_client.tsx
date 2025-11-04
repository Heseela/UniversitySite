"use client";

import { LoadingButton } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from "@/components/ui/form"
import { cn, showServerError } from '@/lib/utils';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { credibilityAndSupportDefaultValue, credibilityAndSupportSchema, TCredibilityAndSupport } from '@/schemas/credibility-and-support.schema';
import FaqsTabContent from '@/components/cms/credibility-and-support/faqs-tab-content';
import PartnersTabContent from '@/components/cms/credibility-and-support/partners-tab-content';
import { TCredibilityAndSupportTableSelect } from '@/db/schema/credibility-and-support';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCustomSearchParams } from '@/hooks/useCustomSearchParams';
import { useRouter } from 'next/navigation';
import { updateCredibilityAndSupport } from '@/lib/actions/credibility-and-support.action';
import TestimonialsTabContent from '@/components/cms/credibility-and-support/testimonials-tab-content';
import CertificationsTabContent from '@/components/cms/credibility-and-support/cretifications-tab-content';
import AlumniTabContent from '@/components/cms/credibility-and-support/alumni-tab-content';

type Props = {
    defaultTab: string;
    credibilityAndSupport: TCredibilityAndSupportTableSelect
}

export const credibilityAndSupportTabs = [
    {
        label: "FAQs",
        value: "faqs",
    },
    {
        label: "Partners",
        value: "partners",
    },
    {
        label: "Testimonials",
        value: "testimonials",
    },
    {
        label: "Certifications",
        value: "certifications",
    },
    {
        label: "Alumni",
        value: "alumni",
    }
]

export default function CredibilityAndSupportForm({ credibilityAndSupport: cas, defaultTab }: Props) {
    const { setSearchParams } = useCustomSearchParams();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<TCredibilityAndSupport>({
        resolver: zodResolver(credibilityAndSupportSchema),
        defaultValues: cas || credibilityAndSupportDefaultValue,
    });

    function onSubmit(data: TCredibilityAndSupport) {
        const hasDuplicateCategories = data.faqCategories.some((category, index) => data.faqCategories.findIndex(cat => cat.name.toLowerCase() === category.name.toLowerCase()) !== index);
        if (hasDuplicateCategories) {
            form.setError("faqCategories", {
                message: "Category names must be unique",
                type: "manual",
            });
            return;
        }
        
        startTransition(async () => {
            try {
                await updateCredibilityAndSupport(cas.id, data);
                toast.success("Successfully updated");
            } catch (e) {
                showServerError(e);
            }
        });
    }

    if (defaultTab && !credibilityAndSupportTabs.map(({ value }) => value).includes(defaultTab)) {
        router.push("/cms/credibility-and-support")
        return;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='@container h-full'>
                <section className="h-full flex flex-col space-y-6">
                    <header className='@6xl:px-24 @3xl:px-16 px-8 space-y-2'>
                        <h3 className="text-3xl font-bold capitalize max-w-[50ch] break-words">Credibility and Support</h3>
                        <p className='font-normal text-muted-foreground text-sm'>
                            Reassure your audience with trust signals, affiliations, and helpful resources.
                        </p>
                    </header>
                    <section className="@6xl:px-24 @3xl:px-16 px-8 sticky top-0 z-[50] backdrop-blur-3xl border-y mb-0">
                        <section className="py-3 flex items-center justify-between flex-wrap gap-6">
                            <section className="text-sm">
                                <p>
                                    <span className="text-muted-foreground">Last Modified:&nbsp;</span>
                                    <time className="font-medium">{cas.updatedAt.toLocaleString()}</time>
                                </p>
                            </section>
                            <section>
                                <LoadingButton
                                    type="submit"
                                    isLoading={isPending}
                                    disabled={isPending}
                                    loadingText='Saving...'
                                    size={"lg"}
                                >
                                    Save Changes
                                </LoadingButton>
                            </section>
                        </section>
                    </section>

                    <section className='border-r pt-4 grow'>
                        <Tabs
                            defaultValue={defaultTab}
                            className='w-full h-full gap-0'
                            onValueChange={val => {
                                setSearchParams("tab", val);
                            }}
                        >
                            <TabsList className="@6xl:px-24 @3xl:px-16 px-8 py-0 space-x-2 w-full bg-transparent border-b rounded-none h-auto justify-start">
                                {
                                    credibilityAndSupportTabs.map(t => (
                                        <TabsTrigger
                                            key={t.value}
                                            value={t.value}
                                            className={cn(
                                                "relative !bg-transparent max-w-fit border-0 rounded-none px-3 py-4",
                                                "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary",
                                                form.formState.errors?.[t.value as keyof TCredibilityAndSupport] && "!text-destructive data-[state=active]:after:bg-destructive"
                                            )}
                                        >
                                            {t.label}
                                        </TabsTrigger>
                                    ))
                                }
                            </TabsList>
                            <section className='@6xl:px-24 @3xl:px-16 px-8 h-full'>
                                <TabsContent value={credibilityAndSupportTabs[0].value} className='h-full'>
                                    <FaqsTabContent />
                                </TabsContent>
                                <TabsContent value={credibilityAndSupportTabs[1].value}>
                                    <PartnersTabContent />
                                </TabsContent>
                                <TabsContent value={credibilityAndSupportTabs[2].value}>
                                    <TestimonialsTabContent />
                                </TabsContent>
                                <TabsContent value={credibilityAndSupportTabs[3].value}>
                                    <CertificationsTabContent />
                                </TabsContent>
                                <TabsContent value={credibilityAndSupportTabs[4].value}>
                                    <AlumniTabContent />
                                </TabsContent>
                            </section>
                        </Tabs>
                    </section>
                </section>
            </form>
        </Form>
    )
}