import ListItem from "./listItem";

export default function List({ items }) {
  return (
    <ul className="game-list">
      {items?.map((item) => <ListItem item={item} key={item.slug} />) ?? null}
    </ul>
  );
}
