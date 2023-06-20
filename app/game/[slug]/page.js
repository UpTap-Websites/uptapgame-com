import ListItem from "@/app/components/listItem";
import List from "@/app/components/list";
import { getGameAndRelatedGamesBySlug } from "../../lib/api";
import Image from "next/image";
import getIconUrl from "@/app/utils/getIconUrl";
import Link from "next/link";
import getGameUrl from "@/app/utils/getGameUrl";
export default async function Game({ params }) {
  const { game, related } = await getGameAndRelatedGamesBySlug(params.slug);

  console.log(`game`, game);
  console.log(`related`, related);
  return (
    <main className="site-main detail">
      <section>
        <div className="order-2 grow">
          <div className="meta">
            <Image
              className="thumbnail"
              src={getIconUrl(game.gid)}
              width={200}
              height={200}
              alt={game.title}
            />
            <h1>{game.title}</h1>
            <p>
              <Link className="category" href={`/category/${game.category.slug}`}>
                {game.category.name}
              </Link>
            </p>

            <p className="description">{game.description}</p>
          </div>
          <div>
            <a
              className="play-btn"
              href={getGameUrl(game.gid)}
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
            <ul className="game-list">
              {related?.slice(0, 8).map((game) => <ListItem item={game} key={game.slug} />) ?? null}
            </ul>
          </div>
        </div>
        <aside className="xl:max-w-xl order-1 xl:pt-4">
          <List items={related.slice(8, 14)} />
          <div className="banner">
            <b>Your Position</b>
          </div>
        </aside>
        <aside className="xl:max-w-xl order-3 xl:pt-4">
          <List items={related.slice(14)} />
          <div className="banner">
            <b>Your Position</b>
          </div>
        </aside>
      </section>
    </main>
  );
}
