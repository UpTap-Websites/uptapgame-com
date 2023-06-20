import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="generator" content={new Date().toISOString()} />
        <link rel="shortcut icon" href="/images/favicon.svg" sizes="128x128" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
