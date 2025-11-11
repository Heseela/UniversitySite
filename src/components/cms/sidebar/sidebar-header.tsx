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
                  className="max-h-28 max-auto"
                />
              )}

              {open && (
                <section className="overflow-hidden">
                  <h1 className="font-semibold text-2xl leading-5 whitespace-nowrap">
                    <span className="text-primary">UNIVERSITY</span>
                  </h1>
              
                </section>
              )}
            </Link>
          </section>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
