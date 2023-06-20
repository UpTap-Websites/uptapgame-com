// import dynamic from "next/dynamic";
import Footer from "./Footer";
// const Footer = dynamic(() => import("./Footer"));
import Header from "./Header";
// import SearchPanel from "./SearchPanel";
// const SearchPanel = dynamic(() => import("./SearchPanel"));
import { Nunito } from "next/font/google";

import { useState, useEffect } from "react";
import ScrollTopButton from "./ScrollTopButton";
const nunito = Nunito({ subsets: ["latin"] });

export default function Layout({ children, navItems }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
      <div className={"wrapper " + nunito.className}>
        <Header navItems={navItems} />
        {children}
        <Footer />
        <ScrollTopButton showScrollTop={showScrollTop} scrollToTop={scrollToTop} />
      </div>
    </>
  );
}
