export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ClaimInterest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "votePower",
        type: "uint256",
      },
    ],
    name: "DecreasePoSStake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "votePower",
        type: "uint256",
      },
    ],
    name: "IncreasePoSStake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "votePower",
        type: "uint256",
      },
    ],
    name: "WithdrawStake",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "_poolLockPeriod_in",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_poolLockPeriod_out",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_poolRegisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poolName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "indentifier",
        type: "bytes32",
      },
      {
        internalType: "uint64",
        name: "votePower",
        type: "uint64",
      },
      {
        internalType: "bytes",
        name: "blsPubKey",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "vrfPubKey",
        type: "bytes",
      },
      {
        internalType: "bytes[2]",
        name: "blsPubKeyProof",
        type: "bytes[2]",
      },
    ],
    name: "register",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "votePower",
        type: "uint64",
      },
    ],
    name: "increaseStake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "votePower",
        type: "uint64",
      },
    ],
    name: "decreaseStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimAllInterest",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "temp_Interest",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poolSummary",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "totalvotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "locking",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "locked",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "unlocking",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "unlocked",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalInterest",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimedInterest",
            type: "uint256",
          },
        ],
        internalType: "struct PoSPoolmini.PoolSummary",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInQueue",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "votePower",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endBlock",
            type: "uint256",
          },
        ],
        internalType: "struct VotePowerQueue.QueueNode[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOutQueue",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "votePower",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endBlock",
            type: "uint256",
          },
        ],
        internalType: "struct VotePowerQueue.QueueNode[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_bridge",
        type: "address",
      },
      {
        internalType: "address",
        name: "_withdraw",
        type: "address",
      },
      {
        internalType: "address",
        name: "_storage",
        type: "address",
      },
    ],
    name: "_set_bridges",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "_in",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "_out",
        type: "uint64",
      },
    ],
    name: "_setLockPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "_setPoolName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    name: "_setCfxCountOfOneVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "votePower",
        type: "uint64",
      },
    ],
    name: "_reStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
