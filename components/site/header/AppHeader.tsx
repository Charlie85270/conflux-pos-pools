import React from "react";
import Link from "next/link";

const AppHeader = () => {
  return (
    <header className="relative z-50 flex-none w-full px-4 mx-auto text-sm font-medium leading-6 text-gray-700 bg-white shadow lg:px-0">
      <nav aria-label="Global" className="py-4 mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-start w-full md:justify-between">
          <img src="/images/conflux.png" className="w-12"></img>
          <Link href="/">
            <a className="text-xl text-black hover:text-gray-800">
              <span className="text-3xl font-bold text-blue-500">Conflux</span>{" "}
              PoS Validators
            </a>
          </Link>

          <div className="flex items-center justify-around w-full mt-4 sm:mt-0 sm:w-auto sm:ml-auto">
            <Link href="/report">
              <a className="w-48 text-lg text-gray-700 underline hover:text-black">
                Report a pool
              </a>
            </Link>
            <button
              type="button"
              className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              ADD MY POOL
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default AppHeader;
