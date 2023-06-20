"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default async function Navbar({ navItems }) {
  const pathname = usePathname();
  // const isHomepage = pathname === "/";
  const isAllPage = pathname === "/all";
  return (
    <nav className="grow">
      <ul className="nav-list hidden">
        <li>
          <a className={isAllPage ? `current` : ``} href={`/all`}>
            All
          </a>
        </li>
        {navItems &&
          navItems.map((item) => {
            const isActive = pathname.startsWith(`/category/${item.slug}`);
            return (
              <li key={item.slug}>
                <Link className={isActive ? `current` : ``} href={`/category/${item.slug}`}>
                  {item.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
