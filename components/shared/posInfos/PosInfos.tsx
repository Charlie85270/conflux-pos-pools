import React, { useEffect, useState } from "react";
import { reqHomeDashboardOfPOSSummary } from "../../../services/httpReq";
import { PosCard } from "./PosCard";
import { formatBalance, formatTimeStamp } from "../../../utils";

export function PosInfos({ timestamp = 1 }: { timestamp?: number }) {
  const [POSSummaryInfo, setPOSSummaryInfo] = useState<any>({});

  useEffect(() => {
    reqHomeDashboardOfPOSSummary()
      .then(res => setPOSSummaryInfo(res.data))
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
            tooltip="Historical Interest is the total of CFX earned by stakers with the PoS staking on Conflux"
            title="Historical Interest"
            value={formatBalance(POSSummaryInfo.totalPosRewardDrip)}
          />
          <PosCard
            icon="percent"
            tooltip="The existing base staking rate is 4%, and the PoS staking reward is added to this with a plus factor. Let x=CFX total circulation / CFX total staking, and the additional coefficient be √x.
When the amount of staking is 1/4 of the circulation, the reward rate is 8%; When the amount of staking is 1/9 of the circulation, the reward rate is 12%; And so on. When the total number of votes cast is relatively low, those who vote will benefit more."
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
            link="https://confluxscan.io/pos"
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
