import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "@/components/site/footer";
import { Toaster } from "sonner";
import Navbar from "@/components/site/navbar";
import { QCProvider } from "@/context/query-client-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Feature Creatify",
    template: "%s | Feature Creatify",
  },
};

type Props = {
  children: React.ReactNode;
};


export default function SiteLayout({ children }: Props) {
  return (
    <html lang="en">
      <QCProvider>
        <body className={`${inter.variable} antialiased`}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster richColors />
        </body>
      </QCProvider>
    </html>
  );
}
