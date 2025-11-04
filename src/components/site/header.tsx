"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { RefinedSiteNavLinks } from "./navbar";
import { TSiteSettingSchema } from "@/schemas/site-setting.schema";
import { ECtaVariant } from "../../../types/blocks.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header({
  navLinks,
  siteData,
  hasHero = false,
}: {
  navLinks: RefinedSiteNavLinks[];
  siteData: TSiteSettingSchema | null;
  hasHero?: boolean;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 5);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => window.scrollTo(0, 0), [pathname]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const toggleMobileDropdown = (label: string) =>
    setOpenDropdown(openDropdown === label ? null : label);

  return (
    <header
      className={cn(
        "sticky top-0 left-0 py-2 w-full z-50 bg-white/80 backdrop-blur-2xl border-b"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            width={64}
            height={64}
            src={siteData?.logoLight?.secure_url || `/logo.png`}
            alt="Feature Creatify Logo"
            className="h-16 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) =>
            link.subLinks.length === 0 ? (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: link.variant }),
                  "px-0 text-base font-normal capitalize",
                  link.variant === ECtaVariant.Link &&
                    "text-black hover:text-primary",
                  link.variant === ECtaVariant.Link &&
                    pathname === link.href &&
                    "text-primary underline",
                  link.variant === ECtaVariant.Default &&
                    "px-4 py-5 font-medium",
                  hasHero && !scrolled && pathname !== link.href && "!text-white"
                )}
                target={link.newTab ? "_blank" : "_self"}
              >
                {link.label}
              </Link>
            ) : (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-base capitalize">
                  {link.label}
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[12rem] w-auto">
                  {link.subLinks.map((l) => (
                    <DropdownMenuItem key={l.text} asChild>
                      <Link
                        href={l.url}
                        target={l.newTab ? "_blank" : "_self"}
                        className="w-full text-base font-normal capitalize hover:text-primary"
                      >
                        {l.text}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-800 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto py-4 flex flex-col space-y-2">
            {navLinks.map((link) =>
              link.subLinks.length === 0 ? (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2 py-2 text-lg font-medium text-gray-800 hover:text-primary"
                >
                  {link.label}
                </Link>
              ) : (
                <div key={link.label}>
                  <button
                    className="w-full text-left px-2 py-2 text-lg font-medium flex justify-between items-center"
                    onClick={() => toggleMobileDropdown(link.label)}
                  >
                    {link.label}
                    <ChevronDown
                      size={18}
                      className={cn(
                        "transition-transform",
                        openDropdown === link.label && "rotate-180"
                      )}
                    />
                  </button>
                  {openDropdown === link.label && (
                    <div className="pl-4 flex flex-col space-y-1">
                      {link.subLinks.map((l) => (
                        <Link
                          key={l.text}
                          href={l.url}
                          target={l.newTab ? "_blank" : "_self"}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-base text-gray-600 hover:text-primary capitalize"
                        >
                          {l.text}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
