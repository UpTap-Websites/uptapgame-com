import Layout from "@/components/Layout";
import GameList from "@/components/GameList";
import { useRouter } from "next/router";
import { getGamesByCategory, getCategories } from "@/lib/api";
import Head from "next/head";
import { SITE_META, ADSENSE_ID } from "@/lib/constants";
import Banner from "@/components/Banner";
import Script from "next/script";

export default function GamesListByCategory({ games, categories }) {
  // console.log(games);
  const router = useRouter();
  const { slug } = router.query;
  // console.log(router.query);
  // console.log({ slug });
  // const categoryName =
  //   slug.toLowerCase() == ".io"
  //     ? ".IO"
  //     : slug
  //         .toString()
  //         .replace(/^\S/, (s) => s.toUpperCase())
  //         .replace(/-/g, " ");
  const categoryName = games[0].category;
  // console.log(categoryName);
  return (
    <>
      <Head>
        <title>{`${categoryName} Games | ${SITE_META.NAME}`}</title>
      </Head>
      <Script
        id="ads-init"
        strategy="beforeInteractive"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
        crossOrigin="anonymous"
      />
      <Layout list={categories}>
        <main className="main category">
          <div>
            <Banner className={`banner`} auto key={Math.random()} />
          </div>
          <h1>
            {categoryName} {games.length > 1 ? `Games` : `Game`} ({games.length})
          </h1>

          <GameList cols="4" games={games} />
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const _games = await getGamesByCategory(
    `${context.params.slug.replace(/-/, " ").replace(/\./, "")}`
  );
  const categories = await getCategories();
  let games = [];
  _games.map((item) => {
    games.push({
      id: item.id,
      name: item.name,
      category: item.category,
      time: item.time,
      //icon: item.icon,
    });
  });
  return {
    props: {
      games,
      categories,
    },
    // revalidate: 60,
  };
}

export const getStaticPaths = async () => {
  const categories = await getCategories();
  const paths = categories.map((category) => ({
    params: {
      slug: category.replace(/ /, "-").replace(/\./, ""),
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
