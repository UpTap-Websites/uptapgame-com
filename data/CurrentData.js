import useSWR from "swr";
import { API_URL } from "../lib/constants";
import { repairData } from "../utils/generator";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useCurrentData(url = API_URL) {
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
