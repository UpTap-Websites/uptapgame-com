/* 接口处理函数 / Interface processing function */

import { RECOMMEND_CATEGORIES } from "./constants";

// 数据获取函数 / Data acquisition function
export async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { errors, data } = await res.json();
  if (errors) {
    console.error(errors);
  }

  return data;
}

/* 导航数据 / Navigation data */
// 导航以分类为单位 / Navigation by category
export async function getAllCategories() {
  const data = await fetchAPI(`
    query {
      categories: Categories {
        slug
        name
      }
    }
  `);
  return data?.categories;
}

/* 首页数据 / Home data */
// 按分类取一定数量最新和推荐游戏 / Get a certain number of the latest and recommended games by category
export async function getHomeData() {
  const limit = 3;
  const mediumLimit = 6;
  const longLimit = 12;
  const categories = await getAllCategories();
  let categoriesData = [];
  const data = [];

  // 获取每个分类的游戏数量
  for (const category of categories) {
    const tmp = await getGamesByCategory(category.slug);
    categoriesData.push({
      category,
      total: tmp.total?.[0]?.countDistinct.appid,
    });
  }

  // 如果有推荐分类，调整分类排序，优先显示推荐分类，否则按游戏数量排序
  if (RECOMMEND_CATEGORIES.length > 0) {
    const recommendCategories = [];
    const otherCategories = [];
    for (const item of categoriesData) {
      if (RECOMMEND_CATEGORIES.includes(item.category.slug)) {
        recommendCategories.push(item);
      } else {
        otherCategories.push(item);
      }
    }
    categoriesData = recommendCategories.concat(otherCategories);
  } else {
    categoriesData.sort((a, b) => (a.total < b.total ? 1 : -1));
  }

  // 根据分类排序位置，获取不同游戏数量，从第5个分类以后显示3个游戏，第1、3个分类显示6个游戏，第2、4个分类显示12个游戏
  for (const item of categoriesData) {
    const tmp = await getGamesByCategory(item.category.slug);
    if (data.length >= 4) {
      data.push({
        category: item.category,
        games: tmp.games.slice(0, limit),
        total: item.total,
      });
    } else if (data.length == 1 || data.length == 3) {
      data.push({
        category: item.category,
        games: tmp.games.slice(0, longLimit),
        total: item.total,
      });
    } else {
      data.push({
        category: item.category,
        games: tmp.games.slice(0, mediumLimit),
        total: item.total,
      });
    }
  }
  // data.sort((a, b) => (a.total < b.total ? 1 : -1));
  return data;
}

/* 全部游戏页数据 / All games data */
export async function getAllGames() {
  const data = await fetchAPI(`
    query {
      games: Games (filter: { status: { _eq: "published" } }, limit: -1, sort: "-creation_date") {
        slug
        title
        appid
      }
      total: Games_aggregated (filter: { status: { _eq: "published"} }) {
        countDistinct {
          appid
        }
      }
    }
  `);
  return data;
}
// 按页码获取全部游戏 / Get all games by page number
export async function getAllGamesByPage(page) {
  const limit = 20;
  const data = await fetchAPI(
    `
    query ($limit: Int!, $offset: Int!) {
      games: Games (filter: { status: { _eq: "published" } }, limit: $limit, offset: $offset, sort: "-creation_date") {
        slug
        title
        appid
      }
    }
  `,
    {
      variables: {
        limit,
        offset: (page - 1) * limit,
      },
    }
  );
  return data?.games;
}

/* 分类页数据 / Category data */
// 按分类slug获取分类信息及分类下游戏 / Get category information and games under the category by category slug
export async function getGamesByCategory(slug) {
  const data = await fetchAPI(
    `
    query ($slug: String!) {
      categories: Categories (filter: { slug: { _eq: $slug } }) {
        slug
        name
        description
      }
      games: Games (filter: { category: { slug: { _eq: $slug } }, status: { _eq: "published"} }, limit: -1, sort: "-creation_date") {
        slug
        title
        appid
      }
      total: Games_aggregated (filter: { category: { slug: { _eq: $slug } }, status: { _eq: "published"} }) {
        countDistinct {
          appid
        }
      }
    }`,
    {
      variables: {
        slug,
      },
    }
  );
  return data;
}

// 按分类slug获取分类信息及分类下游戏，分页形式 / Get category information and games under the category by category slug, in the form of pagination
export async function getGamesByCategoryAndPage(slug, page) {
  const limit = 20;
  const data = await fetchAPI(
    `
    query ($slug: String!, $limit: Int!, $offset: Int!) {
      categories: Categories (filter: { slug: { _eq: $slug } }) {
        slug
        name
      }
      games: Games (filter: { category: { slug: { _eq: $slug } }, status: { _eq: "published"} }, limit: $limit, offset: $offset, sort: "-creation_date") {
        slug
        title
        appid
      }
    }  `,
    {
      variables: {
        slug,
        limit,
        offset: (page - 1) * limit,
      },
    }
  );
  return data;
}

/* 详情页数据 / Detail data */
// 按slug获取游戏详情以及相关游戏 / Get game details and related games by slug
export async function getGameAndRelatedGamesBySlug(slug) {
  const limit = 20;
  const data = await fetchAPI(
    `
    query ($slug: String!) {
      game: Games (filter: { slug: { _eq: $slug }, status: { _eq: "published"} }) {
        slug
        title
        appid
        description
        category {
          slug
          name
        }
        description
      }
      related: Games (filter: { slug: { _neq: $slug }, status: { _eq: "published"} }, limit: ${limit}, sort: "-featured") {
        slug
        title
        appid
      }
    }
  `,
    {
      variables: {
        slug: `${slug}`,
      },
    }
  );
  return { game: data?.game?.[0], related: data?.related };
}
