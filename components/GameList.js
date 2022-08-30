import Link from "next/link";
import Image from "next/image";
import { toSlug, toTitle } from "../utils/generator";
import GameListItem from "./GameListItem";
export default function GameList({ title, games, icon, cols, className }) {
  const setCol = () => {
    if (cols == "2") return `grid-cols-2`;
    else if (cols == "3") return `grid-cols-3`;
    else if (cols == "5") return `grid-cols-5`;
    else return `grid-cols-4`;
  };

  const gamesList = games.map((game) => (
    <li
      key={game.id}
      className={`xl:transition xl:duration-500 xl:ease-in-out xl:hover:scale-125 ${className}`}
    >
      <Link href={`/game/${toSlug(game.name)}`}>
        <a
          title={toTitle(game.name)}
          className="block overflow-hidden rounded-2xl bg-loading bg-center bg-no-repeat shadow-lg shadow-slate-900/30"
        >
          <Image
            src={game.icon}
            alt={toTitle(game.name)}
            height={200}
            width={200}
            quality={83}
            layout="responsive"
          />
        </a>
      </Link>
      <h3 className="my-1 text-center text-xs leading-tight">
        {toTitle(game.name)}
      </h3>
    </li>
  ));
  if (games.length != 0) {
    if (title === undefined) {
      return (
        <>
          <ul
            className={`grid ${setCol()} gap-4 p-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 xl:gap-6 xl:py-4 xl:px-8 2xl:grid-cols-12`}
          >
            <GameListItem games={games} />
          </ul>
        </>
      );
    } else {
      return (
        <>
          <h2 className="flex items-center space-x-2 px-3 py-2 pb-0 font-semibold text-slate-600 md:text-sm xl:px-8 xl:pb-1 xl:text-xl">
            {icon}
            <span>{title}</span>
          </h2>
          <ul
            className={`grid overflow-auto ${setCol()} gap-4 p-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 xl:gap-6 xl:py-4 xl:px-8 2xl:grid-cols-12`}
          >
            <GameListItem games={games} />
          </ul>
        </>
      );
    }
  } else {
    return <></>;
  }
}
