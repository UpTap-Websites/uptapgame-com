import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="generator" content={new Date().toISOString()} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
