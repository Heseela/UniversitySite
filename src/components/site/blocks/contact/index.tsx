import { TSiteSettingSelect } from "@/db/schema/site-setting";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { Mail, MapPin, Phone } from "lucide-react";

export const RenderContactTextBlock = async () => {
  const siteResponse = await serverFetch("/site-settings");
  const siteData = siteResponse.ok
    ? ((await siteResponse.json()) as TSiteSettingSelect)
    : null;

  if (!siteData) return null;

  return (
    <div id="contact">
      <span className="text-primary font-semibold">Get In Touch</span>
      <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
        Let&apos;s Connect and Collaborate
      </h2>
      <p className="text-slate-600 mb-8">
        Whether you&apos;re an educator looking for resources, a school interested in
        our programs, or just want to learn more about what we do, we&apos;d love to
        hear from you.
      </p>

      <div className="space-y-4">
        {
          !!siteData.address && (
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-md mr-4">
                <MapPin className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Our Location</h4>
                <p className="text-slate-600">{siteData?.address}</p>
              </div>
            </div>
          )
        }

        {
          !!siteData.emails.length && (
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-md mr-4">
                <Mail className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Email Us</h4>
                <ul>
                  {siteData.emails.map((e, idx) => (
                    <li key={idx}>
                      <a href={`mailto:${e}`} className="text-slate-600 hover:underline">
                        {e}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }
        {
          !!siteData.phones.length && (
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-md mr-4">
                <Phone className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Call Us</h4>
                <ul>
                  {siteData.phones.map((p, idx) => (
                    <li key={idx}>
                      <a href={`tel:${p.replace(/\s/g, "")}`} className="text-slate-600 hover:underline">
                        {p}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};
