export const abi = [
    "event Initialized(uint8)",
    "event OwnershipTransferred(address indexed,address indexed)",
    "function CFX_PER_VOTE() view returns (uint256)",
    "function RATIO_BASE() view returns (uint256)",
    "function aprPeriodCount() view returns (uint256)",
    "function claimInterest()",
    "function decreaseStake(uint64)",
    "function depositPoolInterest() payable",
    "function eSpaceAddAssets(uint256)",
    "function eSpaceFirstRedeemAmount() view returns (uint256)",
    "function eSpaceHandleRedeem(uint256)",
    "function eSpacePoolAddr() view returns (address)",
    "function eSpacePoolStakerNumber() view returns (uint256)",
    "function eSpacePoolTotalAssets() view returns (uint256)",
    "function eSpacePoolTotalRedeemed() view returns (uint256)",
    "function eSpacePoolTotalSupply() view returns (uint256)",
    "function eSpaceRedeemLen() view returns (uint256)",
    "function handleFirstRedeem() returns (bool)",
    "function handleRedeem()",
    "function initialize()",
    "function mappedBalance() view returns (uint256)",
    "function owner() view returns (address)",
    "function poolAPR() view returns (uint256)",
    "function poolAccInterest() view returns (uint256)",
    "function poolInterest() view returns (uint256)",
    "function poolShareRatio() view returns (uint256)",
    "function poolSummary() view returns (tuple(uint64,uint64,uint64,uint64,uint256,uint256))",
    "function posPoolAddr() view returns (address)",
    "function renounceOwnership()",
    "function setESpacePool(address)",
    "function setPoSOracle(address)",
    "function setPoSPool(address)",
    "function setPoolShareRatio(uint256)",
    "function stakeAbleBalance() view returns (uint256)",
    "function stakeVotes()",
    "function stakerNumber() view returns (uint256)",
];