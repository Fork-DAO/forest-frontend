import { OpenInNew } from "@mui/icons-material";
import { Card, Typography } from "@mui/material";
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
    <Card className="p-1" style={{ background: "rgb(67 103 110)" }}>
      <Typography color="#cdd8c4" variant="h6">
        {"Ver tesorería "}
        <a href={`${BLOCK_EXPLORER.url}/address/${treasuryAddress}`}>
          <OpenInNew fontSize="inherit" />
        </a>
      </Typography>
    </Card>
  )
}

export default TreasuryInfo;
