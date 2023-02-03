import GameListItem from "./GameListItem";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ScrollGameList({
  title,
  games,
  icon,
  cols,
  className,
  init = 12,
  step = 4,
}) {
  const setCol = () => {
    if (cols == "2") return `grid-cols-2`;
    else if (cols == "3") return `grid-cols-3`;
    else if (cols == "5") return `grid-cols-5`;
    else return `grid-cols-4`;
  };
  const initGames = games.slice(0, init);

  const [scrollGames, setScrollGames] = useState(initGames);
  const [hasMore, setHasMore] = useState(true);

  const getMoreGames = () => {
    const newGames = games.slice(scrollGames.length, scrollGames.length + step);
    setScrollGames((game) => [...game, ...newGames]);

    if (scrollGames.length >= games.length) setHasMore(!hasMore);
  };

  if (games.length != 0) {
    return (
      <>
        {title !== undefined ? (
          <h2 className="flex items-center space-x-2 px-3 py-2 pb-0 font-semibold text-slate-600 md:text-sm xl:px-8 xl:pb-1 xl:text-xl">
            {icon}
            <span>
              {title} {games.length > 30 ? <span>({games.length})</span> : ``}
            </span>
          </h2>
        ) : (
          ``
        )}
        <InfiniteScroll
          style={{ overflow: "visible" }}
          dataLength={scrollGames.length}
          next={getMoreGames}
          hasMore={hasMore}
          loader={
            <div
              className="text-md m-3 mx-auto w-auto animate-pulse p-4 text-center"
              onClick={getMoreGames}
            >
              <span className="cursor-pointer rounded-lg bg-slate-200 p-4">Load More</span>
            </div>
          }
        >
          <ul
            className={`grid overflow-visible ${setCol()} gap-4 p-4 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 xl:gap-6 xl:py-4 xl:px-8 2xl:grid-cols-12`}
          >
            <GameListItem games={scrollGames} className={className} />
          </ul>
        </InfiniteScroll>
      </>
    );
  } else {
    return <></>;
  }
}
