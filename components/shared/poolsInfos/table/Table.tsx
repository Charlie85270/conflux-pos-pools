import { format } from "js-conflux-sdk";
import React, { useEffect, useState } from "react";
import { UseConflux } from "../../../../hooks/useConflux";
import {
  formatBalance,
  getAbi,
  getCustomPoolsInfos,
  isZeroAddress,
} from "../../../../utils";
import { Pagination } from "./pagination/Pagination";
import { abi } from "../../../../abi";
import { reqContract } from "../../../../services/httpReq";
import { PoolAlert } from "../../alert/PoolAlert";
import { TableHeader } from "./header/Header";
import { getPoolsInfos } from "../../../../utils/contractInfos";

const ONE_VOTE_CFX = 1000;
const pageSize = 50;
export interface PoolsInfosApi {
  status?: string | null;
  name: string;
  verified?: boolean;
  isZero?: boolean;
  totalLocked?: string | null;
  totalRevenue?: string | null;
  apy?: number | null;
  stakerNumber?: string | null;
  fees?: number | null;
  posAddress?: string;
  owner?: string;
  adress: string;
  link: string;
  abi?: any;
  image?: string;
  trusted?: boolean;
  customContract?: string;
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
      const { conflux } = UseConflux();
      try {
        const contract = conflux.Contract({
          abi: await getAbi(newPools[index].customContract),
          address: newPools[index].adress,
        });

        const {
          owner,
          contractInfo,
          isZero,
          fees,
          adr,

          status,
          posAddress,
          verified,
          totalLocked,
          totalRevenue,
          apy,
          staker,
        } = await getPoolsInfos(newPools[index], contract, conflux);

        newPools[index] = {
          ...pool,
          verified,
          totalLocked,
          posAddress,
          isZero,
          totalRevenue,
          owner,
          fees,
          apy,
          stakerNumber: staker,
          status:
            status?.availableVotes && status.availableVotes > 0
              ? "Active"
              : "Inactive",
        };

        setPoolsInfos([...newPools]);
      } catch (error) {
        console.error(`[ERROR] Pool ${pool.name} : ${error}`);

        newPools[index] = {
          ...pool,
          totalLocked: null,
          totalRevenue: null,
          verified: false,
          fees: null,
          posAddress: undefined,
          apy: null,
          stakerNumber: null,
          status: "Inactive",
        };
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
    },
    {
      name: "Name",
    },
    {
      name: "Address",
    },
    {
      name: "Total CFX staked",
      key: "totalLocked",
    },
    {
      name: "Total CFX earned",
      key: "totalRevenue",
    },
    {
      name: "Stakers",
      key: "stakerNumber",
    },
    {
      name: "Fees",
      key: "fees",
    },
    {
      name: "APY",
      key: "apy",
    },
    {
      name: "",
    },
  ];

  return (
    <div className="inline-block w-full min-w-full overflow-auto rounded-lg shadow md:overflow-hidden">
      <table className="min-w-full leading-normal" key={sort.sort}>
        <thead>
          <TableHeader sort={sort} setSort={applySort} headers={headers} />
        </thead>
        <tbody>
          {poolsInfo.map((pool, _) => {
            return (
              <tr key={pool.stakerNumber + pool.adress || pool.name}>
                <td className="pl-4 text-lg bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                  <div className="relative flex items-center">
                    {pool.image && <img src={pool.image} className="w-8" />}
                  </div>
                </td>
                <td className="px-5 py-5 text-lg bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center">
                    <a
                      target="_blank"
                      href={pool.link}
                      className="text-blue-500 whitespace-no-wrap dark:text-blue-400 hover:underline"
                    >
                      {pool.name}
                    </a>
                  </div>
                </td>

                {!pool.posAddress ? (
                  Cell(pool.posAddress)
                ) : (
                  <td className="px-5 py-5 text-lg bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex flex-col">
                      <a
                        className="flex items-center gap-2 text-blue-500 whitespace-no-wrap dark:text-blue-400 hover:underline"
                        target="_blank"
                        href={`https://confluxscan.io/pos/accounts/${pool.posAddress}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 100 100"
                          fill="currentColor"
                        >
                          <path d="M49,18.92A23.74,23.74,0,0,0,25.27,42.77c0,16.48,17,31.59,22.23,35.59a2.45,2.45,0,0,0,3.12,0c5.24-4.12,22.1-19.11,22.1-35.59A23.74,23.74,0,0,0,49,18.92Zm0,33.71a10,10,0,1,1,10-10A10,10,0,0,1,49,52.63Z" />
                        </svg>
                        {pool.posAddress.slice(0, 10)}...
                      </a>
                      <a
                        className="flex items-center gap-2 text-sm text-blue-500 whitespace-no-wrap dark:text-blue-400 hover:underline"
                        target="_blank"
                        href={`https://confluxscan.io/address/${pool.adress}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          id="Artwork"
                          x="0px"
                          y="0px"
                          viewBox="0 0 512 512"
                          width="15"
                          fill="currentColor"
                          enable-background="new 0 0 512 512"
                        >
                          <g>
                            <path d="M363.4,66.5H252.1c-6.8,0-12.3,5.5-12.3,12.3S245.3,91,252.1,91h111.3c6.8,0,12.3-5.5,12.3-12.3S370.2,66.5,363.4,66.5z" />
                            <circle cx="161.2" cy="78.8" r="12.6" />
                            <path d="M363.4,176.8H252.1c-6.8,0-12.3,5.5-12.3,12.3c0,6.8,5.5,12.3,12.3,12.3h111.3c6.8,0,12.3-5.5,12.3-12.3   C375.7,182.3,370.2,176.8,363.4,176.8z" />
                            <circle cx="161.2" cy="189.1" r="12.6" />
                            <path d="M57.7,296.3v6.1c0,35.5,28.9,64.3,64.3,64.3h268c35.5,0,64.3-28.9,64.3-64.3v-6.1c0-21.4-10.6-40.4-26.7-52.1   c16.2-11.7,26.7-30.7,26.7-52.1V186c0-21.4-10.6-40.4-26.7-52.1c16.2-11.7,26.7-30.7,26.7-52.1v-6.1c0-35.5-28.9-64.3-64.3-64.3   H122c-35.5,0-64.3,28.9-64.3,64.3v6.1c0,21.4,10.6,40.4,26.7,52.1c-16.2,11.7-26.7,30.7-26.7,52.1v6.1c0,21.4,10.6,40.4,26.7,52.1   C68.2,255.9,57.7,274.9,57.7,296.3z M82.2,81.8v-6.1c0-22,17.9-39.8,39.8-39.8h268c22,0,39.8,17.9,39.8,39.8v6.1   c0,22-17.9,39.8-39.8,39.8H122C100,121.7,82.2,103.8,82.2,81.8z M82.2,192.1V186c0-22,17.9-39.8,39.8-39.8h268   c22,0,39.8,17.9,39.8,39.8v6.1c0,22-17.9,39.8-39.8,39.8H122C100,232,82.2,214.1,82.2,192.1z M82.2,296.3c0-22,17.9-39.8,39.8-39.8   h268c22,0,39.8,17.9,39.8,39.8v6.1c0,22-17.9,39.8-39.8,39.8H122c-22,0-39.8-17.9-39.8-39.8V296.3z" />
                            <path d="M252.1,311.6h111.3c6.8,0,12.3-5.5,12.3-12.3c0-6.8-5.5-12.3-12.3-12.3H252.1c-6.8,0-12.3,5.5-12.3,12.3   C239.8,306.1,245.3,311.6,252.1,311.6z" />
                            <circle cx="161.2" cy="299.4" r="12.6" />
                            <path d="M256,387.5c-6.8,0-12.3,5.5-12.3,12.3v25.5c-11.5,3.8-20.6,12.9-24.4,24.4H96.8c-6.8,0-12.3,5.5-12.3,12.3   s5.5,12.3,12.3,12.3h122.5c5.1,15.3,19.6,26.4,36.7,26.4c17,0,31.5-11.1,36.7-26.4h122.5c6.8,0,12.3-5.5,12.3-12.3   s-5.5-12.3-12.3-12.3H292.7c-3.8-11.5-12.9-20.6-24.4-24.4v-25.5C268.2,393,262.8,387.5,256,387.5z M256,476.1   c-7.8,0-14.2-6.4-14.2-14.2c0-7.8,6.4-14.2,14.2-14.2c7.8,0,14.2,6.4,14.2,14.2C270.2,469.7,263.8,476.1,256,476.1z" />
                          </g>
                        </svg>
                        {pool.adress.slice(0, 10)}...
                      </a>
                      {pool.owner && (
                        <a
                          className="flex items-center gap-2 text-sm text-blue-500 whitespace-no-wrap dark:text-blue-400 hover:underline"
                          target="_blank"
                          href={`https://confluxscan.io/address/${pool.owner}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            x="0px"
                            y="0px"
                            fill="currentColor"
                            viewBox="0 0 490.1 490.1"
                          >
                            <g>
                              <g>
                                <path d="M245,261.75c71.9,0,131.4-57.3,131.4-130.3S316.9,0.05,245,0.05s-131.4,57.3-131.4,130.3S173.1,261.75,245,261.75z     M245,40.75c50,0,90.7,40.7,90.7,89.7s-40.7,89.6-90.7,89.6s-90.7-40.7-90.7-89.7S195,40.75,245,40.75z" />
                                <path d="M333.6,274.25c-8.3-2.1-16.7,0-21.9,6.3l-66.7,76.1l-66.7-76.1c-5.2-6.3-14.6-8.3-21.9-6.3C61.5,305.55,0,382.65,0,469.15    c0,11.5,9.4,20.9,20.9,20.9h448.3c11.5,0,20.9-9.4,20.9-20.9C490,382.65,428.5,305.55,333.6,274.25z M42.7,449.35    c8.4-57.3,50.1-106.3,114.7-131.3l73,83.4c7.3,9.4,22.9,9.4,30.2,0l73-83.4c63.6,25,106.4,75,114.7,131.3H42.7z" />
                              </g>
                            </g>
                          </svg>
                          {pool.owner.slice(0, 10)}...
                        </a>
                      )}
                    </div>
                  </td>
                )}

                {Cell(
                  pool.totalLocked
                    ? formatBalance(
                        BigInt(pool.totalLocked) *
                          BigInt(ONE_VOTE_CFX) *
                          BigInt("1000000000000000000")
                      )
                    : pool.totalLocked
                )}

                {Cell(
                  pool.totalRevenue
                    ? formatBalance(pool.totalRevenue)
                    : pool.totalRevenue
                )}

                {Cell(pool.stakerNumber)}

                {Cell(pool.fees ? pool.fees + " %" : pool.fees)}

                {Cell(pool.apy ? pool.apy + " %" : pool.apy)}

                <td className="px-5 py-5 text-lg bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                  {!!!pool.status ? (
                    Cell(pool.status)
                  ) : (
                    <PoolAlert pool={pool} />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {Math.ceil(pools.length / pageSize) > 1 && (
        <div className="flex flex-col items-center px-5 py-5 bg-white dark:bg-gray-800 xs:flex-row xs:justify-between">
          <Pagination
            activePage={activePage}
            onPageChange={setActivePage}
            pageSize={pageSize}
            itemsLength={pools.length}
          />
        </div>
      )}
    </div>
  );
}

const Cell = value => {
  let node;

  if (value === null) {
    node = <span className="whitespace-no-wrap">--</span>;
  } else {
    value
      ? (node = <span className="whitespace-no-wrap ">{value}</span>)
      : (node = (
          <span className="block w-16 h-6 bg-gray-200 rounded animate-pulse"></span>
        ));
  }

  return (
    <td className="px-5 py-5 text-lg text-center bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800">
      <p className="text-gray-900 whitespace-no-wrap dark:text-white">{node}</p>
    </td>
  );
};
