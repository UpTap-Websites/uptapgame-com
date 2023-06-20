import useSWR from "swr";

const fetcher = async (url, query, { variables }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TEST_TOKEN}`,
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

  return data.games;
};

export default function useCurrentData(limit) {
  const url = `${process.env.NEXT_PUBLIC_API_TEST_URL}/graphql`;

  const query = `
    query ($limit: Int) {
      games (filter: { status: { _eq: "published" } }, limit: $limit) {
        title
        slug
        gid
        category { name }
      }
    }`;

  const variables = { limit: limit || -1 };

  const { data, error } = useSWR(url, () => fetcher(url, query, { variables }));

  // title, appid, slug, category.name

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
