import { ImageResponse } from "next/og";
import { siteSetting } from "@/db/schema/site-setting";
import { db } from "@/db";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
    try {
        const [setting] = await db.select({
            logoLight: siteSetting.logoLight,
        }).from(siteSetting).limit(1);

        if (!setting) {
            return new Response(null, { status: 404 });
        }

        const logoUrl = setting.logoLight?.secure_url;

        if (!logoUrl) {
            return new Response(null, { status: 404 });
        }

        return new ImageResponse(
            (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "transparent",
                    }}
                >
                    <img
                        src={logoUrl}
                        alt="favicon"
                        width={size.width}
                        height={size.height}
                        style={{ objectFit: "contain" }}
                    />
                </div>
            ),
            size
        );
    } catch (error) {
        console.error("Icon generation failed:", error);
        return new Response(null, { status: 500 });
    }
}
