export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Fail to fetch API");
  }

  return json.data;
}

// 所有分类数据
export const categoryList = async () => {
  const data = await fetchAPI(`
    query categoryList {
      Categories {
        name
        slug
      }
    }
  `);

  return data?.Categories;
};

// 首页数据
export const dataForHome = async (page = 1, short_limit = 6, long_limit = 12) => {
  const categories = await categoryList().then((res) => res.map((i) => i.slug));
  let data = [];
  categories.map(async (i, index) => {
    let { games, total } = await fetchAPI(
      `
      query ($category: String, $page: Int, $limit: Int) {
        games: Games (page: $page, limit: $limit, sort: "-featured", filter: { status: { _eq: "published" }, category: { slug: { _eq: $category } } }) {
          title
          slug
          appid
        }
        total: Games_aggregated ( filter: { category: { slug: { _eq: $category }, status: { _eq: "published" } }  }) {
          countDistinct { appid }
        }
      }
    `,
      {
        variables: {
          category: i,
          page: 1,
          limit: index === 1 || index === 3 ? short_limit : long_limit,
        },
      }
    );
    data.push({ category: i, games, total });
  });

  return {
    category: category[0].slug,
    games,
    total: dataForAll.Total[0].countDistinct.appid,
  };
};

// 分类页数据
export const dataByCategorySlug = async (slug, page = 1, limit = 20) => {
  const data = await fetchAPI(
    `
    query dataByCategorySlug ($slug: String, $limit: Int, $page: Int) {
      category: Categories (filter: { slug: { _eq: $slug } }) {
        name,
        slug,
        description
      }
      games : Games (filter: { category: { slug: { _eq: $slug } }, status: { _eq: "published" } }, page: $page, limit: $limit, sort: "-featured") {
        title
        appid
        slug
        rating
        category {
            name
            slug
        }
        featured
      }
      total: Games_aggregated (filter: { category: { slug: { _eq: $slug } }, status: { _eq: "published" } }) {
        countDistinct {
            appid
        }
      }
      }
    `,
    {
      variables: {
        slug: slug,
        limit: limit,
        page: page,
      },
    }
  );

  return {
    category: data.category[0],
    games: data.games,
    total: data.total[0].countDistinct.appid,
  };
};

// 所有游戏数据
export const getAllGamesWithSlug = async (limit = 100) => {
  const data = await fetchAPI(
    `
    query getAllGamesWithSlug ($limit: Int){
      Games (limit: $limit, filter: { status: { _eq: "published" } }) {
        slug
        category {
          slug
        }
      }
    }
    `,
    {
      variables: {
        limit: limit,
      },
    }
  );
  return data?.Games;
};

// 游戏详情数据（及相关游戏）
export const dataBySlug = async (slug, limit = 6) => {
  const data = await fetchAPI(
    `
    query dataBySlugAndRelated ($slug: String, $limit: Int) {
      game: Games (filter: { slug: { _eq: $slug } }) {
        title
        appid
        slug
        category { name, slug }
        description
        rating
        played
      }
      related: Games (filter: { slug: { _neq: $slug }, status: { _eq: "published" } }, sort: "-featured", limit: $limit) {
        title
        appid
        slug
        rating
        category { name, slug }
      }
    }
    `,
    {
      variables: {
        slug: slug,
        limit: limit,
      },
    }
  );
  return {
    game: data.game,
    related: data.related,
  };
};

// 获得总数
export const getTotal = async (category) => {
  let data;
  data = category
    ? await fetchAPI(
        `query ($slug: String) { total: Games_aggregated (filter: { category: { slug: { _eq: $slug } }, status: { _eq: "published" } }) { countDistinct { appid } } }`,
        { variables: { slug: category } }
      )
    : await fetchAPI(
        `query { total: Games_aggregated (filter: { status: { _eq: "published" } }) { countDistinct { appid } } }`
      );
  return data?.total[0].countDistinct.appid;
};
