import { getAllGames } from "@/app/lib/api";
import ListItem from "../components/listItem";

export default async function AllGames() {
  const data = await getAllGames();

  console.log(`data`, data);

  return (
    <main className="site-main list">
      <section>
        <div className="section-head">
          <h1>All Games</h1>
        </div>
        <ul className="game-list">
          {data?.map((game) => (
            <ListItem item={game} key={game.slug} />
          ))}
        </ul>
      </section>
    </main>
  );
}
