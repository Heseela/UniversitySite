import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import NextTopLoader from 'nextjs-toploader';
import { SITE_TITLE } from "@/CONSTANTS";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `CMS - ${SITE_TITLE}`,
    template: `%s | ${SITE_TITLE}`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <QueryClientProvider client={queryClient}>
              <NextTopLoader />
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </SessionProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
