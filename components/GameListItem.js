import Link from "next/link";
import Image from "next/future/image";
import { toTitle, toSlug } from "../utils/generator";
import { IMAGE_PATH, IMAGE_FORMAT } from "../lib/constants";
import dayjs from "dayjs";

const GameListItem = ({ games, className }) => {
  return games.map((game) => (
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
            src={`${IMAGE_PATH}${game.name}.${IMAGE_FORMAT}`}
            alt={toTitle(game.name)}
            height={200}
            width={200}
            quality={83}
            layout="responsive"
          />
        </a>
      </Link>
      <h3 className="my-2 text-center text-xs font-bold leading-tight">
        {toTitle(game.name)}
      </h3>
      <div className="hidden text-center text-xs">
        {dayjs(new Date(game.time)).format("MMM DD, YYYY")}
      </div>
    </li>
  ));
};

export default GameListItem;
