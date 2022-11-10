import { SITE_META } from "../lib/constants";
import Link from "next/link";
import Image from "next/future/image";
import Logo from "../public/brand/uptapgame-logo.svg";
export default function Footer() {
  return (
    <footer className="site-footer">
      <nav>
        <Link href={`/t/privacy-policy`}>
          <a>Privacy Policy</a>
        </Link>
        <Link href={`/t/terms-of-use`}>
          <a>Terms of Use</a>
        </Link>
      </nav>

      <div className="copyright">
        <Image
          className="h-10 w-auto"
          src={Logo}
          alt={SITE_META.NAME}
          width={170}
          height={30}
        />
        <p
          dangerouslySetInnerHTML={{
            __html: `Copyright &copy; ${new Date().getFullYear()} ${
              SITE_META.NAME
            }. All
          Rights Reserved`,
          }}
        />
      </div>
    </footer>
  );
}
