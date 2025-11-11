"use client";

import { TPage } from '../../../../../types/page.types'
import { Button, LoadingButton } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { PageDtoSchema, TPageDto } from "@/schemas/page.schema"
import { useForm, useFormContext, useWatch } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn, generateSlug, showServerError } from '@/lib/utils';
import HeroTabContent from '../tabs/hero-tab-content';
import ContentTabContent from '../tabs/content-tab-content';
import SeoTabContent from '../tabs/seo-tab-content';
import { Dispatch, SetStateAction, useEffect, useMemo, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { updatePage } from '@/lib/actions/pages.action';
import { useCustomSearchParams } from '@/hooks/useCustomSearchParams';

type Props = {
    page: TPage,
    defaultTab?: string;
    defaultMode?: string;
    children?: React.ReactNode
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

type TMode = "edit" | "preview" | "api";

const modes: { label: string, value: TMode }[] = [
    {
        label: "Edit",
        value: "edit",
    },
    {
        label: "Preview",
        value: "preview",
    },
    {
        label: "API",
        value: "api",
    }
]

const TOOL_BAR_HEIGHT = "66px";

export default function PageForm({ page, defaultTab, children, defaultMode }: Props) {
    const [isPending, startTransition] = useTransition();
    const [mode, setMode] = useState<TMode>(defaultMode as TMode || modes[0].value);

    const form = useForm<TPageDto>({
        resolver: zodResolver(PageDtoSchema),
        defaultValues: page,
    });

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

    useEffect(() => {
        const ctrl = new AbortController();

        window.addEventListener("keydown", (event: KeyboardEvent) => {
            const isMac = navigator.userAgent.includes("Mac");
            if ((isMac ? event.metaKey : event.ctrlKey) && event.key === "s") {
                event.preventDefault();
                onSubmit(form.getValues());
            }
        }, ctrl);

        return () => {
            ctrl.abort();
        };
    }, []);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='@container/main h-full'>
                <section className="h-full flex flex-col space-y-6">
                    <section className='sm:flex justify-between items-center px-8'>
                        <h2 className="sm:mb-0 mb-2 text-3xl font-medium capitalize">{name || "Untitled"}</h2>
                        <RenderModeButtons mode={mode} setMode={setMode} />
                    </section>

                    <section className="sticky top-0 z-50 backdrop-blur-3xl border-y mb-0">
                        <section className="px-8 py-3 flex items-center justify-between flex-wrap gap-6">
                            <section className="text-sm @sm:flex gap-6">
                                <p>
                                    <span className="text-muted-foreground">Last Modified:&nbsp;</span>
                                    <time className="font-medium">{page.updatedAt.toLocaleString()}</time>
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Created:&nbsp;</span>
                                    <time className="font-medium">{page.createdAt.toLocaleString()}</time>
                                </p>
                            </section>

                            <LoadingButton
                                type="submit"
                                isLoading={isPending}
                                disabled={isPending}
                                loadingText='Saving...'
                                size={"lg"}
                                className='sm:w-auto w-full'
                            >
                                Save Changes
                            </LoadingButton>
                        </section>
                    </section>

                    <section className={cn('@6xl:grow gap-12 space-y-12 @6xl:space-y-0 @6xl:gap-0 @6xl:grid', mode !== "edit" && "@6xl:grid-cols-3")}>
                        <section className='@container'>
                            <section className='@6xl/main:h-full @6xl:grid grid-cols-3 flex flex-col'>
                                <section className={cn(
                                    'col-span-2 @6xl/main:border-r py-8 border-b',
                                    mode === "edit" && "@6xl/main:pb-20"
                                )}>
                                    <div className='ml-8 pr-8'>
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

                                    <RenderTabs selectedTab={selectedTab} slug={slug} />
                                </section>

                                <section className={cn(
                                    "@6xl/main:pb-20",
                                    mode === "edit"
                                        ? "mr-8 pl-8 py-8 @6xl/main:border-t-0"
                                        : "ml-8 pr-8 @6xl/main:border-r pt-8 grow"
                                )}>
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
                        {
                            mode !== "edit" && (
                                <section className='col-span-2 @6xl:max-h-[calc(100vh-80px)] overflow-auto sticky z-40' style={{ top: TOOL_BAR_HEIGHT }}>
                                    {children}
                                </section>
                            )
                        }
                    </section>
                </section>
            </form>
        </Form>
    )
}

function RenderModeButtons({ mode, setMode }: { mode: TMode, setMode: Dispatch<SetStateAction<TMode>> }) {
    const { setSearchParams } = useCustomSearchParams();

    useEffect(() => {
        setSearchParams("mode", mode)
    }, [mode])

    return (
        <div className='space-x-2'>
            {
                modes.map((modeObj) => (
                    <Button
                        key={modeObj.value}
                        type='button'
                        size={"sm"}
                        variant={modeObj.value === mode ? "default" : "outline"}
                        className={cn(modeObj.value === mode && "border")}
                        onClick={() => setMode(modeObj.value)}
                    >
                        {modeObj.label}
                    </Button>
                ))
            }
        </div>
    )
}

function RenderTabs({ selectedTab, slug }: { selectedTab: string, slug: string }) {
    const { setSearchParams } = useCustomSearchParams();
    const form = useFormContext<TPageDto>();

    return (
        <Tabs
            defaultValue={selectedTab}
            className='mt-8 w-full'
            onValueChange={tab => setSearchParams("tab", tab)}
        >
            <TabsList className="pl-8 py-0 space-x-2 w-full bg-transparent border-b rounded-none h-auto justify-start">
                {
                    tabs.map(t => (
                        <TabsTrigger
                            key={t.value}
                            value={t.value}
                            className={cn(
                                "relative bg-transparent! max-w-fit border-0 rounded-none px-3 py-4",
                                "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary",
                                form.formState.errors?.[t.value as keyof TPageDto] && "text-destructive! data-[state=active]:after:bg-destructive"
                            )}
                        >
                            {t.label}
                        </TabsTrigger>
                    ))
                }
            </TabsList>
            <section className='pl-8 pt-4 pr-8'>
                <TabsContent value={tabs[0].value}>
                    <HeroTabContent />
                </TabsContent>
                <TabsContent value={tabs[1].value}>
                    <ContentTabContent slug={slug} />
                </TabsContent>
                <TabsContent value={tabs[2].value}>
                    <SeoTabContent />
                </TabsContent>
            </section>
        </Tabs>
    )
}