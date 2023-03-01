import { Contract } from "js-conflux-sdk";
import { format } from "js-conflux-sdk";
import { isZeroAddress } from ".";
import { PoolsInfosApi } from "../components/shared/poolsInfos/table/table";
import { reqContract } from "../services/httpReq";

interface PoolInfos {
  owner: any;
  contractInfo: any;
  isZero: boolean;
  fees: any;
  posAddress: string;
  adr?: string;
  account?: string;
  status: string;
  poolSummary: any;
  apy: any;
  staker: any;
  totalLocked: any;
  totalRevenue: any;
  verified: boolean;
}

export const getPoolsInfos = async (
  pool,
  contract: Contract,
  conflux
): Promise<PoolInfos> => {
  let data: PoolInfos = {
    apy: "0",
    contractInfo: undefined,
    fees: "0",
    isZero: false,
    owner: undefined,
    poolSummary: undefined,
    posAddress: undefined,
    staker: "0",
    status: "",
    totalLocked: undefined,
    totalRevenue: undefined,
    account: undefined,
    adr: undefined,
    verified: false,
  };

  switch (pool.customContract) {
    case "Nucleon":
      data = await getNucleonPoolInfos(pool, contract, conflux);
      break;
    default:
      data = await getGenericPoolInfos(pool, contract, conflux);
      break;
  }
  return data;
};

export const getGenericPoolInfos = async (
  pool,
  contract: Contract,
  conflux
): Promise<PoolInfos> => {
  // @ts-ignore
  const owner = await contract.owner();

  const contractInfo = await reqContract(pool.adress);

  const isZero = isZeroAddress(contractInfo.admin);

  const fees = await contract.poolUserShareRatio();

  // @ts-ignore
  const adr = await contract.posAddress();
  const account = await conflux.pos.getAccount(format.hex(adr));

  const status = account?.status;
  // @ts-ignore
  const poolSummary = await contract.poolSummary();
  // @ts-ignore
  const apy = await contract.poolAPY();
  // @ts-ignore
  const staker = await contract.stakerNumber();

  const verified =
    (contractInfo?.data.verify?.exactMatch &&
      contractInfo?.data.implementation?.verify?.exactMatch) ||
    false;
  const posAddress = format.hex(adr);

  return {
    owner,
    contractInfo,
    posAddress,
    verified,
    totalLocked: poolSummary[0],
    isZero,
    fees: (10000 - Number(fees)) / 100,
    adr,
    account,
    status,
    poolSummary,
    apy: Number(apy) / 100,
    staker: staker[0],
    totalRevenue: poolSummary[2],
  };
};

export const getNucleonPoolInfos = async (
  pool,
  contract: Contract,
  conflux
): Promise<PoolInfos> => {
  const owner = await contract.owner();

  // @ts-ignore

  const contractInfo = await reqContract(pool.adress);

  const isZero = isZeroAddress(contractInfo.data.admin);
  // @ts-ignore
  const fees = 10;

  // @ts-ignore
  //   const adr = await contract.posAddress();
  //   const account = await conflux.pos.getAccount(format.hex(adr));
  const status = undefined;
  //const status = account?.status;
  // @ts-ignore
  const poolSummary = await contract.poolSummary();

  // @ts-ignore
  //   const apy = await contract.poolAPY();
  //   // @ts-ignore
  //   const staker = await contract.stakerNumber();
  const verified =
    (contractInfo?.data.verify?.exactMatch &&
      contractInfo?.data.implementation?.verify?.exactMatch) ||
    false;

  const pools = await contract._poolRegisted();
  console.log("charlie", pools);

  const staker = 0;
  const apy = "";
  return {
    owner,
    contractInfo,
    isZero,
    fees,
    adr: undefined,
    verified,
    account: undefined,
    status,
    totalRevenue: poolSummary[5] + poolSummary[6],
    totalLocked: poolSummary[0],
    poolSummary,
    apy,
    staker,
  };
};
