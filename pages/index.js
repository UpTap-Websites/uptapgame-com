import Head from "next/head";
import { categoryIcon } from "../components/Icons";
import Layout from "../components/Layout";
import { SITE_META } from "../lib/constants";
import { getGames, getCategories, getGamesByCategory } from "../lib/api";
import GameList from "../components/GameList";
import CategoryList from "../components/CategoryList";
import Link from "next/link";
import GameListItem from "../components/GameListItem";
// import ScrollGameList from "../components/ScrollGameList";

export default function Home({ games, categories }) {
  // console.log(games);
  // console.log(categories);
  // const gameList = games.map((game) => <li key={game.id}>{game.name}</li>);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: SITE_META.url,
    name: SITE_META.name,
    logo: `${SITE_META.url}brand/uptapgame-logo.svg`,
  };
  return (
    <>
      <Layout list={categories}>
        <Head>
          <title>{`${SITE_META.name} | Play Free Games Online`}</title>
        </Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="relative z-30 grow md:px-4">
          <div className="flex flex-col xl:flex-row xl:flex-wrap">
            {categories.map((category) => {
              let categoryGames = games.filter(
                (game) => game.category.toLowerCase() == category
              );
              return (
                <div className="xl:basis-1/4" key={category}>
                  <div className="flex flex-row items-center justify-between p-3 text-sm font-semibold xl:px-8 xl:pb-1">
                    <h2 className="text-lg capitalize text-slate-600 xl:text-xl">
                      {category} Games
                      <span className="ml-2 rounded-md bg-slate-200 p-1 text-sm font-normal">
                        {categoryGames.length}
                      </span>
                    </h2>
                    {categoryGames.length > 6 ? (
                      <div>
                        <Link href={`/category/${category}`}>
                          <a>MORE</a>
                        </Link>
                      </div>
                    ) : null}
                  </div>
                  {/* <GameList games={categoryGames.slice(0, 12)} cols={4} /> */}
                  <ul className="grid grid-cols-3 gap-4 px-8 py-4">
                    <GameListItem games={categoryGames.slice(0, 6)} />
                  </ul>
                </div>
              );
            })}
          </div>
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
  const games = await getGames();
  // const newGames = await getGames("LATEST", 12);
  // const featuredGames = await getGames("FEATURED_GAMES");
  const categories = await getCategories();

  return {
    props: {
      games,
      categories,
    },
    // revalidate: 60,
  };
};
