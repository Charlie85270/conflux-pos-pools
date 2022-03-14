import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const AppHeader = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="relative z-50 flex-none w-full px-4 mx-auto text-sm font-medium leading-6 text-gray-700 bg-white shadow dark:bg-gray-800 lg:px-0">
      <nav aria-label="Global" className="py-4 mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-start w-full dark:text-white md:justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 199 245"
            version="1.1"
          >
            <title>Conflux_Logo_Mark_Color</title>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Conflux_Logo_Mark_Color"
                transform="translate(0.000000, -0.000000)"
                fillRule="nonzero"
              >
                <polygon
                  id="Path"
                  fill="currentColor"
                  points="151.057838 145.949662 98.7961863 198.210803 69.7103803 169.125338 121.972032 116.863685 98.7291726 93.6209957 22.9712333 169.376384 98.5203077 244.923077 174.276376 169.167689"
                />
                <polygon
                  id="Path"
                  fill="#38A1DB"
                  points="197.693744 98.7101231 98.9858316 9.56888949e-05 0 98.9860017 0.31563441 145.252991 98.5658906 47.0051607 197.528761 145.971262"
                />
              </g>
            </g>
          </svg>
          <Link href="/">
            <a className="ml-2 text-xl text-black dark:text-gray-100 hover:text-gray-800 dark:hover:text-white">
              <span className="text-3xl font-bold text-blue-950">Conflux</span>{" "}
              PoS Validators
            </a>
          </Link>

          <div className="flex items-center justify-around w-full mt-4 sm:mt-0 sm:w-auto sm:ml-auto">
            <Link href="/report">
              <a className="text-lg text-gray-700 underline dark:text-gray-200 w-60 hover:text-black">
                Report a pool
              </a>
            </Link>
            <a
              href="https://github.com/Charlie85270/conflux-pos-pools"
              className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in rounded-lg shadow-md bg-blue-950 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              ADD MY POOL
            </a>
            <button
              id="theme-toggle"
              data-tooltip-target="tooltip-toggle"
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-500 ml-2 link focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              <svg
                id="theme-toggle-dark-icon"
                className={`w-5 h-5 ${theme === "dark" ? "hidden" : null}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
              <svg
                id="theme-toggle-light-icon"
                className={`w-5 h-5 ${theme === "dark" ? null : "hidden"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default AppHeader;
