import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { GA_ID, ADSENSE_ID } from "../lib/constants";
import * as gtag from "../lib/gtag";
import NProgress from "nprogress";
import "../styles/globals.css";
// import "../public/nprogress.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = (url) => {
      gtag.pageview(url);
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router.events]);

  return (
    <>
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
      {/* <Script
        id="adsense-push"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (adsbygoogle = window.adsbygoogle || []).push({});
        `,
        }}
      /> */}

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
