import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TFooterDto } from "@/schemas/globals.schema";
import { TSiteSettingSelect } from "@/db/schema/site-setting";
import { cn, getSocialIcon } from "@/lib/utils";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerResponse, siteResponse] = await Promise.all([
    serverFetch(`/footer`),
    serverFetch("/site-settings"),
  ]);

  const footerData = footerResponse.ok
    ? ((await footerResponse.json()) as TFooterDto)
    : null;
  const siteData = siteResponse.ok
    ? ((await siteResponse.json()) as TSiteSettingSelect)
    : null;

  return (
    <footer className="bg-[#fcfcfc] pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                width={64}
                height={64}
                src={siteData?.logoLight?.secure_url || `/logo.png`}
                alt="Feature Creatify Logo"
                className="h-16 w-auto"
              />
            </Link>
            <p className="mb-4 text-muted-foreground">
              {footerData?.footerText || ""}
            </p>
            <div className="flex space-x-4">
              {siteData?.socialLinks?.map(
                (social: { link: string }, index: number) => {
                  const Icon = getSocialIcon(social.link);

                  return (
                    <a
                      key={index}
                      href={social.link}
                      aria-label={`Social Link ${index + 1}`}
                      className="hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="size-6" />
                    </a>
                  )
                }
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {
                footerData?.navLinks?.map((link) => (
                  <Link key={link.text} href={link.url} className="block">
                    {link.text}
                  </Link>
                ))
              }
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              {
                siteData?.address && (
                  <li className="flex gap-x-2">
                    <MapPin size={20} className="flex-shrink-0" />
                    <span>{siteData.address}</span>
                  </li>
                )
              }
              {
                (siteData?.phones && siteData.phones.length > 0) && (
                  <li className="flex gap-x-2">
                    <Phone size={20} className="flex-shrink-0" />
                    <span className="flex flex-wrap gap-x-2">
                      {siteData.phones.map((phone: string, index: number) => (
                        <a
                          key={index}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="hover:underline decoration-accent"
                        >
                          {phone}
                          {index < siteData.phones.length - 1 && ","}
                        </a>
                      ))}
                    </span>
                  </li>
                )
              }
              {
                (siteData?.emails && siteData.emails.length > 0) && (
                  <li className="flex gap-x-2">
                    <Mail size={20} className="flex-shrink-0" />
                    <span className="flex flex-wrap gap-x-1">
                      {siteData.emails.map((email: string, index: number) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                          className={cn(
                            "hover:underline decoration-accent",
                            siteData.emails.length > 1 ? "text-sm" : ""
                          )}
                        >
                          {email}
                          {index < siteData.emails.length - 1 && ","}
                        </a>
                      ))}
                    </span>
                  </li>
                )
              }
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-bold mb-4">Newsletter</h4>
            <p className="mb-4 text-muted-foreground">
              Subscribe to our newsletter to get the latest updates on our
              events and blogs.
            </p>
            <form className="flex flex-col space-y-3">
              <Input type="email" placeholder="Your email" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} Feature Creatify. All rights reserved.</p>
        </div>
      </div>
    </footer >
  );
}
