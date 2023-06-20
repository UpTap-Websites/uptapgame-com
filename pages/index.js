import { getHomeData } from "@/lib/api";
import Link from "next/link";
import { Fragment } from "react";

import GameListItem from "@/components/GameListItem";
import AdSense from "@/components/AdSense";
import { ADS_SLOT_ID, SITE_META } from "@/lib/constants";
import AdScript from "@/components/AdScript";
import Head from "next/head";

export default function Home({ data }) {
  console.log(`Home data:`, data);
  return (
    <>
      <Head>
        <title>{`${SITE_META.NAME} | ${SITE_META.SLOGAN}`}</title>
        <link rel="canonical" href={`${SITE_META.URL}/`} />
      </Head>
      <AdScript />
      <main className={`site-main home`}>
        {data &&
          data.map((item, index) => {
            if (item.total > 0)
              return (
                <Fragment key={item.category.slug}>
                  <section>
                    <div className="section-head">
                      <div className="title">
                        <h2>{`${item.category.name} Games`}</h2>
                        <span>{item.total}</span>
                      </div>
                      {item.total <= 3 ? null : (
                        <Link className="link-more" href={`/category/${item.category.slug}`}>
                          More
                        </Link>
                      )}
                    </div>
                    <ul className="game-list">
                      {item.games.map((game) => {
                        return <GameListItem item={game} key={game.slug} />;
                      })}
                    </ul>
                    {index === 0 || index === 2 ? (
                      <div className="banner my-4">
                        <AdSense slot={ADS_SLOT_ID.HOME} key={Math.random()} />
                      </div>
                    ) : null}
                  </section>
                </Fragment>
              );
          })}
      </main>
    </>
  );
}

export async function getStaticProps(ctx) {
  const data = await getHomeData();
  return {
    props: {
      data: data,
    },
  };
}
