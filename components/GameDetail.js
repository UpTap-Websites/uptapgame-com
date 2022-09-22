import Image from "next/future/image";
import Link from "next/link";
import { toTitle } from "../utils/generator";
import Head from "next/head";
import { SITE_NAME, IMAGE_PATH, IMAGE_FORMAT } from "../lib/constants";

export default function GameDetail({ game }) {
  return (
    <>
      <div className="flex flex-col rounded-[2rem] border-4 border-slate-400/60 bg-white p-5 shadow-lg shadow-slate-900/10 md:flex-row">
        <div className="flex justify-center text-center">
          <Image
            src={`${IMAGE_PATH}${game.name}.${IMAGE_FORMAT}`}
            alt={toTitle(game.name)}
            width={150}
            height={150}
            quality="83"
            className="h-24 w-24 shrink-0 rounded-xl bg-loading bg-center bg-no-repeat"
            layout="responsive"
          />
        </div>
        <div className="text-center md:px-5 md:text-left">
          <h1 className="py-2 text-2xl font-semibold text-slate-700">
            <span>{toTitle(game.name)}</span>
          </h1>
          <p>
            <Link
              href={`/category/${game.category
                .toLowerCase()
                .replace(/ /, "-")}`}
            >
              <a className="rounded-md bg-slate-600/80 py-1 px-2 text-xs text-slate-100/60 shadow-md shadow-slate-900/30">
                {game.category}
              </a>
            </Link>
          </p>
          <p className="py-3 text-left text-xs md:text-sm">
            {game.description}
          </p>
        </div>
      </div>
      <p className="py-5">
        <Link href={game.url}>
          <a
            className="mx-auto block rounded-full bg-orange-500 p-3 text-center text-lg font-semibold text-white shadow-lg shadow-orange-400/40 md:w-96"
            title={`Play ${toTitle(game.name)} Now`}
          >
            Play Now
          </a>
        </Link>
      </p>
    </>
  );
}
