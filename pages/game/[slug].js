import Layout from "../../components/Layout";
// import { useRouter } from "next/router";
import { getCategories, getGames } from "../../lib/api";
import { toSlug, toTitle } from "../../utils/generator";
import GameDetail from "../../components/GameDetail";
import CustomGameList from "../../components/CustomGameList";
import Head from "next/head";
import { SITE_NAME, ADS_SLOTS_ID } from "../../lib/constants";
import Banner from "../../components/Banner";

export default function Games({
  game,
  categories,
  leftGames,
  rightGames,
  bottomGames,
}) {
  // console.log(games);
  //const router = useRouter();
  // const { slug } = router.query;

  // console.log(`game`, game);
  return (
    <>
      <Layout list={categories}>
        <Head>
          <title>{`Play ${toTitle(game.name)} on ${SITE_NAME}`}</title>
        </Head>
        <Banner auto slot={ADS_SLOTS_ID.detail} />
        <div className="relative z-30 grow p-3 md:px-6 xl:p-8">
          <div className="grid gap-3 xl:grid-cols-12 xl:grid-rows-4 xl:gap-6">
            <div className="xl:col-span-8 xl:col-start-3 xl:row-span-2 xl:row-start-1">
              <GameDetail game={game} />
            </div>
            <h3 className="px-2 text-lg font-semibold xl:sr-only">
              You may also like
            </h3>
            <div className="xl:col-span-2 xl:col-start-1 xl:row-span-5 xl:row-start-1 ">
              <ul className="grid grid-cols-4 gap-3 md:grid-cols-10 xl:grid-cols-2 xl:gap-6">
                <CustomGameList games={leftGames} />
              </ul>
            </div>
            <div className="xl:col-span-2 xl:col-start-11 xl:row-span-5 xl:row-start-1">
              <ul className="grid grid-cols-4 gap-3 md:grid-cols-10 xl:grid-cols-2 xl:gap-6">
                <CustomGameList games={rightGames} />
              </ul>
            </div>
            <div className="xl:col-span-8 xl:col-start-3 xl:row-span-2 xl:row-start-3">
              <ul className="grid grid-cols-4 gap-3 md:grid-cols-10 xl:grid-cols-8 xl:gap-6">
                <CustomGameList games={bottomGames} />
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const _games = await getGames();
  const categories = await getCategories();
  let game = _games.filter(
    (game) => toSlug(game.name) == `${context.params.slug}`
  );
  // console.log(game);
  const _relatedGames = _games.filter(
    (g) => toSlug(g.name) !== `${context.params.slug}`
  );
  // console.log(currentGameIndex);
  let relatedGames = [];
  _relatedGames.map((item) => {
    relatedGames.push({
      id: item.id,
      name: item.name,
    });
  });
  relatedGames.sort(function () {
    return 0.5 - Math.random();
  });

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
