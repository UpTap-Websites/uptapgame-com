import Link from "next/link";
import Navbar from "./navbar";
import Image from "next/image";
import iconHome from "@/public/images/icon-home-b.svg";
import iconMenu from "@/public/images/icon-menu.svg";
import iconSearch from "@/public/images/icon-search.svg";
import iconSearchBlack from "@/public/images/icon-search-b.svg";
import iconClose from "@/public/images/icon-close.svg";

export default function Header({ navItems }) {
  return (
    <header className="site-header">
      <Link className="site-branding" href="/">
        <Image className="w-6 h-6" src={iconHome} width={24} height={24} alt="Logo" />
        <span className="sr-only">Home</span>
      </Link>
      <button className="menu-btn">
        <Image className="icon-menu w-6 h-6" src={iconMenu} width={24} height={24} alt="" />
        <Image
          className="icon-close w-6 h-6 hidden"
          src={iconClose}
          width={24}
          height={24}
          alt=""
        />
      </button>

      <Navbar navItems={navItems} />

      <button className="search-btn">
        <Image
          className="hidden xl:h-8 xl:w-8 xl:block"
          src={iconSearch}
          width={24}
          height={24}
          alt=""
        />
        <Image className="h-6 w-6 xl:hidden" src={iconSearchBlack} width={24} height={24} alt="" />
      </button>
    </header>
  );
}
