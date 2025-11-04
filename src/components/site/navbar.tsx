import { db } from "@/db";
import { header } from "@/db/schema/globals";
import { cache } from "react";
import Header from "./header";
import { ENavLinkType } from "@/schemas/globals.schema";
import { ECtaVariant } from "../../../types/blocks.types";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TSiteSettingSchema } from "@/schemas/site-setting.schema";
import { HOME_SLUG } from "@/app/slugs";

const getHeader = cache(async () => {
  const [existing] = await db
    .select({
      navLinks: header.navLinks,
    })
    .from(header)
    .limit(1);

  return existing;
});

export interface RefinedSiteNavLinks {
  label: string;
  href: string;
  type: ENavLinkType;
  variant: ECtaVariant;
  subLinks: {
    type: ENavLinkType;
    text: string;
    variant: ECtaVariant;
    newTab: boolean;
    url: string;
  }[];
  newTab: boolean;
}

export default async function Navbar({
  hasHero = false,
}: {
  hasHero?: boolean;
}) {
  const header = await getHeader();
  const siteResponse = await serverFetch(`/site-settings`);
  const siteData = siteResponse.ok
    ? ((await siteResponse.json()) as TSiteSettingSchema)
    : null;

  if (!header) return null;

  const navLinks: RefinedSiteNavLinks[] = header.navLinks.map((n) => {
    const href =
      n.type === ENavLinkType.External
        ? n.url
        : n.url === HOME_SLUG
          ? "/"
          : n.url.startsWith("/")
            ? n.url
            : `/${n.url}`;

    return {
      label: n.text,
      href,
      variant: n.variant,
      type: n.type,
      subLinks: n.subLinks,
      newTab: n.newTab,
    };
  });

  return <Header hasHero={hasHero} navLinks={navLinks} siteData={siteData} />;
}
