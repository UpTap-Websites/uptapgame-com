import Link from "next/link";
export default function CategoryList({ title, categories, icon }) {
  const categoryList = categories.map((category, index) => (
    <li key={index} className="mx-1 mb-2 capitalize xl:mx-2">
      <Link href={`/category/${category.replace(/ /, "-")}`}>
        <a className="block rounded-full bg-slate-600/80 py-1 px-2 text-sm text-slate-100/60 shadow-md shadow-slate-900/30 md:py-2 md:px-3 xl:transition xl:duration-300 xl:ease-in-out xl:hover:scale-110">
          {category.toLowerCase() === "io" ? "IO" : category}
        </a>
      </Link>
    </li>
  ));
  if (categories.length != 0)
    if (title === undefined) {
      return (
        <>
          <ul className="flex space-x-3 p-4">{categoryList}</ul>
        </>
      );
    } else {
      return (
        <>
          <h2 className="flex items-center space-x-2 px-3 py-2 pb-0 font-semibold text-slate-600 md:text-sm xl:px-8 xl:pb-1 xl:text-xl">
            {icon}
            <span>{title}</span>
          </h2>
          <ul className="flex flex-wrap px-1 py-2 xl:py-4 xl:px-6">
            {categoryList}
          </ul>
        </>
      );
    }
  else {
    return <></>;
  }
}
