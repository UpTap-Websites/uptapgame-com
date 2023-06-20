"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { NProgress } from "nprogress";
import * as gtag from "../lib/gtag";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log(url);
    // You can now use the current URL
    // ...
    const handleRouteStart = (url) => {
      console.log(url);
      NProgress.start();
      // You can now use the new URL
      // ...
    };

    const handleRouteComplete = (url) => {
      gtag.pageview(url);
      NProgress.done();
      // You can now use the new URL
      // ...
    };

    const handleRouteError = (err, url) => {
      NProgress.done();
      // You can now use the old URL
      // ...
    };

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteComplete);
    router.events.on("routeChangeError", handleRouteError);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteComplete);
      router.events.off("routeChangeError", handleRouteError);
    };
  }, [pathname, searchParams, router.events]);

  return null;
}
