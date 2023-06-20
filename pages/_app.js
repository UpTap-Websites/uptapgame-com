import Layout from "@/components/Layout";

import { GA_ID } from "@/lib/constants";
import * as gtag from "@/lib/gtag";
import "@/styles/globals.css";
import "@/styles/nprogress.css";

import { useRouter } from "next/router";
import Script from "next/script";
import NProgress from "nprogress";
import { useEffect } from "react";

export default function App({ Component, pageProps, navItems }) {
  const Router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = (url) => {
      console.log(`${url}`);
      NProgress.done();
    };
    const handleDone = (url) => {
      gtag.pageview(url);
      NProgress.done();
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleDone);
    Router.events.on("routeChangeError", handleStop);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleDone);
      Router.events.off("routeChangeError", handleStop);
    };
  }, [Router.events]);
  return (
    <Layout>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
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

      <Component {...pageProps} />
    </Layout>
  );
}
