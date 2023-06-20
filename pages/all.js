import GameList from "@/components/GameList";
import { getAllGames } from "@/lib/api";
import { SITE_META } from "@/lib/constants";
import Head from "next/head";

export default function AllGames({ data }) {
  console.log(`AllGames data:`, data);
  return (
    <>
      <Head>
        <title>{`All Games | ${SITE_META.NAME}`}</title>
        <link rel="canonical" href={`${SITE_META.URL}/all/`} />
      </Head>
      <main class="site-main list">
        <section>
          <div class="section-head">
            <h1>All Games</h1>
            <span>{`(${data.total?.[0].countDistinct.appid})`}</span>
          </div>
          <GameList items={data.games} />
        </section>
      </main>
    </>
  );
}

export async function getStaticProps(ctx) {
  const data = await getAllGames();
  return {
    props: {
      data: data,
    },
  };
}
