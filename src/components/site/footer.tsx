import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn, getSocialIcon } from "@/lib/utils";
import { getFooter, getSiteSettings } from "@/lib/data-access.ts/site-settings.data";
import CloudinaryImage from "../ui/cloudinary-image";

export default async function Footer() {
  const [footer, siteSetting] = await Promise.all([
    getFooter(),
    getSiteSettings(),
  ]);
  // Note: new Date() must be called AFTER accessing uncached data (fetch, cookies, headers, etc.)
  // This is a Next.js requirement for Server Components to ensure proper rendering
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex gap-4">
              {
                siteSetting.logoDark_primary && (
                  <Link href="/" className="flex items-center" aria-label="Home">
                    <CloudinaryImage
                      width={64}
                      height={64}
                      src={siteSetting.logoDark_primary.secure_url}
                      alt="Primary Logo"
                      sizes="64px"
                      className="h-16 w-auto"
                    />
                  </Link>
                )
              }
              {
                siteSetting.logoDark_secondary && (
                  <Link href="/" className="flex items-center" aria-label="Home">
                    <CloudinaryImage
                      width={64}
                      height={64}
                      src={siteSetting.logoDark_secondary.secure_url}
                      alt="Secondary Logo"
                      sizes="64px"
                      className="h-16 w-auto"
                    />
                  </Link>
                )
              }
            </div>
            <p className="mb-4">
              {footer?.footerText || ""}
            </p>
            <div className="flex space-x-4">
              {siteSetting?.socialLinks?.map(
                (social: { link: string }, index: number) => {
                  const Icon = getSocialIcon(social.link);

                  return (
                    <a
                      key={index}
                      href={social.link}
                      aria-label={`Visit our social media page`}
                      className="hover:text-secondary transition-transform duration-200 hover:scale-110"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="size-6" aria-hidden="true" />
                    </a>
                  )
                }
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {
                footer?.navLinks?.map((link) => (
                  <Link key={link.text} href={link.url} className="block">
                    {link.text}
                  </Link>
                ))
              }
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-xl font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              {
                siteSetting?.address && (
                  <li className="flex gap-x-2">
                    <MapPin size={20} className="flex-shrink-0" />
                    <span>{siteSetting.address}</span>
                  </li>
                )
              }
              {
                (siteSetting?.phones && siteSetting.phones.length > 0) && (
                  <li className="flex gap-x-2">
                    <Phone size={20} className="flex-shrink-0" />
                    <span className="flex flex-wrap gap-x-2">
                      {siteSetting.phones.map((phone: string, index: number) => (
                        <a
                          key={index}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="hover:underline decoration-accent"
                        >
                          {phone}
                          {index < siteSetting.phones.length - 1 && ","}
                        </a>
                      ))}
                    </span>
                  </li>
                )
              }
              {
                (siteSetting?.emails && siteSetting.emails.length > 0) && (
                  <li className="flex gap-x-2">
                    <Mail size={20} className="flex-shrink-0" />
                    <span className="flex flex-wrap gap-x-1">
                      {siteSetting.emails.map((email: string, index: number) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                          className={cn(
                            "hover:underline decoration-accent",
                            siteSetting.emails.length > 1 ? "text-sm" : ""
                          )}
                        >
                          {email}
                          {index < siteSetting.emails.length - 1 && ","}
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
            <h4 className="text-white text-xl font-bold mb-4">Newsletter</h4>
            <p className="mb-4">
              Subscribe to our newsletter to get the latest updates on our
              events and blogs.
            </p>
            <form className="flex flex-col space-y-3">
              <Input type="email" placeholder="Your email" />
              <Button type="submit" variant="secondary">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center">
          <p>&copy; {currentYear} Feature Creatify. All rights reserved.</p>
        </div>
      </div>
    </footer >
  );
}
