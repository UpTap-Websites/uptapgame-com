import { Combobox, Dialog, Transition } from "@headlessui/react";

import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

import useCurrentData from "@/hooks/useGameData";

import getIconUrl from "@/utils/getIconUrl";

export default function SearchPanel({ isShow, updateState }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(isShow); // 控制显示
  const [query, setQuery] = useState("");

  // const searchData = useCurrentData();
  // console.log(
  //   `searchData: `,
  //   JSON.stringify(
  //     searchData?.data
  //       ?.map(
  //         (i) =>
  //           `/${i.appid.toLowerCase()} /${i.slug}/ 301\n/${i.appid.toLowerCase()}/ /${i.slug}/ 301`
  //       )
  //       .join(`\n`)
  //   )
  // );

  function handleClick() {
    updateState(!isOpen);
  }

  // let names = data;
  const names = useCurrentData();
  // const names = useGameData();
  // console.log(`tmp: `, tmp);

  // let names = repairData(tmp);

  console.log(`names: `, names);

  // let names = data.map((i) => ({
  //   id: i.id,
  //   category: i.category,
  //   name: toTitle(i.id),
  //   slug: toSlug(toTitle(i.id)),
  // }));

  // let categories = data.categories.map((i) => i.toLowerCase());

  const filteredGames = query
    ? names?.data
        ?.filter((i) => i.appid.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => (a.appid < b.appid ? 1 : -1))
        .sort((a, b) =>
          a.appid.toLowerCase().indexOf(query.toLowerCase()) >
          b.appid.toLowerCase().indexOf(query.toLowerCase())
            ? 1
            : -1
        )
    : [];

  // console.log(`data: `, data);
  return (
    <Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery("")}>
      <Dialog
        // open={isOpen}
        onClose={(setIsOpen, handleClick)}
        className="fixed inset-0 top-0 z-50 overflow-y-auto p-4  pt-[25vh]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            onChange={(game) => {
              setIsOpen(false);
              handleClick();
              // setQuery("");
              // `/game/${game.name}`
              // window.location.href = `/game/${game}`;
              router.push(`/game/${game}`);
            }}
            as="div"
            className="relative mx-auto max-w-xl divide-y overflow-hidden rounded-xl bg-white text-gray-800 placeholder-gray-400 shadow-2xl ring-1 ring-black/5"
          >
            <div className="flex items-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <Combobox.Input
                onChange={(event) => {
                  //
                  setQuery(event.target.value);
                }}
                className="w-full border-0 bg-transparent p-4 focus:border-0 focus:outline-none focus:ring-0"
                placeholder="Search..."
              />
            </div>
            {filteredGames?.length > 0 && (
              <Combobox.Options static className="max-h-96 overflow-y-auto py-4 text-sm">
                {filteredGames?.map((game) => (
                  <Combobox.Option key={game.appid} value={game.slug}>
                    {({ active }) => (
                      <div
                        className={`flex items-center space-x-1 px-4 py-2 ${
                          active ? `bg-indigo-600` : `bg-white`
                        }`}
                      >
                        <Image
                          className="mr-2 rounded-md"
                          src={getIconUrl(game.appid)}
                          width={30}
                          height={30}
                          alt={``}
                        />
                        <span className={`font-medium  ${active ? `text-white` : `text-gray-900`}`}>
                          {game.title} <pre className="text-xs">{game.category.name}</pre>
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && filteredGames?.length === 0 && (
              <p className="p-4 text-sm text-gray-500">No results found.</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
