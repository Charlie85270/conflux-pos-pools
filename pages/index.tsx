import AppLayout from "../components/layout/AppLayout";
import { PoolsInfo } from "../components/shared/poolsInfos/PoolsInfo";
import { PosInfos } from "../components/shared/posInfos/PosInfos";

export const IndexPage = () => {
  return (
    <AppLayout
      title="Conflux PoS Validators / Pools"
      desc="Find the best Pool / Validator to stake your CFX token on Conflux Network"
    >
      <div className="px-4 lg:px-0">
        <PosInfos />
        <PoolsInfo />
      </div>
    </AppLayout>
  );
};

export default IndexPage;
