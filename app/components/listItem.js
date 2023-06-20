import Image from "next/image";
import Link from "next/link";
import getIconUrl from "../utils/getIconUrl";
import isRecommended from "../utils/isRecommended";

export default function ListItem({ item }) {
  return (
    <li>
      <Link className={isRecommended(item.gid) ? `hot` : ``} href={`/game/${item.slug}`}>
        <Image src={getIconUrl(item.gid)} alt={item.title} width={200} height={200} />
        <span>{item.title}</span>
      </Link>
    </li>
  );
}
