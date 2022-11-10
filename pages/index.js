import Head from "next/head";
import Banner from "../components/Banner";
import { categoryIcon } from "../components/Icons";
import Layout from "../components/Layout";
import { getCategories, getGames } from "../lib/api";
import { ADSENSE_ID, ADS_SLOTS_ID, SITE_META } from "../lib/constants";
// import GameList from "../components/GameList";
import Link from "next/link";
import Script from "next/script";
import CategoryList from "../components/CategoryList";
import GameListItem from "../components/GameListItem";

// import ScrollGameList from "../components/ScrollGameList";

export default function Home({ games, categories }) {
  // console.log(games);
  // console.log(categories);
  // const gameList = games.map((game) => <li key={game.id}>{game.name}</li>);
  function getGameTotal(category) {
    let tmp = games.filter((game) => game.category.toLowerCase() == category);
    return tmp.length;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: SITE_META.URL,
    name: SITE_META.NAME,
    logo: `${SITE_META.URL}brand/uptapgame-logo.svg`,
  };
  return (
    <>
      <Head>
        <title>{`${SITE_META.NAME} | Play Free Games Online`}</title>
      </Head>
      <Script
        id="ads-init"
        strategy="beforeInteractive"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
        crossOrigin="anonymous"
      />
      <Layout list={categories}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <main className="main homepage">
          <div className="flex flex-col xl:flex-row xl:flex-wrap">
            {categories
              .slice()
              .sort((a, b) => (getGameTotal(a) < getGameTotal(b) ? 1 : -1))
              .map((category, index) => {
                let categoryGames = games.filter(
                  (game) => game.category.toLowerCase() == category
                );
                return (
                  <div className="xl:basis-1/4" key={category}>
                    <div className="flex flex-row items-center justify-between p-3 text-sm font-semibold xl:px-8 xl:pb-1">
                      <h2 className="text-lg capitalize text-slate-600 xl:text-xl">
                        {category.toLowerCase() == "io" ? "IO" : category} Games
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
                      {index == 1 || index == 3 ? (
                        <GameListItem games={categoryGames.slice(0, 12)} />
                      ) : (
                        <GameListItem games={categoryGames.slice(0, 6)} />
                      )}
                    </ul>
                    {index == 0 || index == 2 ? (
                      <>
                        <Banner
                          responsive={`false`}
                          style={{
                            display: `flex`,
                            justifyContent: `center`,
                            width: `320px`,
                            backgroundColor: `#00000010`,
                            margin: `0 auto`,
                          }}
                          format={[`rectangle`]}
                          key={Math.random()}
                          slot={ADS_SLOTS_ID.home}
                        />
                      </>
                    ) : null}
                  </div>
                );
              })}
          </div>
          <CategoryList
            icon={categoryIcon()}
            title="Categories"
            categories={categories.slice()}
          />
        </main>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const _games = await getGames();
  // const newGames = await getGames("LATEST", 12);
  // const featuredGames = await getGames("FEATURED_GAMES");
  const categories = await getCategories();
  let games = [];
  _games.map((item) => {
    games.push({
      // id: item.id,
      name: item.name,
      category: item.category,
      // time: item.time,
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
};
