import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { TSiteSettingSchema } from "@/schemas/site-setting.schema";
import Image from "next/image";
import Link from "next/link";

export function AppSidebarHeader({
  siteData,
}: {
  siteData: TSiteSettingSchema | null;
}) {
  const { open } = useSidebar();

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <section className="px-2">
            <Link href="/" className="flex items-center gap-4">
              {siteData?.logoLight && (
                <Image
                  width={64}
                  height={64}
                  src={siteData?.logoLight?.secure_url}
                  alt="Feature Creatify Logo"
                  className="h-auto max-w-18"
                />
              )}

              {open && (
                <section className="overflow-hidden">
                  <h1 className="font-semibold text-xl leading-5 whitespace-nowrap">
                    Future <span className="text-primary">Creatify</span>
                  </h1>
                  <p className="text-xs text-muted-foreground font-medium whitespace-nowrap">
                    Education Hub
                  </p>
                </section>
              )}
            </Link>
          </section>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
