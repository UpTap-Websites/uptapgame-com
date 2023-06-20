import ListItem from "@/app/components/listItem";
import { getGamesByCategory } from "../../lib/api";
export default async function Category({ params }) {
  const { categories, games, total } = await getGamesByCategory(params.slug);
  console.log(`categories`, categories);
  console.log(`games`, games);
  console.log(`total`, total);
  return (
    <main className="site-main list">
      <section>
        <div className="section-head">
          <h1>{`${categories?.[0].name} Games`}</h1>
          <p>{categories?.[0].description}</p>
        </div>
        <ul className="game-list">
          {games?.map((game) => <ListItem item={game} key={game.slug} />) ?? null}
        </ul>
      </section>
    </main>
  );
}
