import { OpenInNew } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useContractRead } from "wagmi";
import { BLOCK_EXPLORER, NFT_ADDY, READ_TREASURY } from "../constants";

const TreasuryInfo: React.FC = () => {
  const [treasuryAddress, setTreasuryAddress] = useState("");

  useContractRead({
    address: NFT_ADDY,
    abi: [READ_TREASURY.abi],
    functionName: READ_TREASURY.name,
    onSuccess(data) {
      setTreasuryAddress(String(data))
    },
    onError(data) {
      console.error('error reading treasury', data)
    }
  });

  return (
    <Typography color="#dfebd5" variant="h6">
      {"Ver tesorería "}
      <a href={`${BLOCK_EXPLORER.url}/address/${treasuryAddress}`}>
        <OpenInNew fontSize="inherit" />
      </a>
    </Typography>
  )
}

export default TreasuryInfo;
