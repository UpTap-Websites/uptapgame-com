import GameList from "@/components/GameList";
import { getAllGames, getGameAndRelatedGamesBySlug } from "@/lib/api";
import getIconUrl from "@/utils/getIconUrl";
import getGameUrl from "@/utils/getGameUrl";
import Image from "next/image";
import Link from "next/link";
import AdSense from "@/components/AdSense";
import { ADS_SLOT_ID, SITE_META } from "@/lib/constants";
import AdScript from "@/components/AdScript";
import Head from "next/head";

export default function Game({ game, related }) {
  console.log(`Game data:`, game);
  return (
    <>
      <Head>
        <title>{`Play ${game.title} on ${SITE_META.NAME}`}</title>
        <link rel="canonical" href={`${SITE_META.URL}/game/${game.slug}/`} />
      </Head>
      <AdScript />
      <main className="site-main detail">
        <section>
          <div className="order-2 grow">
            <div className="banner xl:hidden">
              <AdSense slot={ADS_SLOT_ID.DETAIL} key={Math.random()} />
            </div>
            <div className="meta">
              <Image
                className="thumbnail"
                src={getIconUrl(game.appid)}
                width={200}
                height={200}
                alt={game.title}
              />
              <h1>{game.title}</h1>
              <p>
                <Link className="category" href={`/category/${game?.category?.slug}`}>
                  {game?.category?.name}
                </Link>
              </p>

              <p className="description">{game.description}</p>
            </div>
            <div>
              <a
                className="play-btn"
                href={getGameUrl(game.appid)}
                target="_blank"
                title={`Play ${game.title} Now`}
              >
                Play Now
              </a>
            </div>
            <div className="popular">
              <div className="section-head">
                <h2>You May Also Like</h2>
              </div>
              <GameList items={related.slice(0, 8)} />
            </div>
          </div>
          <aside className="xl:max-w-xl order-1 xl:pt-4">
            <GameList items={related.slice(8, 14)} />
            <div className="banner">
              <AdSense slot={ADS_SLOT_ID.DETAIL} key={Math.random()} />
            </div>
          </aside>
          <aside className="xl:max-w-xl order-3 xl:pt-4">
            <GameList items={related.slice(14)} />
            <div className="banner">
              <AdSense slot={ADS_SLOT_ID.DETAIL} key={Math.random()} />
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps(ctx) {
  const { slug } = ctx.params;
  const data = await getGameAndRelatedGamesBySlug(slug);
  return {
    props: {
      game: data.game,
      related: data.related,
    },
  };
}

export async function getStaticPaths() {
  const data = await getAllGames();
  const paths = data.games.map((item) => {
    return { params: { slug: item.slug } };
  });
  return {
    paths: paths,
    fallback: false,
  };
}
