import { useEnsName } from "wagmi";

const shortenAddress = (address: `0x${string}`) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
};

const AccountENS: React.FC<{
  address: `0x${string}`
}> = ({ address }) => {
  const {
    data: ens,
    isError: isErrorENS,
    isLoading: isLoadingENS } = useEnsName({ address: address, chainId: 1 });

  return <div>
    {(isErrorENS || !ens || isLoadingENS) ? shortenAddress(address) : ens}
  </div>
}

export default AccountENS;
