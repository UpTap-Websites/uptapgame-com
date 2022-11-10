import GameListItem from "./GameListItem";
export default function GameList({ games, cols }) {
  const setCol = () => {
    if (cols == "2") return `grid-cols-2`;
    else if (cols == "3") return `grid-cols-3`;
    else if (cols == "5") return `grid-cols-5`;
    else return `grid-cols-4`;
  };

  return (
    games.length !== 0 && (
      <ul className={`game-list ${setCol()}`}>
        <GameListItem games={games} />
      </ul>
    )
  );
}
