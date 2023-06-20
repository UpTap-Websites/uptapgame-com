import "./globals.css";
import "./nprogress.css";
import { Inter } from "next/font/google";

import { Suspense } from "react";
import { NavigationEvents } from "./components/navigation-events";

import Footer from "./components/footer";
import Header from "./components/header";

import { SITE_META } from "./lib/constants";

import Script from "next/script";
import * as gtag from "./lib/gtag";

import { GA_ID } from "./lib/constants";

import { getAllCategories } from "./lib/api";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `${SITE_META.NAME}`,
  description: `${SITE_META.DESCRIPTION}`,
};

export default async function RootLayout({ children }) {
  const navItems = await getAllCategories();
  // console.log(navItems);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="wrapper flex min-h-screen flex-col">
          <Header navItems={navItems} />
          {children}
          <Footer />
        </div>
      </body>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <Script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <NavigationEvents />
      </Suspense>
    </html>
  );
}
