import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function useGameData() {
  // const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
  const url = `${process.env.NEXT_PUBLIC_API_V2_URL}/items/game?fields=appid,title,slug,category.name,category.slug&limit=-1&filter[status][_eq]=published`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  const games = data?.data;

  // console.log(`games: `, games);

  return {
    data: games,
    isLoading,
    isError: error,
  };
}
