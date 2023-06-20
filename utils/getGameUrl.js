import { GAME_DOMAIN, GAME_PATH } from "@/lib/constants";

export default function getGameUrl(id) {
  return `${GAME_PATH}${id}`;
}
