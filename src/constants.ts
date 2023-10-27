import { polygon, polygonMumbai, gnosis } from 'wagmi/chains';

// Web3
export const POLYGON_MAINNET = {
  ...polygon,
  name: 'Polygon Mainnet',
  rpcUrls: { default: 'https://polygon-rpc.com' }
};
export const POLYGON_MUMBAI = {
  ...polygonMumbai,
  name: 'Polygon Mumbai',
  rpcUrls: { default: 'https://rpc-mumbai.maticvigil.com' }
};
export const GNOSIS_CHAIN = {
  ...gnosis,
  name: 'Gnosis',
  rpcUrls: { default: 'https://rpc.gnosischain.com' }
};

export const IS_MAINNET = (process.env.NEXT_PUBLIC_IS_MAINNET || "false") == "true";
export const WALLET_CONNECT_PROJECT: string = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT || '';
export const CHAIN_ID = GNOSIS_CHAIN.id;
export const CHAIN_NAME = GNOSIS_CHAIN.name;
export const BLOCK_EXPLORER = GNOSIS_CHAIN.blockExplorers.default;
export const NFT_ADDY = IS_MAINNET ? '0xCd7Ed93D4b95c9F93Ca7e2b4B8960Bd577A0DF9C' : '0x42FCcA2A57976378DBFaF853a3089547b599f98F';
export const GOVERNOR_ADDY = '0xf7dE5537eCD69a94695fcF4BCdBDeE6329b63322';
export const FORK_TOKEN_ADDY = '0xf96ff34c3fbfba19d770fdbabaa105ee9d7d893b';
export const SUBMIT_LIST_ABI = {
  abi: {
    "constant": false,
    "inputs": [
        {
            "name": "_target",
            "type": "address[]"
        },
        {
            "name": "_value",
            "type": "uint256[]"
        },
        {
            "name": "_data",
            "type": "bytes"
        },
        {
            "name": "_dataSize",
            "type": "uint256[]"
        },
        {
            "name": "_description",
            "type": "string"
        }
    ],
    "name": "submitList",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  name: "submitList"
}
export const WRITE_SAFE_MINT = {
  abi: {
    inputs: [
      {
        internalType: "uint256",
        name: "_quantity",
        type: "uint256"
      }
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  name: 'safeMint'
};
export const READ_UNIT_PRICE = {
  abi: {
    inputs: [],
    name: "unitPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  name: 'unitPrice'
};
export const READ_TREASURY = {
  abi: {
    inputs: [],
    name: "treasury",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  name: 'treasury'
};
export const READ_NFT_BALANCE = {
  abi: {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  name: 'balanceOf'
};
