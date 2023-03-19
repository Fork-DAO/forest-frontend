import { polygon, polygonMumbai } from 'wagmi/chains';

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
const IS_MAINNET = process.env.NEXT_PUBLIC_IS_MAINNET || false;
export const WALLET_CONNECT_PROJECT: string = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT || '';
export const CHAIN_ID = IS_MAINNET ? POLYGON_MAINNET.id : POLYGON_MUMBAI.id;
export const CHAIN_NAME = IS_MAINNET ? POLYGON_MAINNET.name : POLYGON_MUMBAI.name;
export const BLOCK_EXPLORER = IS_MAINNET ? POLYGON_MAINNET.blockExplorers.etherscan : POLYGON_MUMBAI.blockExplorers.etherscan;
export const NFT_ADDY = IS_MAINNET ? '0x-' : '0xA5E18B96D8afC69637b9800Ff50ad16C65A6Df23';
export const MAX_SUPPLY = 10;
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
