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
// export const CHAIN_ID = POLYGON_MAINNET.id;
export const CHAIN_ID = POLYGON_MUMBAI.id;