import React from "react";
export function PosCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title?: string;
  value: string;
  subtitle?: string;
  icon: string;
}) {
  return (
    <div>
      <div className="flex items-center">
        {getIcon(icon)}

        <p className="ml-2 text-black text-md dark:text-white">{title}</p>
      </div>
      <div className="flex justify-start">
        <p className="mt-4 mb-2 text-2xl font-bold text-left text-gray-700 dark:text-gray-100">
          {value}
        </p>
        {subtitle && (
          <div className="flex items-center text-sm text-green-500">
            <span className="text-gray-400">{subtitle}</span>
          </div>
        )}
      </div>
    </div>
  );
}

const getIcon = (icon: string) => {
  switch (icon) {
    case "percent":
      return (
        <span className="relative p-4 bg-green-200 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            fill="currentColor"
            height="40"
            className="absolute h-4 text-green-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="5" x2="5" y2="19" />
            <circle cx="6.5" cy="6.5" r="2.5" />
            <circle cx="17.5" cy="17.5" r="2.5" />
          </svg>
        </span>
      );
    case "bloc":
      return (
        <span className="relative p-4 bg-gray-200 rounded-xl">
          <svg
            width="40"
            fill="currentColor"
            height="40"
            className="absolute h-4 text-gray-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            viewBox="0 0 36 36"
            version="1.1"
            preserveAspectRatio="xMidYMid meet"
          >
            <title>block-solid</title>
            <path d="M31.42,9.09l-13-6a1,1,0,0,0-.84,0l-13,6A1,1,0,0,0,4,10V27a1,1,0,0,0,.58.91l13,6a1,1,0,0,0,.84,0l13-6A1,1,0,0,0,32,27V10A1,1,0,0,0,31.42,9.09ZM18,14.9,7.39,10,18,5.1,28.61,10ZM30,26.36,19,31.44V16.64l11-5.08Z" />
            <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
          </svg>
        </span>
      );

    case "time":
      return (
        <span className="relative p-4 bg-gray-200 rounded-xl">
          <svg
            width="40"
            fill="currentColor"
            height="40"
            className="absolute h-4 text-gray-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            viewBox="0 0 488.898 488.898"
          >
            <g>
              <g>
                <path d="M487.247,218.699c-17.9-168.2-171.6-228.2-269.4-217.5c-72.9,8-137.3,47.9-177.9,109.2c-6.2,9.4-4.2,21.8,5.2,28.1    s21.8,3.1,28.1-6.2c34.3-51,88.4-84.3,148.8-90.5c103.6-10.7,203.6,52.4,224.7,181c15.5,94.4-58.6,212.6-181,224.7    c-74.6,7.4-147.3-25.9-189.4-86.5l38.5,8.5c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-81.1-17.7    c-5.2-1-22-0.4-25,15.6l-16.6,82.2c-2.1,10.4,4.2,21.8,15.6,23.9c13,1.1,21.8-6.2,23.9-16.6l6.2-28.2    c79.5,111.3,215.3,99.8,223.7,99C400.047,475.399,503.047,366.099,487.247,218.699z" />
                <path d="M260.447,129.199c-11.4,0-20.8,9.4-20.8,20.8v94.7c0,5.2,2.1,10.4,6.2,14.6l94.7,94.7c12.2,11.6,25,4.2,30.2,1    c8.3-8.3,8.3-20.8,0-29.1l-89.5-89.5v-86.3C281.347,138.599,271.947,129.199,260.447,129.199z" />
              </g>
            </g>
          </svg>
        </span>
      );

    case "node":
      return (
        <span className="relative p-4 bg-purple-200 rounded-xl">
          <svg
            width="40"
            fill="currentColor"
            height="40"
            className="absolute h-4 text-purple-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            viewBox="0 0 1024 1024"
          >
            <defs>
              <style type="text/css" />
            </defs>
            <path
              d="M843.5 737.4c-12.4-75.2-79.2-129.1-155.3-125.4S550.9 676 546 752c-153.5-4.8-208-40.7-199.1-113.7 3.3-27.3 19.8-41.9 50.1-49 18.4-4.3 38.8-4.9 57.3-3.2 1.7 0.2 3.5 0.3 5.2 0.5 11.3 2.7 22.8 5 34.3 6.8 34.1 5.6 68.8 8.4 101.8 6.6 92.8-5 156-45.9 159.2-132.7 3.1-84.1-54.7-143.7-147.9-183.6-29.9-12.8-61.6-22.7-93.3-30.2-14.3-3.4-26.3-5.7-35.2-7.2-7.9-75.9-71.5-133.8-147.8-134.4-76.3-0.6-140.9 56.1-150.1 131.9s40 146.3 114.2 163.9c74.2 17.6 149.9-23.3 175.7-95.1 9.4 1.7 18.7 3.6 28 5.8 28.2 6.6 56.4 15.4 82.4 26.6 70.7 30.2 109.3 70.1 107.5 119.9-1.6 44.6-33.6 65.2-96.2 68.6-27.5 1.5-57.6-0.9-87.3-5.8-8.3-1.4-15.9-2.8-22.6-4.3-3.9-0.8-6.6-1.5-7.8-1.8l-3.1-0.6c-2.2-0.3-5.9-0.8-10.7-1.3-25-2.3-52.1-1.5-78.5 4.6-55.2 12.9-93.9 47.2-101.1 105.8-15.7 126.2 78.6 184.7 276 188.9 29.1 70.4 106.4 107.9 179.6 87 73.3-20.9 119.3-93.4 106.9-168.6zM329.1 345.2c-46 0-83.3-37.3-83.3-83.3s37.3-83.3 83.3-83.3 83.3 37.3 83.3 83.3-37.3 83.3-83.3 83.3zM695.6 845c-46 0-83.3-37.3-83.3-83.3s37.3-83.3 83.3-83.3 83.3 37.3 83.3 83.3-37.3 83.3-83.3 83.3z"
              p-id="12712"
            />
          </svg>
        </span>
      );

    case "lock":
      return (
        <span className="relative p-4 bg-blue-200 rounded-xl">
          <svg
            width="40"
            fill="currentColor"
            height="40"
            className="absolute h-4 text-blue-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m432,224h-48v-96c0-70.578-57.422-128-128-128s-128,57.422-128,128v96h-48c-8.836,0-16,7.164-16,16v256c0,8.836 7.164,16 16,16h352c8.836,0 16-7.164 16-16v-256c0-8.836-7.164-16-16-16zm-272-96c0-52.938 43.063-96 96-96s96,43.063 96,96v96h-16v-96c0-44.109-35.891-80-80-80s-80,35.891-80,80v96h-16v-96zm48,96v-96c0-26.469 21.531-48 48-48 26.469,0 48,21.531 48,48v96h-96zm208,256h-320v-224h320v224z" />
              <path d="m256,304.002c-17.673,0-32,14.326-32,32 0,11.814 6.476,22.018 16,27.561v36.439c0,8.836 7.163,16 16,16 8.837,0 16-7.164 16-16v-36.439c9.524-5.543 16-15.747 16-27.561 0-17.674-14.327-32-32-32z" />
            </g>
          </svg>
        </span>
      );
    case "token":
      return (
        <span className="relative p-4 bg-yellow-200 rounded-xl">
          <svg
            width="40"
            fill="currentColor"
            height="40"
            className="absolute h-4 text-yellow-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            viewBox="0 0 512 512"
          >
            <path d="M256 117c-65.2 0-124.2 11.6-166.13 29.7-20.95 9.1-37.57 19.8-48.57 31.1S25 200.4 25 212c0 11.6 5.3 22.9 16.3 34.2 11 11.3 27.62 22 48.57 31.1C131.8 295.4 190.8 307 256 307c65.2 0 124.2-11.6 166.1-29.7 21-9.1 37.6-19.8 48.6-31.1S487 223.6 487 212c0-11.6-5.3-22.9-16.3-34.2-11-11.3-27.6-22-48.6-31.1C380.2 128.6 321.2 117 256 117zM25 255.1v50.2c0 6.3 5.3 17.6 16.3 28.9 11 11.3 27.62 22 48.57 31.1C131.8 383.4 190.8 395 256 395c65.2 0 124.2-11.6 166.1-29.7 21-9.1 37.6-19.8 48.6-31.1s16.3-22.6 16.3-28.9v-50.2c-1.1 1.3-2.2 2.5-3.4 3.7-13.3 13.6-31.8 25.3-54.3 35-45 19.5-106 31.2-173.3 31.2-67.3 0-128.3-11.7-173.28-31.2-22.49-9.7-41.01-21.4-54.3-35-1.19-1.2-2.32-2.5-3.42-3.7z" />
          </svg>
        </span>
      );
  }
};
