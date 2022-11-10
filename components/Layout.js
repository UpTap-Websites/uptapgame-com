import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchPanel from "./SearchPanel";

export default function Layout({ list, isOpen, children }) {
  // console.log(list);
  return (
    <div className="wrapper">
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height"
        />
        <link
          rel="shortcut icon"
          href="/brand/uptapgame-icon.svg"
          sizes="128x128"
        />
      </Head>
      <SearchPanel />
      <Navbar list={list} isOpen={isOpen} />
      {children}
      <Footer />
    </div>
  );
}
