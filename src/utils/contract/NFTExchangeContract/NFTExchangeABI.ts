/**
 * @package
 */
export const NFT_EXCHANGE_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "OrderApproved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approver",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "prevApprover",
        type: "address",
      },
    ],
    name: "OrderApprovedByNewOwner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "OrderCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "OrderCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_senderNFTContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_senderNFTTokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiverNFTContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_receiverNFTTokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "orderSender",
        type: "address",
      },
    ],
    name: "approveOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_senderNFTContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_senderNFTTokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiverNFTContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_receiverNFTTokenId",
        type: "uint256",
      },
    ],
    name: "createOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "orderSender",
        type: "address",
      },
    ],
    name: "getOrder",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "senderNFTContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "senderNFTTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "receiverNFTContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "receiverNFTTokenId",
            type: "uint256",
          },
        ],
        internalType: "struct NFTExchange.Order",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
