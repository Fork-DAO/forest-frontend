import { useEnsName } from "wagmi";

const AccountENS: React.FC<{
  address: `0x${string}`
}> = ({ address }) => {
  const {
    data: ens,
    isError: isErrorENS,
    isLoading: isLoadingENS } = useEnsName({ address: address, chainId: 1 });

  return <div>
    {(isErrorENS || !ens || isLoadingENS) ? address : ens}
  </div>
}

export default AccountENS;
