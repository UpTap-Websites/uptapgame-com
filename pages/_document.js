import Document, { Html, Head, Main, NextScript } from "next/document";

import { ADSENSE_ID } from "../lib/constants";

class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return { ...initialProps };
  // }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${ADSENSE_ID}`}
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body className="bg-slate-600">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
