"use client";

import { TPage } from '../../../../../types/page.types'
import { LoadingButton } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { PageDtoSchema, TPageDto } from "@/schemas/page.schema"
import { useForm, useWatch } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn, generateSlug, showServerError } from '@/lib/utils';
import HeroTabContent from '../tabs/hero-tab-content';
import ContentTabContent from '../tabs/content-tab-content';
import SeoTabContent from '../tabs/seo-tab-content';
import { useMemo, useTransition } from 'react';
import { toast } from 'sonner';
import { updatePage } from '@/lib/actions/pages.action';
import { useCustomSearchParams } from '@/hooks/useCustomSearchParams';

type Props = {
    page: TPage,
    defaultTab?: string;
}

const tabs = [
    {
        label: "Hero",
        value: "heroSections",
    },
    {
        label: "Content",
        value: "sections",
    },
    {
        label: "SEO",
        value: "metadata",
    }
]

export default function PageForm({ page, defaultTab }: Props) {
    const [isPending, startTransition] = useTransition();
    const { setSearchParams } = useCustomSearchParams();

    const form = useForm<TPageDto>({
        resolver: zodResolver(PageDtoSchema),
        defaultValues: page,
    });

    console.log(form.formState.errors)
    function onSubmit(data: TPageDto) {
        startTransition(async () => {
            try {
                await updatePage(page.id, data);

                toast.success("Page updated");
            } catch (e) {
                showServerError(e);
            }
        });
    }

    const name = useWatch({
        control: form.control,
        name: "name",
    });

    const slug = useMemo(() => {
        if (!name || (name?.toLowerCase() === "untitled" && page.name.toLowerCase() === "untitled")) return page.slug;

        const nonEmptyName = name || "Untitled"
        return generateSlug(nonEmptyName, nonEmptyName === "Untitled")
    }, [name, page]);

    const selectedTab = useMemo(() => {
        return tabs.find(tab => tab.value === defaultTab)?.value || tabs[0].value;
    }, [defaultTab]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='@container h-full'>
                <section className="h-full flex flex-col space-y-6">
                    <h2 className="@6xl:px-24 @3xl:px-16 px-8 text-3xl font-medium capitalize">{name || "Untitled"}</h2>
                    <section className="sticky top-0 z-[50] backdrop-blur-3xl border-y mb-0">
                        <section className="@6xl:px-24 @3xl:px-16 px-8 py-3 flex items-center justify-between flex-wrap gap-6">
                            <section className="text-sm flex gap-6">
                                <p>
                                    <span className="text-muted-foreground">Last Modified:&nbsp;</span>
                                    <time className="font-medium">{page.updatedAt.toLocaleString()}</time>
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Created:&nbsp;</span>
                                    <time className="font-medium">{page.createdAt.toLocaleString()}</time>
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

                    <section className='grow @6xl:grid grid-cols-3'>
                        <section className='col-span-2 border-r py-8'>
                            <div className='@6xl:ml-24 @3xl:ml-16 ml-8 @3xl:pr-16 pr-8'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name <span className='text-destructive'>*</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Eg. About us"
                                                    className='py-5'
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Tabs
                                defaultValue={selectedTab}
                                className='mt-8 w-full'
                                onValueChange={tab => setSearchParams("tab", tab)}
                            >
                                <TabsList className="@6xl:pl-24 @3xl:pl-16 pl-8 py-0 space-x-2 w-full bg-transparent border-b rounded-none h-auto justify-start">
                                    {
                                        tabs.map(t => (
                                            <TabsTrigger
                                                key={t.value}
                                                value={t.value}
                                                className={cn(
                                                    "relative !bg-transparent max-w-fit border-0 rounded-none px-3 py-4",
                                                    "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary",
                                                    form.formState.errors?.[t.value as keyof TPageDto] && "!text-destructive data-[state=active]:after:bg-destructive"
                                                )}
                                            >
                                                {t.label}
                                            </TabsTrigger>
                                        ))
                                    }
                                </TabsList>
                                <section className='@6xl:pl-24 @3xl:pl-16 pl-8 pt-4 @3xl:pr-16 pr-8 @6xl:pb-20'>
                                    <TabsContent value={tabs[0].value}>
                                        <HeroTabContent />
                                    </TabsContent>
                                    <TabsContent value={tabs[1].value}>
                                        <ContentTabContent />
                                    </TabsContent>
                                    <TabsContent value={tabs[2].value}>
                                        <SeoTabContent />
                                    </TabsContent>
                                </section>
                            </Tabs>
                        </section>

                        <section className='@6xl:mr-24 @3xl:mr-16 mr-8 @3xl:pl-16 pl-8 py-8'>
                            <div className='space-y-2'>
                                <Label>Slug</Label>
                                <Input
                                    className='py-5'
                                    value={slug}
                                    disabled
                                    readOnly
                                />
                            </div>
                        </section>
                    </section>
                </section>
            </form>
        </Form>
    )
}