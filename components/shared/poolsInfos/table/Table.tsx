import { format } from "js-conflux-sdk";
import React, { useEffect, useState } from "react";
import { UseConflux } from "../../../../hooks/useConflux";
import { formatBalance } from "../../../../utils";
import { Pagination } from "./pagination/Pagination";
import { abi } from "../../../../abi";
import { reqContract } from "../../../../services/httpReq";
import { PoolAlert } from "../../alert/PoolAlert";
import { TableHeader } from "./header/Header";

const ONE_VOTE_CFX = 1000;
const pageSize = 50;
export interface PoolsInfosApi {
  status?: string | null;
  name: string;
  verified?: boolean;
  totalLocked?: string | null;
  totalRevenue?: string | null;
  apy?: number | null;
  stakerNumber?: string | null;
  fees?: number | null;
  posAddress?: string;
  adress?: string;
  link: string;
  abi?: any;
  image?: string;
  trusted?: boolean;
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
        const fees = await contract.poolUserShareRatio();

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
          fees: (10000 - Number(fees)) / 100,
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
          fees: null,
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
    },
    {
      name: "Name",
    },
    {
      name: "Adress",
    },
    {
      name: "Staking Vault",
      key: "totalLocked",
    },
    {
      name: "Total CFX earned",
      key: "totalRevenue",
    },
    {
      name: "Staker",
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
                  <p className="text-gray-900 whitespace-no-wrap">
                    {Cell(pool.fees ? pool.fees + " %" : pool.fees)}
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
                    <PoolAlert pool={pool} />
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
