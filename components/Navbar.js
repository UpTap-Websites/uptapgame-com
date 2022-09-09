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
      <div className="relative z-10 block">
        <Link href={`/`}>
          <a
            className={`${
              `/` == router.pathname ? `text-slate-600` : `text-slate-600/80`
            } shadow-[lg] absolute -left-4 -top-5 z-20 flex h-20 w-20 items-center justify-center rounded-[100%] bg-slate-200/80 shadow-stone-900 transition duration-500 ease-in-out md:top-3 md:left-3 md:backdrop-blur-sm md:hover:backdrop-blur-none`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </a>
        </Link>
        <button
          onClick={toggle}
          className="ml-auto flex h-10 w-10 items-center justify-center md:hidden"
        >
          {!isMenuOpen ? closeIcon() : menuIcon()}
        </button>
        <div
          className={`${
            !isMenuOpen ? `hidden md:block` : `block`
          } relative z-30 block p-3 md:z-10
          `}
        >
          <ul className="flex flex-wrap rounded-3xl bg-slate-800 p-2 capitalize shadow-lg shadow-slate-900/20 md:ml-3 md:mt-2 md:pl-20">
            <li
              className={`${
                `/all` == router.pathname
                  ? `border-slate-50/80 bg-slate-50/20 md:bg-slate-50/10 md:shadow-lg`
                  : `border-slate-50/20 bg-slate-50/10 md:border-slate-50/0 md:shadow-none`
              } m-1 rounded-xl border-2 md:bg-slate-50/0 xl:transition xl:duration-500 xl:ease-in-out xl:hover:bg-slate-50/10`}
            >
              <Link href={`/all`}>
                <a
                  className={`${
                    `/all` == router.pathname
                      ? `bg-slate-50/10 opacity-80`
                      : `opacity-50`
                  } block p-2 text-white`}
                >
                  All
                </a>
              </Link>
            </li>
            {list
              .slice()
              .sort()
              .map((category) => (
                <li
                  className={`${
                    category == current.slug
                      ? `border-slate-50/80 bg-slate-50/20 md:bg-slate-50/10 md:shadow-lg`
                      : `border-slate-50/20 bg-slate-50/10 md:border-slate-50/0 md:shadow-none`
                  } m-1 rounded-xl border-2 md:bg-slate-50/0 xl:transition xl:duration-500 xl:ease-in-out xl:hover:bg-slate-50/10`}
                  key={category}
                >
                  <Link href={`/category/${category.replace(/ /, "-")}`}>
                    <a
                      className={`${
                        category == current.slug
                          ? `bg-slate-50/10 opacity-80`
                          : `opacity-50`
                      } block p-2 text-white`}
                    >
                      {category.toLowerCase() == "io" ? "IO" : category}
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
