import { useState } from "react";
import Head from "next/head";
import useCurrentData from "../../data/CurrentData";
import dayjs from "dayjs";
import { getStars, toSlug, toTitle } from "../../utils/generator";
import { GAME_PATH, LANDSCAPE_GAMES, RE_CATEGORY } from "../../lib/constants";
import Image from "next/future/image";

export default function Editor({ data }) {
  function ShowCurrentData() {
    const { data, isLoading, isError } = useCurrentData();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Fail to load</div>;

    let games = [];
    let categories = [];

    function getCategoryID(category) {
      let cat = category.toLowerCase().replace(/ /, "-");
      switch (cat) {
        case `arcade`:
          return 1;
        case `puzzle`:
        case `puzzles`:
          return 2;
        case `casual`:
          return 3;
        case `simulation`:
          return 4;
        case `sports`:
          return 5;
        case `strategy`:
          return 6;
        case `match-3`:
          return 7;
        case `racing`:
          return 8;
        case `shooting`:
          return 9;
        case `adventure`:
          return 11;
        case `girl`:
          return 12;
        case `io`:
          return 13;

        default:
          break;
      }
    }

    let tmpData = data.gamelist.slice();

    tmpData.find(
      (item) => item.name.toLowerCase() == `sharkiscoming`
    ).name = `SharkIsComing`;

    RE_CATEGORY.map((cat) => {
      for (const [key, value] of Object.entries(cat)) {
        tmpData.map((item) => {
          value.includes(item.name) ? (item.category = key) : null;
        });
      }
    });

    tmpData.map((item) => {
      let game = {}; // 临时对象
      game.title = toTitle(
        // item.name == `SharkisComing` ? `SharkIsComing` : item.name
        item.name
      );
      game.slug = toSlug(
        // item.name == `SharkisComing` ? `SharkIsComing` : item.name
        item.name
      );
      // game.gid = item.name == `SharkisComing` ? `SharkIsComing` : item.name; // 修复源id命名错误
      game.gid = item.name; // 修复源id命名错误

      game.category = getCategoryID(item.category.trim().toLowerCase());

      game.game_url = `${GAME_PATH}${item.name}`;
      game.icon_url = `https://cdn.iwantalipstick.com/gameicon2/png/${item.name}.png`;
      game.description = item.description.trim();
      game.oritention = LANDSCAPE_GAMES.includes(item.name)
        ? `landscape`
        : `portrait`;
      // game.tags = null;
      // game.status = `draft`;
      game.rating = getStars() - 0;
      game.creation_date = new Date(item.time).toISOString();
      games.push(game);

      // categories.push(
      //   item.category.trim().toLowerCase() == `puzzles`
      //     ? `Puzzle`
      //     : item.category
      //         .trim()
      //         .toLowerCase()
      //         .replace(/^\S/, (s) => s.toUpperCase())
      // );
    });

    categories = [...new Set(categories)];

    // games.forEach((game) => {
    //   let cat = game.category;
    //   console.log(`GAME:`, game.title, `cat`, cat, `type: `, typeof cat);

    //   game.category = getCategoryID(cat.toLowerCase());
    // });

    console.log(`games`, games);

    return (
      <>
        <Head>
          <title>Editor</title>
        </Head>
        <div className="my-4">
          源数据 / Original Data: {data.gamelist.length}
        </div>
        <div className="relative grid grid-cols-2 gap-6">
          <div className="overflow-auto border-4 border-slate-100">
            <table className="w-full table-auto text-xs leading-8">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" name="" id="" />
                  </th>
                  <th>#</th>
                  <th>icon</th>
                  <th>appid</th>
                  <th>category</th>
                  <th>creation_date</th>
                </tr>
              </thead>
              <tbody className="">
                {data.gamelist
                  .sort((a, b) =>
                    new Date(a.time) < new Date(b.time) ? 1 : -1
                  )
                  .map((game, index) => (
                    <tr key={game.id}>
                      <td>
                        <input type="checkbox" name="" id={game.name} />
                      </td>
                      <td>{index + 1}</td>
                      <td className="relative h-16 w-16">
                        <Image
                          className="bg-slate-100"
                          src={game.icon}
                          alt={game.name}
                          width={40}
                          height={40}
                          layout={`responsive`}
                        />
                      </td>
                      <td>{game.name}</td>
                      <td>
                        {game.category[0] == game.category[0].toUpperCase() &&
                        game.category == game.category.trim() ? (
                          game.category
                        ) : (
                          <span className="text-red-500">{game.category}</span>
                        )}
                      </td>
                      <td>
                        {dayjs(new Date(game.time)).format(
                          "MMM DD, YYYY hh:mm"
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="">
            <h2>Output</h2>
            <textarea
              className="w-full select-all border-4 border-slate-100 bg-slate-50 p-6 text-xs"
              name=""
              id=""
              cols="30"
              rows="30"
              value={JSON.stringify(games, null, 4)}
            ></textarea>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="container mx-auto my-6 bg-white p-6">
        <h2>Fetch source data</h2>
        <div className="flex items-center gap-3">
          <lable>URL: </lable>
          <input
            className="w-1/2 border p-2"
            type="text"
            name="dataUrl"
            id="dataUrl"
          />
          <button className="bg-blue-600 p-2 text-white">Fetch</button>
        </div>
        <ShowCurrentData />
      </div>
    </>
  );
}

Editor.getInitialProps = async (ctx) => {
  return {
    data: null,
  };
};
