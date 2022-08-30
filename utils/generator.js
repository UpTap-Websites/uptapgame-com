// 转换为slug
export const toSlug = (name) => toTitle(name).replace(/ /g, "-").toLowerCase();
// 转换为标题
export const toTitle = (name) =>
  name
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/3 D/g, " 3D")
    .replace(/([A-Za-z])([0-9])/g, "$1 $2");

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
