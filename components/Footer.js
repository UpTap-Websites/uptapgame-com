import Image from "next/image";
import Logo from "@/public/images/uptapgame-logo.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <nav>
        <Link href={`/t/privacy-policy/`}>Privacy Policy</Link>
        <Link href={`/t/terms-of-use/`}>Terms of Use</Link>
      </nav>
      <Image className="logo" src={Logo} alt="Logo" />
      <p>{`Copyright © ${new Date().getFullYear()} UpTapGame. All Rights Reserved`}</p>
    </footer>
  );
}
