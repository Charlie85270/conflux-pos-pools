interface Header {
  name: string;
  key?: string;
}

interface HeaderProps {
  headers: Header[];
  sort?: { sort?: string; key?: string };
  setSort: (key?: string, sort?: string) => void;
}
export const TableHeader = ({ headers, sort, setSort }: HeaderProps) => {
  return (
    <tr>
      {headers.map((head, index) => {
        return (
          <th
            key={head.name + index}
            scope="col"
            className="p-6 text-xs font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            {head.name}
            {head.key &&
              (head.key === sort?.key ? (
                <button
                  className="dark:text-white"
                  onClick={() =>
                    setSort(sort.sort === "DESC" ? "ASC" : "DESC", head.key)
                  }
                >
                  {sort.sort === "DESC" ? (
                    <svg
                      fill="currentColor"
                      className="w-3 h-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="512px"
                      height="512px"
                      viewBox="-96 0 512 512"
                    >
                      <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z" />
                    </svg>
                  ) : (
                    <svg
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10px"
                      height="10px"
                      className="w-3 h-3"
                      viewBox="-96 0 512 512"
                    >
                      <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z" />
                    </svg>
                  )}
                </button>
              ) : (
                <button onClick={() => setSort("ASC", head.key)}>
                  <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12px"
                    height="12px"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17,14 C17.8092996,14 18.2680938,14.9010044 17.836059,15.5493995 L17.7682213,15.6401844 L12.7682213,21.6401844 C12.3950792,22.0879549 11.7283228,22.1178063 11.3160321,21.7297385 L11.2317787,21.6401844 L6.23177872,15.6401844 C5.71367776,15.0184632 6.11213562,14.0891988 6.88682851,14.0060047 L7,14 L17,14 Z M11.2317787,2.3598156 C11.6049208,1.91204508 12.2716772,1.88219371 12.6839679,2.2702615 L12.7682213,2.3598156 L17.7682213,8.3598156 C18.2863222,8.98153675 17.8878644,9.91080124 17.1131715,9.99399528 L17,10 L7,10 C6.19070043,10 5.73190618,9.09899556 6.16394105,8.45060047 L6.23177872,8.3598156 L11.2317787,2.3598156 Z" />
                  </svg>
                </button>
              ))}
          </th>
        );
      })}
    </tr>
  );
};
