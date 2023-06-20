import { RECOMMEND_GAMES, RECOMMEND_CATEGORIES } from "@/lib/constants";
export default function isRecommended(id) {
  return RECOMMEND_GAMES.includes(id) || RECOMMEND_CATEGORIES.includes(id);
}
