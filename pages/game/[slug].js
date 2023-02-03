import Layout from "@/components/Layout";
// import { useRouter } from "next/router";
import { getCategories, getGames } from "@/lib/api";
import { toSlug, toTitle } from "@/utils/generator";
import GameDetail from "@/components/GameDetail";
import CustomGameList from "@/components/CustomGameList";
import Head from "next/head";
import { SITE_META, ADS_SLOTS_ID, ADSENSE_ID } from "@/lib/constants";
import Banner from "@/components/Banner";
import Script from "next/script";

export default function Games({ game, categories, leftGames, rightGames, bottomGames }) {
  console.log(`game:`, game);
  //const router = useRouter();
  // const { slug } = router.query;

  // console.log(`game`, game);
  return (
    <>
      <Head>
        <title>{`Play ${toTitle(game.name)} on ${SITE_META.NAME}`}</title>
      </Head>
      <Script
        id="ads-init"
        strategy="beforeInteractive"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
        crossOrigin="anonymous"
      />
      <Layout list={categories}>
        <Banner className={`banner`} auto slot={ADS_SLOTS_ID.detail} key={Math.random()} />
        <main className="main detail">
          <div className="grid gap-3 xl:grid-cols-12 xl:grid-rows-4 xl:gap-6">
            <div className="mx-4 xl:col-span-8 xl:col-start-3 xl:row-span-2 xl:row-start-1">
              <GameDetail game={game} />
            </div>
            <h3 className="mx-4 px-2 text-lg font-semibold xl:sr-only">You may also like</h3>
            <div className="mx-4 xl:col-span-2 xl:col-start-1 xl:row-span-5 xl:row-start-1">
              <ul className="grid grid-cols-4 gap-3 md:grid-cols-10 xl:grid-cols-2 xl:gap-6">
                <CustomGameList games={leftGames} />
              </ul>
            </div>
            <div className="mx-4 xl:col-span-2 xl:col-start-11 xl:row-span-5 xl:row-start-1">
              <ul className="grid grid-cols-4 gap-3 md:grid-cols-10 xl:grid-cols-2 xl:gap-6">
                <CustomGameList games={rightGames} />
              </ul>
            </div>
            <div className="mx-4 xl:col-span-8 xl:col-start-3 xl:row-span-2 xl:row-start-3">
              <ul className="grid grid-cols-4 gap-3 md:grid-cols-10 xl:grid-cols-8 xl:gap-6">
                <CustomGameList games={bottomGames} />
              </ul>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const _games = await getGames();
  const categories = await getCategories();
  let game = _games.filter((game) => toSlug(game.name) == `${context.params.slug}`);
  // console.log(game);
  const _relatedGames = _games
    .filter((g) => toSlug(g.name) !== `${context.params.slug}`)
    .sort(() => 0.5 - Math.random())
    .slice(0, 32);
  // console.log(currentGameIndex);
  let relatedGames = [];
  _relatedGames.map((item) => {
    relatedGames.push({
      id: item.id,
      name: item.name,
    });
  });
  // relatedGames.sort(() => 0.5 - Math.random());

  return {
    props: {
      game: game[0],
      categories,
      rightGames: relatedGames.slice(0, 8),
      leftGames: relatedGames.slice(8, 16),
      bottomGames: relatedGames.slice(16, 32),
      //games: relatedGames,
    },
    // revalidate: 60,
  };
}

export const getStaticPaths = async () => {
  const games = await getGames();
  const paths = games.map((game) => ({
    params: {
      slug: toSlug(game.name),
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
