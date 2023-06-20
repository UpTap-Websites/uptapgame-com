import GameListItem from "./GameListItem";

export default function GameList({ items }) {
  return (
    <>
      {items && (
        <ul className="game-list">
          {items.map((item) => (
            <GameListItem item={item} key={item.slug} />
          ))}
        </ul>
      )}
    </>
  );
}
