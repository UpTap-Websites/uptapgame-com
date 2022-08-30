import Layout from "../../components/Layout";
import GameList from "../../components/GameList";
import { useRouter } from "next/router";
import { getGamesByCategory, getCategories } from "../../lib/api";
import Head from "next/head";
import { SITE_NAME } from "../../lib/constants";

export default function GamesListByCategory({ games, categories }) {
  // console.log(games);
  const router = useRouter();
  const { slug } = router.query;
  // console.log(router.query);
  // console.log({ slug });
  const categoryName =
    slug.toLowerCase() == "io"
      ? "IO"
      : slug.toString().replace(/^\S/, (s) => s.toUpperCase());
  // console.log(categoryName);
  return (
    <>
      <Layout list={categories} isOpen>
        <Head>
          <title>{`${categoryName} Games | ${SITE_NAME}`}</title>
        </Head>
        <div className="relative z-30 grow md:px-4">
          <h1 className="px-4 pt-2 pb-2 text-center text-2xl font-semibold capitalize text-slate-900/80">
            {categoryName} {games.length > 1 ? `Games` : `Game`} ({games.length}
            )
          </h1>
          <GameList cols="4" games={games} />
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const _games = await getGamesByCategory(
    `${context.params.slug.replace(/-/, " ")}`
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
      slug: category.replace(/ /, "-"),
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
