import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import Footer from "@/components/site/footer";
import { Toaster } from "sonner";
import Navbar from "@/components/site/navbar";
import { QCProvider } from "@/context/query-client-provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "University",
    template: "%s | University",
  },
};

type Props = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Props) {
  return (
    <html lang="en">
      <QCProvider>
        <body className={`${manrope.variable} antialiased`}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
          <Toaster richColors />
        </body>
      </QCProvider>
    </html>
  );
}