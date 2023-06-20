import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Navbar({ menuOpen, setMenuState }) {
  const Router = useRouter();
  const asPath = Router.asPath;

  console.log(`asPath:`, asPath);

  useEffect(() => {
    function handleStart() {
      setMenuState(false);
    }

    Router.events.on("routeChangeStart", handleStart);
    return () => {
      Router.events.off("routeChangeStart", handleStart);
    };
  }, [setMenuState, menuOpen, Router.events]);

  const navItems = [
    {
      text: `All`,
      link: `/all/`,
    },
    {
      text: `Puzzle`,
      link: `/category/puzzle/`,
    },
    {
      text: `Arcade`,
      link: `/category/arcade/`,
    },
    {
      text: `Shooting`,
      link: `/category/shooting/`,
    },
    {
      text: `Strategy`,
      link: `/category/strategy/`,
    },
    {
      text: `Sports`,
      link: `/category/sports/`,
    },
    {
      text: `Racing`,
      link: `/category/racing/`,
    },
    {
      text: `Match 3`,
      link: `/category/match-3/`,
    },
    {
      text: `Adventure`,
      link: `/category/adventure/`,
    },
    {
      text: `Simulation`,
      link: `/category/simulation/`,
    },
    {
      text: `Casual`,
      link: `/category/casual/`,
    },
    {
      text: `.IO`,
      link: `/category/io/`,
    },
    {
      text: `Girl`,
      link: `/category/girl/`,
    },
    {
      text: `Merge`,
      link: `/category/merge/`,
    },
    {
      text: `Action`,
      link: `/category/action/`,
    },
  ];

  return (
    <>
      {navItems &&
        navItems.map((item) => (
          <li key={item?.text}>
            <Link
              className={item.link === asPath || item.link === `${asPath}/` ? "current" : ""}
              href={item.link}
              title={item.text}
            >
              {item.text}
            </Link>
          </li>
        ))}
    </>
  );
}
