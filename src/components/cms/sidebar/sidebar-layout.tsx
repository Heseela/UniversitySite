import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { AppSidebar } from "./sidebar";
import { Suspense } from "react";
import { Skeleton } from "../../ui/skeleton";
import AppBreadCrumb from "./app-bread-crumb";
import { ThemeToggleBtn } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Globe } from "lucide-react";
import { getSiteSettings } from "@/lib/data-access.ts/site-settings.data";

type AppRootLayoutProps = {
    children: React.ReactNode,
}

export default async function SidebarLayout({ children }: AppRootLayoutProps) {
    const siteData = await getSiteSettings();

    return (
        <SidebarProvider>
            <AppSidebar siteData={siteData} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <AppBreadCrumb />

                    <div className="ml-auto flex items-center gap-4">
                        <Button
                            variant={'ghost'}
                            size={'icon'}
                            asChild
                            title="Visit Site"
                        >
                            <Link href={"/"} target="_blank">
                                <Globe />
                            </Link>
                        </Button>
                        {
                            process.env.NODE_ENV === 'development' && <ThemeToggleBtn />
                        }
                    </div>
                </header>
                <main className="h-full">
                    <Suspense fallback={<Skeleton className="h-full" />}>
                        {children}
                    </Suspense>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}