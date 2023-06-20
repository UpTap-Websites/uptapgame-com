export default function ListTitle({ title, description }) {
  return (
    <header className="list-title">
      <h1 className={`${description ? "mb-2" : ""}`}>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}
