import Head from "next/head";

export default function Meta({ title, ...description }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_META.URL} />
        <meta property="og:image" content={`${SITE_META.URL}/og-image.png`} />
        <meta property="og:site_name" content={SITE_META.NAME} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={SITE_META.URL} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE_META.URL}/og-image.png`} />
        <link rel="canonical" href={SITE_META.URL} />
      </Head>
    </>
  );
}
