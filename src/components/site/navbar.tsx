import Header from "./header";
import { ENavLinkType } from "@/schemas/globals.schema";
import { ECtaVariant } from "../../../types/blocks.types";
import { HOME_SLUG } from "@/app/slugs";
import { getHeader, getSiteSettings } from "@/lib/data-access.ts/site-settings.data";

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
  const siteData = await getSiteSettings();

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
