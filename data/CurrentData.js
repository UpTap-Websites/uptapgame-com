import useSWR from "swr";
import { UPTAP_API } from "../lib/constants";
// import { repairData } from "../utils/generator";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useCurrentData(url = UPTAP_API) {
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
