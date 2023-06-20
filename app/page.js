import Link from "next/link";
import { getHomeData } from "./lib/api";
import Image from "next/image";
import getIconUrl from "./utils/getIconUrl";
import isRecommended from "./utils/isRecommended";

export default async function Home() {
  const data = await getHomeData();
  console.log(`data`, data);

  return (
    <main className="site-main home">
      {data.map(({ category, games, total }) => {
        return (
          <section key={category.slug}>
            <div className="section-head">
              <div className="title">
                <h2>{category.name} Games</h2>
                <span>{total}</span>
              </div>
              <Link className="link-more" href={`/category/${category.slug}`}>
                More
              </Link>
            </div>
            <ul className="game-list">
              {games.map((game) => {
                return (
                  <li key={game.gid}>
                    <Link
                      className={isRecommended(game.gid) ? `hot` : ``}
                      href={`/game/${game.slug}`}
                    >
                      <Image src={getIconUrl(game.gid)} width={200} height={200} alt={game.title} />
                      <span>{game.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </main>
  );
}
