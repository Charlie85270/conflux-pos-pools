import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { PoolsInfo } from "../components/shared/poolsInfos/PoolsInfo";
import { PosInfos } from "../components/shared/posInfos/PosInfos";
import { useInterval } from "react-use";

export const IndexPage = () => {
  const [timestamp, setTimestamp] = useState(+new Date());
  // auto update
  useInterval(() => {
    setTimestamp(+new Date());
  }, 20000);

  return (
    <AppLayout
      title="Conflux PoS Validators / Pools"
      desc="Find the best Pool / Validator to stake your CFX token on Conflux Network"
    >
      <div className="px-4 lg:px-0">
        <PosInfos timestamp={timestamp} />
        <PoolsInfo />
      </div>
    </AppLayout>
  );
};

export default IndexPage;
