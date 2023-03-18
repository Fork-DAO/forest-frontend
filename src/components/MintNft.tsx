import { BigNumber, ethers } from "ethers";
import { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

const MintNft: React.FC = () => {
  const [quantity, setQuantity] = useState("1");

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: '0x3Aa33C7d79b69671145337674E9A6233616E07BD',
    abi: [
      {
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
      }
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
              <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
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
