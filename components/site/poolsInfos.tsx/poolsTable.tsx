import { format } from "js-conflux-sdk";
import React, { useEffect, useState } from "react";
import { UseConflux } from "../../../hooks/useConflux";
import { formatBalance } from "../../../utils";
import { Pagination } from "./pagination";
import { abi } from "../../../abi";
import { reqContract } from "../../../services/httpReq";

const ONE_VOTE_CFX = 1000;
const pageSize = 50;
interface PoolsInfosApi {
  status?: string | null;
  name: string;
  verified?: boolean;
  totalLocked?: string | null;
  totalRevenue?: string | null;
  apy?: number | null;
  stakerNumber?: string | null;
  posAddress?: string;
  adress?: string;
  link: string;
  abi?: any;
  image?: string;
}
export function PoolsTable({ pools }: { pools: PoolsInfosApi[] }) {
  const [activePage, setActivePage] = useState(1);
  const [sort, setSort] = useState<{ key: string; sort?: string }>({ key: "" });
  const [poolsInfo, setPoolsInfos] = useState<PoolsInfosApi[]>(pools);

  const applySort = (sort, key) => {
    setSort({ key, sort });
  };

  useEffect(() => {
    const newPools = [...pools].splice(
      activePage === 1 ? 0 : activePage * pageSize - 1,
      activePage * pageSize
    );

    setPoolsInfos(newPools);

    newPools.forEach(async (pool, index) => {
      try {
        const { conflux } = UseConflux();
        const contract = conflux.Contract({
          abi: abi,
          address: newPools[index].adress,
        });

        const contractInfo = await reqContract(newPools[index].adress);
        // @ts-ignore
        const adr = await contract.posAddress();
        const account = await conflux.pos.getAccount(format.hex(adr));
        const status = account.status;
        // @ts-ignore
        const poolSummary = await contract.poolSummary();
        // @ts-ignore
        const apy = await contract.poolAPY();
        // @ts-ignore
        const staker = await contract.stakerNumber();

        newPools[index] = {
          ...pool,
          verified: contractInfo?.verify?.exactMatch || false,
          totalLocked: poolSummary[0],
          posAddress: format.hex(adr),
          totalRevenue: poolSummary[2],
          apy: Number(apy) / 100,
          stakerNumber: staker[0],
          status:
            status.availableVotes && status.availableVotes > 0
              ? "Active"
              : "Inactive",
        };

        setPoolsInfos([...newPools]);
      } catch (_) {
        newPools[index] = {
          ...pool,
          totalLocked: null,
          totalRevenue: null,
          verified: false,
          posAddress: null,
          apy: null,
          stakerNumber: null,
          status: "Inactive",
        };
        setPoolsInfos([...newPools]);
      }
    });
  }, [activePage]);

  useEffect(() => {
    setPoolsInfos([
      ...poolsInfo.sort((poolA, poolB) =>
        sort.sort === "DESC"
          ? poolA[sort.key] - poolB[sort.key]
          : poolB[sort.key] - poolA[sort.key]
      ),
    ]);
  }, [sort]);

  const headers = [
    {
      name: "",
      sort: "ASC",
    },
    {
      name: "Name",
      sort: "ASC",
    },
    {
      name: "Adress",
      sort: "ASC",
    },
    {
      name: "Staking Vault",
      key: "totalLocked",
      sort: "ASC",
    },
    {
      name: "Total CFX earned",
      key: "totalRevenue",
      sort: "ASC",
    },
    {
      name: "Staker",
      key: "stakerNumber",
      sort: "ASC",
    },
    {
      name: "APY",
      key: "apy",
      sort: "ASC",
    },
    {
      name: "",
      sort: "ASC",
    },
  ];

  return (
    <div className="inline-block w-full min-w-full overflow-auto rounded-lg shadow md:overflow-hidden">
      <table className="min-w-full leading-normal" key={sort.sort}>
        <thead>
          <PoolHeader sort={sort} setSort={applySort} headers={headers} />
        </thead>
        <tbody>
          {poolsInfo.map((pool, index) => {
            return (
              <tr key={pool.stakerNumber + pool.adress || pool.name}>
                <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                  <div className="flex items-center">
                    {pool.image && <img src={pool.image} className="w-8" />}
                  </div>
                </td>
                <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                  <div className="flex items-center">
                    <a
                      target="_blank"
                      href={pool.link}
                      className="text-blue-500 whitespace-no-wrap hover:underline"
                    >
                      {pool.name}
                    </a>
                  </div>
                </td>
                <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                  <p className="text-blue-500 whitespace-no-wrap hover:underline">
                    {!pool.posAddress ? (
                      Cell(pool.posAddress)
                    ) : (
                      <a
                        target="_blank"
                        href={`https://confluxscan.io/pos/accounts/${pool.posAddress}`}
                      >
                        {pool.posAddress.slice(0, 10)}...
                      </a>
                    )}
                  </p>
                </td>
                <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                  {Cell(
                    pool.totalLocked
                      ? formatBalance(
                          BigInt(pool.totalLocked) *
                            BigInt(ONE_VOTE_CFX) *
                            BigInt("1000000000000000000")
                        )
                      : pool.totalLocked
                  )}
                </td>
                <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {Cell(formatBalance(pool.totalRevenue))}
                  </p>
                </td>
                <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {Cell(pool.stakerNumber)}
                  </p>
                </td>
                <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                  <p className="font-bold text-gray-900 whitespace-no-wrap">
                    {Cell(pool.apy ? pool.apy + " %" : pool.apy)}
                  </p>
                </td>
                <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                  {!!!pool.status ? (
                    Cell(pool.status)
                  ) : (
                    <>
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                          pool.status === "Active"
                            ? "text-green-900"
                            : "text-red-900"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute inset-0 ${
                            pool.status === "Active"
                              ? "bg-green-200"
                              : "bg-red-200"
                          } rounded-full opacity-50`}
                        ></span>
                        <span className="relative">{pool.status}</span>
                      </span>
                      {Alert(pool)}
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
        <Pagination
          activePage={activePage}
          onPageChange={setActivePage}
          pageSize={pageSize}
          itemsLength={pools.length}
        />
      </div>
    </div>
  );
}

const Alert = (pool: PoolsInfosApi) => {
  return (
    <div className="tooltip">
      <span
        className={`relative inline-block px-3 py-1 ml-2 font-semibold leading-tight ${
          pool.verified ? "text-white" : "text-yellow-600 tooltip"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-0 ${
            pool.verified ? "bg-green-400 " : "bg-yellow-400 "
          } rounded-full opacity-50`}
        ></span>
        <span className="relative">{pool.verified ? "i" : "!"}</span>
      </span>

      <span className="tooltiptext">
        {pool.verified
          ? "The contract of this pool is verified on Conflux Scan"
          : "The contract of this pool isn't verified on Conflux Scan"}
      </span>
    </div>
  );
};

const Cell = value => {
  if (value === null) {
    return <span className="text-gray-900 whitespace-no-wrap">--</span>;
  }

  return value ? (
    <span className="text-gray-900 whitespace-no-wrap">{value}</span>
  ) : (
    <span className="block w-16 h-6 bg-gray-200 rounded animate-pulse"></span>
  );
};

interface Header {
  name: string;
  key?: string;
}

interface Props {
  headers: Header[];
  sort?: { sort?: string; key?: string };
  setSort: (key?: string, sort?: string) => void;
}
const PoolHeader = ({ headers, sort, setSort }: Props) => {
  return (
    <tr>
      {headers.map((head, index) => {
        return (
          <th
            key={head.name + index}
            scope="col"
            className="p-6 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
          >
            {head.name}
            {head.key &&
              (head.key === sort?.key ? (
                <button
                  onClick={() =>
                    setSort(sort.sort === "DESC" ? "ASC" : "DESC", head.key)
                  }
                >
                  {sort.sort === "DESC" ? (
                    <svg
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
