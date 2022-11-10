import Link from "next/link";
import Image from "next/future/image";
import { toTitle, toSlug } from "../utils/generator";
import { IMAGE_PATH, IMAGE_FORMAT } from "../lib/constants";
// import dayjs from "dayjs";

export default function GameListItem({ games, className }) {
  return games.map((game) => (
    <li key={game.name} className={`list-item ${className ? className : ``}`}>
      <Link href={`/game/${toSlug(game.name)}`}>
        <a title={toTitle(game.name)} className="item-link">
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
      <h3>{toTitle(game.name)}</h3>
      {/* <div className="hidden text-center text-xs">
        {dayjs(new Date(game.time)).format("MMM DD, YYYY")}
      </div> */}
    </li>
  ));
}
