import { BigNumber, ethers } from "ethers";
import { useState } from "react";
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { BLOCK_EXPLORER, NFT_ADDY, WRITE_SAFE_MINT, READ_UNIT_PRICE } from "../constants";

const MintNft: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState<BigNumber>();

  useContractRead({
    address: NFT_ADDY,
    abi: [READ_UNIT_PRICE.abi],
    functionName: READ_UNIT_PRICE.name,
    onSuccess(data) {
      setUnitPrice(BigNumber.from(data))
    },
    onError(data) {
      console.log('error reading unit price', data)
    }
  });
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: NFT_ADDY,
    abi: [WRITE_SAFE_MINT.abi],
    functionName: WRITE_SAFE_MINT.name,
    args: [quantity ? BigNumber.from(quantity) : BigNumber.from(0)],
    enabled: Boolean(quantity) && Boolean(unitPrice),
    overrides: {
      value: unitPrice?.mul(quantity)
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
          onChange={(e) => setQuantity(Number(e.target.value))}
          type="number"
          placeholder="1"
          value={quantity} />
        <button
          disabled={!quantity || !unitPrice || isLoading}
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
