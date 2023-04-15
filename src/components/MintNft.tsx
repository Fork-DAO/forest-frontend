import styled from "@emotion/styled";
import { OpenInNew } from "@mui/icons-material";
import { Alert, Button, CircularProgress, Collapse, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { BigNumber, ethers } from "ethers";
import { useState } from "react";
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { BLOCK_EXPLORER, NFT_ADDY, WRITE_SAFE_MINT, READ_UNIT_PRICE } from "../constants";

const QuantityTextField = styled(TextField)({
  'background-color': '#43676e52',
  '#quantity': {
    color: '#cdd8c4'
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderColor: "rgb(67 103 110)",
    borderLeftWidth: 6,
    padding: '4px !important',
  },
  '& input:valid:hover + fieldset': {
    borderColor: "rgb(67 103 110)",
    borderLeftWidth: 6,
    padding: '4px !important',
  }
});

const MintNft: React.FC = () => {
  const [quantity, setQuantity] = useState<number>();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(true);
  const [unitPrice, setUnitPrice] = useState<BigNumber>();

  useContractRead({
    address: NFT_ADDY,
    abi: [READ_UNIT_PRICE.abi],
    functionName: READ_UNIT_PRICE.name,
    onSuccess(data) {
      setUnitPrice(BigNumber.from(data))
    },
    onError(data) {
      setShowError(true);
      console.error('error reading unit price', data)
    }
  });
  const {
    config,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: NFT_ADDY,
    abi: [WRITE_SAFE_MINT.abi],
    functionName: WRITE_SAFE_MINT.name,
    args: [quantity ? BigNumber.from(quantity) : BigNumber.from(0)],
    enabled: (quantity || 0) > 0 && Boolean(unitPrice),
    overrides: {
      value: quantity ? unitPrice?.mul(quantity) : unitPrice
    },
    onError: (e) => {
      setShowError(true)
      console.error(`Error armando tx: ${JSON.stringify(e)}`)
    },
    onSuccess: () => setShowSuccess(true)
  });
  const { data, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <Stack className="flex items-center" >
      <div>
        {isSuccess && (
          <Collapse in={showSuccess}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setShowSuccess(false);
                  }}
                >
                  <div className="text-xs font-bold">
                    x
                  </div>
                </IconButton>
              }
              severity="success"
              className="m-2">
              {`¡Minteo exitoso! `}
              <a href={`${BLOCK_EXPLORER.url}/tx/${data?.hash}`}>
                <OpenInNew fontSize="inherit" />
              </a>
            </Alert>
          </Collapse>
        )}
      </div>
      <div>
        {(isPrepareError || isError) && (
          <Collapse in={showError}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setShowError(false);
                  }}
                >
                  <div className="text-xs font-bold">
                    x
                  </div>
                </IconButton>
              }
              severity="error"
              className="m-2">
              {"Error para ejecutar la transacción. Contacte al admin."}
            </Alert>
          </Collapse>
        )}
      </div>
    </Stack>
  )
}

export default MintNft;
