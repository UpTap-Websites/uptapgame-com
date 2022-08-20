import Head from "next/head";
import { gameIcon, categoryIcon } from "../components/Icons";
import Layout from "../components/Layout";
import { SITE_NAME } from "../lib/constants";
import { getGames, getCategories } from "../lib/api";
import CategoryList from "../components/CategoryList";
import ScrollGameList from "../components/ScrollGameList";

export default function AllGames({ games, categories }) {
  // console.log(games);
  // console.log(categories);
  // const gameList = games.map((game) => <li key={game.id}>{game.name}</li>);
  return (
    <>
      <Layout list={categories}>
        <Head>
          <title>{`All Games | ${SITE_NAME}`}</title>
        </Head>
        <div className="relative z-30 grow md:px-4">
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
        </div>
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
    },
    // revalidate: 60,
  };
};
