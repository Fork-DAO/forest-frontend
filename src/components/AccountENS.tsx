import { Card, Typography } from "@mui/material";
import { useEnsName } from "wagmi";

const shortenAddress = (address: `0x${string}`) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
};

const AccountENS: React.FC<{
  address: `0x${string}`,
  isMobile: boolean
}> = ({ address, isMobile }) => {
  const {
    data: ens,
    isError: isErrorENS,
    isLoading: isLoadingENS } = useEnsName({ address: address, chainId: 1 });

  return <Card className="p-2" style={{ background: "rgb(67 103 110)" }}>
    <Typography variant="h6" color="#cdd8c4" style={{ fontSize: isMobile ? "medium" : "large" }}>
      {(isErrorENS || !ens || isLoadingENS) ? shortenAddress(address) : ens}
    </Typography>
  </Card >
}

export default AccountENS;
