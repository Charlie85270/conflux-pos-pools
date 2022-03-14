import React, { useEffect, useState } from "react";
import { reqHomeDashboardOfPOSSummary } from "../../../services/httpReq";
import { PosCard } from "./PosCard";
import { formatBalance, formatTimeStamp } from "../../../utils";

export function PosInfos({ timestamp = 1 }: { timestamp?: number }) {
  const [POSSummaryInfo, setPOSSummaryInfo] = useState<any>({});

  useEffect(() => {
    reqHomeDashboardOfPOSSummary()
      .then(res => setPOSSummaryInfo(res))
      .catch(e => {
        console.error("get pos homepage summary info error: ", e);
      });
  }, [timestamp]);

  return (
    <div>
      <h2 className="my-2 text-lg font-bold text-black dark:text-white">
        Conflux PoS stats
      </h2>
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <PosCard
            icon="node"
            title="Nodes"
            value={POSSummaryInfo.posAccountCount}
          />
          <PosCard
            icon="lock"
            title="Total Locked"
            value={formatBalance(POSSummaryInfo.totalPosStakingTokens)}
          />

          <PosCard
            icon="token"
            title="Historical Interest"
            value={formatBalance(POSSummaryInfo.totalPosRewardDrip)}
          />
          <PosCard
            icon="percent"
            title="APY"
            value={
              !!!POSSummaryInfo.apy
                ? "--"
                : String(POSSummaryInfo.apy).substr(0, 4) + "%"
            }
          />
          <PosCard
            icon="bloc"
            title="Current Block Number"
            value={POSSummaryInfo.latestCommitted}
          />
          <PosCard
            icon="time"
            title="Latest Voted Block"
            value={POSSummaryInfo.latestVoted}
          />
          <PosCard
            icon="bloc"
            title="Latest Interest Distribution Block"
            value={POSSummaryInfo.lastDistributeBlock}
            subtitle={formatTimeStamp(POSSummaryInfo.lastDistributeBlockTime)}
          />
        </div>
      </div>
    </div>
  );
}
