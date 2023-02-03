import Link from "next/link";
import Image from "next/image";
import { toSlug, toTitle } from "../utils/generator";
import { IMAGE_PATH, IMAGE_FORMAT } from "../lib/constants";

export default function CustomGameList({ games }) {
  const gamelist = games.map((game) => (
    <li key={game.id} className="xl:transition xl:duration-500 xl:ease-in-out xl:hover:scale-125">
      <Link
        href={`/game/${toSlug(game.name)}`}
        className="block overflow-hidden rounded-xl shadow-md shadow-slate-900/30"
        passHref
      >
        <Image
          src={`${IMAGE_PATH}${game.name}.${IMAGE_FORMAT}`}
          alt={toTitle(game.name)}
          height={200}
          width={200}
          quality={83}
        />
      </Link>
      <h3 className="my-1 text-center text-xs leading-tight">{toTitle(game.name)}</h3>
    </li>
  ));
  return games.length !== 0 && gamelist;
}

// if (games.length != 0) {
//   return <>{gamesList}</>;
// } else {
//   return <></>;
// }
