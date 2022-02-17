import Link from "next/link";
import Image from "next/image";
import { toTitle, toSlug } from "../lib/api";

const GameListItem = ({ games, className }) => {
  return games.map((game) => (
    <li
      key={game.id}
      className={`xl:hover:scale-125 transition ease-in-out duration-500 ${className}`}
    >
      <Link href={`/game/${toSlug(game.name)}`}>
        <a
          title={toTitle(game.name)}
          className="block rounded-2xl overflow-hidden shadow-lg shadow-slate-900/30 bg-loading bg-center bg-no-repeat"
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
      <h3 className="my-1 text-xs text-center leading-tight">
        {toTitle(game.name)}
      </h3>
    </li>
  ));
};

export default GameListItem;