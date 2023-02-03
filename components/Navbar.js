import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { closeIcon, menuIcon } from "./Icons";

export default function Navbar({ list, isOpen }) {
  const router = useRouter();
  const current = router.query;
  const [isMenuOpen, setMenuOpen] = useState(isOpen);

  function toggle() {
    setMenuOpen(!isMenuOpen);
  }

  // console.log(current);
  // console.log(router.pathname);

  return (
    <nav>
      <div className="relative block">
        <Link
          href={`/`}
          className={`${`/` == router.pathname ? `text-slate-600` : `text-slate-600/80`} home-icon`}
          passHref
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>
        <button className="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 text-gray-600 lg:h-8 lg:w-8 lg:text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        <button onClick={toggle} className="menu-icon">
          {!isMenuOpen ? closeIcon() : menuIcon()}
        </button>
        <div className={`${!isMenuOpen ? `hidden md:block` : `block`} relative block p-3`}>
          <ul className="nav-list">
            <li className={`${`/all` == router.pathname ? `current` : `normal`}`}>
              <Link href={`/all`}>All</Link>
            </li>
            {list.sort().map((category) => (
              <li className={`${category == current.slug ? `current` : `normal`}`} key={category}>
                <Link href={`/category/${category.replace(/ /, "-")}`}>
                  {category.toLowerCase() == "io" ? "IO" : category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
