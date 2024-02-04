import getIconUrl from "@/utils/getIconUrl";
import Image from "next/image";
import Link from "next/link";
import isRecommended from "@/utils/isRecommended";

export default function GameListItem({ item }) {
  return (
    <>
      {item && (
        <li>
          <Link
            className={isRecommended(item.appid) ? `hot` : ``}
            href={`/game/${item.slug}/`}
            title={item.title}
          >
            <Image src={getIconUrl(item.appid)} alt={item.title} width={200} height={200} />
            <span>{item.title}</span>
          </Link>
        </li>
      )}
    </>
  );
}
