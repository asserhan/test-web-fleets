import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";
import {
  generateStaticParams,
  IntlayerClientProvider,
  type NextLayoutIntlayer,
} from "next-intlayer";

import { DynamicBackground } from "@/components/background";
import { QueryProvider } from "@/components/providers/QueryProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Fleets",
  description: "Fleet management application",
};

export { generateStaticParams };

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      dir={getHTMLTextDir(locale)}
      className={`${inter.variable} h-full antialiased`}
      data-glassmorphism="dark"
    >
      <body className="flex min-h-full flex-col">
        <IntlayerClientProvider locale={locale}>
          <QueryProvider>
            <DynamicBackground />
            <div id="app-root" className="flex min-h-full flex-1 flex-col">
              {children}
            </div>
          </QueryProvider>
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
