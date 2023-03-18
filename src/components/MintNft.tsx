import { BigNumber, ethers } from "ethers";
import { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { BLOCK_EXPLORER, NFT_ADDY, SAFE_MINT_ABI } from "../constants";

const MintNft: React.FC = () => {
  const [quantity, setQuantity] = useState("1");

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: NFT_ADDY,
    abi: [
      SAFE_MINT_ABI
    ],
    functionName: 'safeMint',
    args: [BigNumber.from(quantity)],
    enabled: Boolean(quantity),
    overrides: {
      value: ethers.utils.parseEther("0.000000000000000001")
    }
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          write?.()
        }}
      >
        <input
          aria-label="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="1"
          value={"1"} />
        <button
          disabled={!quantity || isLoading}
        >
          {isLoading ? "Minteando..." : "Mintear"}
        </button>
        {isSuccess && (
          <div>
            Successfully minted your NFT!
            <div>
              <a href={`${BLOCK_EXPLORER.url}/tx/${data?.hash}`}>Etherscan</a>
            </div>
          </div>)}
        {(isPrepareError || isError) && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}
      </form>
    </div>
  )
}

export default MintNft;
