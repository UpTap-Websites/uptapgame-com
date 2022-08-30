import {
  API_URL,
  SELECTED_GAMES,
  EXCLUED_GAMES,
  FEATURED_GAMES,
  GAME_PATH,
  RE_CATEGORY,
} from "../constants";
import { toTitle, toSlug, getCount, getStars } from "../../utils/generator";

async function fetchAPI() {
  const json = await fetch(API_URL).then((res) => res.json());

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  // console.log(json);
  return json.gamelist; // 返回游戏列表
}

export async function getGames(type, limit) {
  const data = await fetchAPI();
  // console.log(data.length);
  let gamesName = [];
  data.map((game) => gamesName.push(game.name)); // 存储所有游戏名称
  data.sort((a, b) => (new Date(a.time) < new Date(b.time) ? 1 : -1)); // 按时间排序
  /* data.sort((a, b) => (a.name > b.name ? 1 : -1)); // 按名称排序 */

  data.map((game) => {
    game["stars"] = getStars();
    game["played"] = getCount();
  });

  let games = []; // 创建临时数组

  if (SELECTED_GAMES.length != 0) {
    //

    // console.log(SELECTED_GAMES.filter((name) => !gamesName.includes(name))); // 检查名称是否出错
    games = data.filter((game) => SELECTED_GAMES.indexOf(game.name) != -1);
  } else if (EXCLUED_GAMES.length != 0) {
    // console.log(EXCLUED_GAMES.length);
    //
    // console.log(EXCLUED_GAMES.filter((name) => !gamesName.includes(name))); // 检查名称是否出错
    games = data.filter((game) => EXCLUED_GAMES.indexOf(game.name) == -1);
  } else {
    games = data;
  }
  // console.log(games.length);

  if (FEATURED_GAMES.length != 0 && type == "FEATURED_GAMES") {
    //
    // console.log(FEATURED_GAMES.filter((name) => !gamesName.includes(name))); // 检查名称是否出错
    games = games.filter((game) => FEATURED_GAMES.indexOf(game.name) != -1);
    if (limit !== undefined) {
      games = games.slice(0, limit);
    }
    games.map((game) => {
      game["stars"] = getStars("featured");
      game["played"] = getCount("featured");
    });
  }

  if (type == "LATEST") {
    // games.sort((a, b) => (a.time < b.time ? 1 : -1));
    games.reverse();
    if (limit != undefined) {
      games = games.slice(0, limit);
      games.map((game) => {
        game["stars"] = getStars("latest");
        game["played"] = getCount("latest");
      });
    } // 唯一参数为数字
  }

  /* games.map((game) => {
    (game["url"] = `${GAME_PATH}${game.name}`),
      (game["title"] = `${toTitle(game.name)}`),
      (game["slug"] = `${toSlug(game.name)}`);
  }); // 设置游戏路径、标题、slug */

  // games.map((game) => (game["name"] = game.name.replace(/Woodis/, "WoodIs")));
  games.map((game) => (game["name"] = game.name.replace(/Sharkis/, "SharkIs")));

  // games.map(
  //   (game) =>
  //     (game["icon"] =
  //       game.name == "BestSniper"
  //         ? "https://lab.uptapgame.com/uploads/Best_Sniper_89bc0fc495.png"
  //         : game.icon)
  // );
  // games.map(
  //   (game) =>
  //     (game["icon"] =
  //       game.name == "WoodIsland"
  //         ? "https://lab.uptapgame.com/uploads/Wood_Island_230458dfa5.png"
  //         : game.icon)
  // );

  games.map((game) => (game["url"] = `${GAME_PATH}${game.name}`)); // 设置游戏路径
  games.map((game) => (game["title"] = `${toTitle(game.name)}`)); // 设置游戏标题
  games.map((game) => (game["slug"] = `${toSlug(game.name)}`)); // 设置游戏slug
  games.map(
    (game) =>
      (game[
        "icon"
      ] = `https://cdn.iwantalipstick.com/gameicon2/png/${game.name}.png`)
  ); // 设置游戏slug

  // 修复分类命名错误问题
  // games.map(
  //   (game) =>
  //     (game["category"] = `${game.category
  //       .trim()
  //       .toLowerCase()
  //       .replace(/^\S/, (s) => s.toUpperCase())}`)
  // );
  // games.map(
  //   (game) =>
  //     (game["category"] = game.category == "Puzzles" ? "Puzzle" : game.category)
  // );

  // 重新分类
  games.map((game) => {
    RE_CATEGORY.map((cat) => {
      for (const [key, value] of Object.entries(cat)) {
        value.includes(game.name) ? (game.category = key) : null;
      }
    });
  });

  return games;
}

export async function getCategories() {
  const games = await getGames();
  let categories = games.map((game) => game.category.toLowerCase());
  categories = [...new Set(categories)];
  categories = categories.sort();
  return categories;
}

export async function getGamesByCategory(genre) {
  let games = await getGames();
  games = games.filter(
    (game) => game.category.toLowerCase() == genre.toLowerCase()
  );
  // console.log(games);

  return games;
}
