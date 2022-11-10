// 转换为slug
export const toSlug = (name) => toTitle(name).replace(/ /g, "-").toLowerCase();
// 转换为标题
export const toTitle = (name) =>
  name
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/3 D/g, " 3D")
    .replace(/([A-Za-z])([0-9])/g, "$1 $2");

// export function toTitle(appid) {
//   return appid
//     .replace(/([A-Z])/g, " $1")
//     .trim()
//     .replace(/3 D/g, " 3D")
//     .replace(/([A-Za-z])([0-9])/g, "$1 $2");
// }

// export function toSlug(title) {
//   return title.replace(/\s+/g, "-").toLowerCase();
// }

// 生成模拟数据
function getRange(m, n, o) {
  let min = m;
  let max = n;
  let range = max - min;
  return o
    ? ((Math.random() * range + min) * o).toFixed(1)
    : (Math.random() * range + min).toFixed(1);
}

export function getStars(level) {
  if (level !== undefined) {
    if (level == "latest") return getRange(4, 4.8);
    else if (level == "featured") return getRange(4.5, 5);
  } else return getRange(4.1, 4.5);
}

export function getCount(level) {
  let latest = 1;
  let normal = 2;
  let featured = 3;
  if (level !== undefined) {
    if (level == "latest") {
      return getRange(10, 50, latest) + `k`;
    } else if (level == "featured") {
      return getRange(110, 200, featured) + `k`;
    }
  } else {
    return getRange(60, 100, normal) + `k`;
  }
}

export function repairData(data) {
  let games = [];
  // let categories = [];

  data?.forEach((game) => {
    // 修复原分类命名错误（拼写、大小写、前后空格）
    let category = game.category.trim().toLowerCase();

    if (category === "gril") {
      category = "Girl";
    } else if (category === "io") {
      category = ".IO";
    } else if (category === "match3") {
      category = "Match 3";
    } else if (category === "sport") {
      category = "Sports";
    }

    let appid = game.name === "LittelBoxer" ? "LittleBoxer" : game.name;

    category = category.replace(/^\S/, (s) => s.toUpperCase());

    // 写入游戏数组
    games.push({
      // id: game.id,
      appid: appid,
      slug: toSlug(appid),
      title: toTitle(appid),
      category: category,
      // description: game.description,
      // creation_date: new Date(game.time).toISOString(),
    });
    // 写入分类数组
    // categories.includes(category) ? null : categories.push(category);
  });

  return games;
}
