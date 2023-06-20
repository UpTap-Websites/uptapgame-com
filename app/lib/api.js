/* 接口处理函数 / Interface processing function */
// 数据获取函数 / Data acquisition function
export async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL2}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN2}`,
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
      categories {
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
  const limit = 6;
  const categories = await getAllCategories();
  const data = [];
  for (const category of categories) {
    const tmp = await getGamesByCategory(category.slug);
    data.push({
      category,
      games: tmp.games.slice(0, limit),
      total: tmp.total?.[0]?.countDistinct.gid,
    });
  }
  return data.sort((a, b) => (a.total < b.total ? 1 : -1));
}

/* 全部游戏页数据 / All games data */
export async function getAllGames() {
  const data = await fetchAPI(`
    query {
      games (filter: { status: { _eq: "published" } }, limit: -1, sort: "-creation_date") {
        slug
        title
        gid
      }
    }
  `);
  return data?.games;
}
// 按页码获取全部游戏 / Get all games by page number
export async function getAllGamesByPage(page) {
  const limit = 20;
  const data = await fetchAPI(
    `
    query ($limit: Int!, $offset: Int!) {
      games (filter: { status: { _eq: "published" } }, limit: $limit, offset: $offset, sort: "-creation_date") {
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
      categories (filter: { slug: { _eq: $slug } }) {
        slug
        name
        description
      }
      games (filter: { category: { slug: { _eq: $slug } }, status: { _eq: "published"} }, limit: -1, sort: "-creation_date") {
        slug
        title
        gid
      }
      total: games_aggregated (filter: { category: { slug: { _eq: $slug } }, status: { _eq: "published"} }) {
        countDistinct {
          gid
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
      categories (filter: { slug: { _eq: $slug } }) {
        slug
        name
      }
      games (filter: { category: { slug: { _eq: $slug } }, status: { _eq: "published"} }, limit: $limit, offset: $offset, sort: "-creation_date") {
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
      game: games (filter: { slug: { _eq: $slug }, status: { _eq: "published"} }) {
        slug
        title
        gid
        description
        category {
          slug
          name
        }
        description
      }
      related: games (filter: { slug: { _neq: $slug }, status: { _eq: "published"} }, limit: ${limit}, sort: "-featured") {
        slug
        title
        gid
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
