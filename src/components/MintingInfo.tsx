import { BigNumber } from "ethers";
import { useState } from "react";
import { useContractRead } from "wagmi";
import { NFT_ADDY, READ_NFT_BALANCE } from "../constants";

const MintingInfo: React.FC<{
  userAddress: `0x${string}`
}> = ({ userAddress }) => {
  const [balance, setBalance] = useState(BigNumber.from(0));

  useContractRead({
    address: NFT_ADDY,
    abi: [READ_NFT_BALANCE.abi],
    functionName: READ_NFT_BALANCE.name,
    args: [userAddress],
    onSuccess(data) {
      setBalance(BigNumber.from(data))
    },
    onError(data) {
      console.log('error reading balance', data)
    }
  });

  return balance && balance.gt(0) ? (
    <div>
      {`Ya minteaste ${balance} NFT. Gracias!`}
    </div>
  ) : null;
}

export default MintingInfo;
