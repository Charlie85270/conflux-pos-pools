import { Contract } from "js-conflux-sdk";
import { format } from "js-conflux-sdk";
import { isZeroAddress } from ".";
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
  // Default data for all pool
  let data: PoolInfos = {
    apy: "0",
    contractInfo: undefined,
    fees: "0",
    isZero: false,
    owner: undefined,
    poolSummary: undefined,
    posAddress: "",
    staker: "0",
    status: "",
    totalLocked: undefined,
    totalRevenue: undefined,
    account: undefined,
    adr: undefined,
    verified: false,
  };

  /**
   * To add a custom pool add a entry on the switch with the id of your pool
   * and create a 'getMyPoolInfos' function which implement the recuperation of the data
   */
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

/**
 *
 * [CLASSIC POS POOLS]
 *
 * Method to get PoS Pool on-chain data
 *
 * @param pool
 * @param contract
 * @param conflux
 * @returns
 */
export const getGenericPoolInfos = async (
  pool,
  contract,
  conflux
): Promise<PoolInfos> => {
  // Owner of the contract
  const owner = await contract.owner();
  // Informations of the contract
  const contractInfo = await reqContract(pool.adress);
  // If owner of the contract is the zero address
  const isZero = isZeroAddress(contractInfo.admin);
  // Fees of the pool
  const fees = await contract.poolUserShareRatio();
  // PoS address of the pool
  const adr = await contract.posAddress();
  // Account linked to the pool
  const account = await conflux.pos.getAccount(format.hex(adr));
  // Status of the pool
  const status = account?.status;
  // Summary of the pool
  const poolSummary = await contract.poolSummary();
  // Apy of the pool
  const apy = await contract.poolAPY();
  // Number of staker on the pool
  const staker = await contract.stakerNumber();
  // If contract is verified on ConfluxScan
  const verified =
    (contractInfo?.data.verify?.exactMatch &&
      contractInfo?.data.implementation?.verify?.exactMatch) ||
    false;
  // Hex PoS address
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

/**
 *
 * [NUCLEON]
 *
 * Custom method to get Nucleon PoS Pool liquid data
 * This function get and return the custom data from Nucleon Pool
 * Nucleon is a liquid staking solution so the implementation of the contract is different from a basic pool
 *
 *
 * @param pool
 * @param contract
 * @param conflux
 * @returns
 */
export const getNucleonPoolInfos = async (
  pool,
  contract,
  conflux
): Promise<PoolInfos> => {
  // Owner of the contract
  const owner = await contract.owner();
  // Infos of the contract
  const contractInfo = await reqContract(pool.adress);
  // If the owner of the contract is the zero address
  const isZero = isZeroAddress(contractInfo.data.admin);
  // Fees of the pool
  const fees = 10;
  // Account linked to the pool
  const account = await conflux.pos.getAccount(format.hex(pool.posAddress));
  // Status of the pool
  const status = account?.status;
  // Summary of the pool
  const poolSummary = await contract.poolSummary();
  // If the contract isVerified on ConfluxScan
  const verified =
    (contractInfo?.data.verify?.exactMatch &&
      contractInfo?.data.implementation?.verify?.exactMatch) ||
    false;
  // TODO: Get theses informations from Nucleon API
  const staker = 276;
  const apy = "18.66";

  const stakerData = await fetch(
    "https://mainapi.nucleon.network/api/v1/totalstakers"
  );
  const apyData = await fetch("https://mainapi.nucleon.network/api/v1/apy");

  console.log(stakerData);
  console.log(apyData);
  return {
    owner,
    contractInfo,
    isZero,
    fees,
    adr: undefined,
    verified,
    posAddress: pool.posAddress,
    account,
    status,
    totalRevenue: poolSummary[5] + poolSummary[6],
    totalLocked: poolSummary[0],
    poolSummary,
    apy,
    staker,
  };
};
