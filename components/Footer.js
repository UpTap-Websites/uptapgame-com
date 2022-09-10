import { SITE_NAME } from "../lib/constants";
import Link from "next/link";
import Image from "next/future/image";
export default function Footer(params) {
  return (
    <div className="mt-3 bg-slate-600 text-center text-xs text-slate-100/40">
      <nav className="space-x-5 bg-slate-800/60 p-3">
        <Link href={`/t/privacy-policy`}>
          <a className="after-content-[|]">Privacy Policy</a>
        </Link>
        <Link href={`/t/terms-of-use`}>
          <a>Terms of Use</a>
        </Link>
      </nav>

      <div className="flex flex-col justify-center py-7">
        <Image
          className="h-10 w-auto"
          src="/brand/uptapgame-logo.svg"
          alt={SITE_NAME}
          width={170}
          height={30}
        />
        <p>
          Copyright &copy; {new Date().getFullYear()} {SITE_NAME}. All Rights
          Reserved
        </p>
      </div>
    </div>
  );
}
