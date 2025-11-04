import SiteSettingForm from "@/components/cms/site-settings/site-setting.form";
import { db } from "@/db";
import { siteSetting } from "@/db/schema/site-setting";

export default async function SiteSettingsPage() {
  const [existing] = await db.select().from(siteSetting).limit(1);

  if (!existing) return (
    <div>
      Site settings not found. Please seed the database first.
    </div>
  );

  return (
    <SiteSettingForm defaultValues={existing} />
  )
}