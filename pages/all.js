import Head from "next/head";
import { gameIcon, categoryIcon } from "../components/Icons";
import Layout from "../components/Layout";
import { SITE_META, ADSENSE_ID } from "../lib/constants";
import { getGames, getCategories } from "../lib/api";
import CategoryList from "../components/CategoryList";
import ScrollGameList from "../components/ScrollGameList";
import Banner from "../components/Banner";
import Script from "next/script";

export default function AllGames({
  games,
  categories,
  // _games
}) {
  // console.log(`games`, _games);
  // console.log(categories);
  // const gameList = games.map((game) => <li key={game.id}>{game.name}</li>);
  return (
    <>
      <Head>
        <title>{`All Games | ${SITE_META.NAME}`}</title>
      </Head>
      <Script
        id="ads-init"
        strategy="beforeInteractive"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
        crossOrigin="anonymous"
      />
      <Layout list={categories}>
        <div>
          <Banner className={`banner`} auto key={Math.random()} />
        </div>
        <main className="main all-games">
          <ScrollGameList
            icon={gameIcon()}
            games={games}
            title="All Games"
            className="third:col-span-2 third:row-span-2 md:third:col-auto md:third:row-auto"
            init="36"
            step="12"
          />
          <CategoryList
            icon={categoryIcon()}
            title="Categories"
            categories={categories}
          />
        </main>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const _games = await getGames();
  const categories = await getCategories();
  let games = [];
  _games.map((item) => {
    games.push({
      id: item.id,
      name: item.name,
      //icon: item.icon,
      time: item.time,
    });
  });

  return {
    props: {
      games,
      categories,
      // _games,
    },
    // revalidate: 60,
  };
};
