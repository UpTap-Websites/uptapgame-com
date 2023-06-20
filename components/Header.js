import iconClose from "@/public/images/icon-close.svg";
import iconMenu from "@/public/images/icon-menu.svg";
// import iconHome from "@/public/images/icon-home.svg";
import iconHomeB from "@/public/images/icon-home-b.svg";
import iconSearch from "@/public/images/icon-search.svg";
import iconSearchB from "@/public/images/icon-search-b.svg";
import Image from "next/image";

import SearchPanel from "./SearchPanel";

import Navbar from "./Navbar";

import { useState } from "react";
import Link from "next/link";

export default function Header({ navItems }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function updateSearchState(newState) {
    setShowSearch(newState);
  }
  function updateMenuState(newState) {
    setMenuOpen(newState);
  }

  return (
    <header className="site-header">
      <Link className="site-branding" href={`/`}>
        <Image className="w-6 h-6" src={iconHomeB} alt="Logo" />
        <span className="sr-only">Home</span>
      </Link>
      <button className="menu-btn" onClick={toggleMenu}>
        {!menuOpen ? (
          <Image className="icon-menu w-6 h-6" src={iconMenu} alt="Menu" />
        ) : (
          <Image className="icon-close w-6 h-6" src={iconClose} alt="Close" />
        )}
      </button>
      <nav className="grow">
        <ul className={`nav-list ${menuOpen ? "grid" : "hidden"}`}>
          <Navbar items={navItems} menuOpen={menuOpen} setMenuState={updateMenuState} />
        </ul>
      </nav>

      <button className="search-btn" onClick={() => setShowSearch(!showSearch)}>
        <Image src={iconSearch} className="hidden xl:h-8 xl:w-8 xl:block" alt="" />
        <Image src={iconSearchB} className="h-6 w-6 xl:hidden" alt="" />
      </button>

      {showSearch && <SearchPanel isShow={showSearch} updateState={updateSearchState} />}
    </header>
  );
}
