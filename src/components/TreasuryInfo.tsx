import { useState } from "react";
import { useContractRead } from "wagmi";
import { NFT_ADDY, READ_TREASURY } from "../constants";

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
      console.log('error reading treasury', data)
    }
  });

  return (
    <div>
      {`Todo lo recaudado se envía a la address ${treasuryAddress}`}
    </div>
  )
}

export default TreasuryInfo;
