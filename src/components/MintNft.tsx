import styled from "@emotion/styled";
import {  Button,Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { BLOCK_EXPLORER, NFT_ADDY, FORK_TOKEN_ADDY, GOVERNOR_ADDY, SUBMIT_LIST_ABI, WRITE_SAFE_MINT, READ_UNIT_PRICE } from "../constants";

const QuantityTextField = styled(TextField)({
  'padding': "4px",
  'color': 'white',
});

const formatData = (addyList: string | undefined, tokenAmountList: string | undefined) => {
  const tokenAmountAsList = tokenAmountList ? tokenAmountList.split(",") : [];
  const tokenAmountLength = tokenAmountAsList.length;
  const addyAsList = addyList ? addyList.split(",") : [];
  if (tokenAmountLength == 0) {
    return "";
  }
  let data = '0x';
  for (let index = 0; index < tokenAmountLength; index++) {
    if (addyAsList.length > 0) {
      data += 'a9059cbb000000000000000000000000'
      const addy = addyAsList[index]
      if (addy.length != 42 || addy.substring(0,2) != '0x') {
        console.error(`address ${addy} debe empezar con 0x y tener una longitud de 42 caracters`)
      } else {
        data += addy.substring(2).toLowerCase()
        let tokenAmount = Number(tokenAmountAsList[index]);
        tokenAmount = tokenAmount * (10**8);
        let tokenAmountHexa = tokenAmount.toString(16);
        const amountOfZeros = 64-(tokenAmountHexa.length);
        for (let index_2 = 0; index_2 < amountOfZeros; index_2++) {
          data += '0';
        }
        data += tokenAmountHexa;
      }
    }
  }
  return data;
}

const formatDataSize = (addyList: string | undefined) => {
  const addyAsList = addyList ? addyList.split(",") : [];
  const addyLength = addyAsList.length;
  if (addyLength == 0) {
    return "";
  }
  let dataSize = "[";
  for (let index = 0; index < addyLength; index++) {
    dataSize += `"68"${index < (addyLength-1) ? "," : ""}`;
  }
  dataSize += "]"
  return dataSize;
}

const formatValue = (addyList: string | undefined) => {
  const addyAsList = addyList ? addyList.split(",") : [];
  const addyLength = addyAsList.length;
  let value = "[";
  for (let index = 0; index < addyLength; index++) {
    value += `"0"${index < (addyLength-1) ? "," : ""}`;
  }
  value += "]"
  return value;
}

const formatDescription = (fipNumber: string | undefined, addyList: string | undefined) => {
  if (fipNumber == undefined || fipNumber.length == 0) {
    return "";
  }
  const addyAsList = addyList ? addyList.split(",") : [];
  const addyLength = addyAsList.length;
  let description = "";
  for (let index = 0; index < addyLength; index++) {
    description += `Enforce FIP ${fipNumber}${index < (addyLength-1) ? "," : ""}`;
  }
  return description;
}

const formatTarget = (addyList: string | undefined) => {
  const addyAsList = addyList ? addyList.split(",") : [];
  const addyLength = addyAsList.length;
  let target = "[";
  for (let index = 0; index < addyLength; index++) {
    target += `"${FORK_TOKEN_ADDY}"${index < (addyLength-1) ? "," : ""}`;
  }
  target += "]"
  return target;
}

const MintNft: React.FC = () => {
  const [target, setTarget] = useState<string>();
  const [value, setValue] = useState<string>();
  const [submitListData, setSubmitListData] = useState<string>();
  const [dataSize, setDataSize] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [fipNumber, setFipNumber] = useState<string>();
  const [addyList, setAddyList] = useState<string>();
  const [tokenAmountList, setTokenAmountList] = useState<string>();
  const [showAirdropData, setShowAirdropData] = useState<boolean>(false);

  return (
    <div className="flex items-center row">
        <Stack className="flex items-center row" >
          <Typography variant="h6">
          Para airdrop
            </Typography>
      <QuantityTextField
          fullWidth
          id="fipNumber"
          multiline
          label="Numero de FIP"
          variant="outlined"
          onChange={(e) => {
            setFipNumber(e.target.value)
            setDescription(formatDescription(e.target.value, addyList))
          }}
          value={fipNumber}
          size="medium"
      />
        <QuantityTextField
          id="addyList"
          multiline
          label="Lista de Addresses"
          variant="outlined"
          onChange={(e) => {
            setAddyList(e.target.value)
            setTarget(formatTarget(e.target.value))
            setValue(formatValue(e.target.value))
            setSubmitListData(formatData(e.target.value, tokenAmountList))
            setDataSize(formatDataSize(e.target.value))
            setDescription(formatDescription(fipNumber, e.target.value))
          }}
          value={addyList}
          size="small"
        />
        <QuantityTextField
          id="tokenQuantityList"
          multiline
          label="Lista con cantidad de Tokens"
          variant="outlined"
          onChange={(e) => {
            setTokenAmountList(e.target.value)
            setAddyList(addyList)
            setTarget(formatTarget(addyList))
            setValue(formatValue(addyList))
            setSubmitListData(formatData(addyList, e.target.value))
            setDataSize(formatDataSize(addyList))
            setDescription(formatDescription(fipNumber, addyList))
          }}
          value={tokenAmountList}
          size="small"
        />
        <Button 
        variant="outlined"
        className="m-5"
        onClick={(e) => setShowAirdropData(true)}>
          Crear datos de la transa
        </Button>
        </Stack>
        {
          showAirdropData ? 
          (
            <Stack 
          className="flex items-center row p-10">
        Datos pa la transa
        <QuantityTextField
          fullWidth
          id="contractTarget"
          multiline
          variant="filled"
          label="contractTarget"
          disabled
          value={target}
          size="medium"
      />
      <QuantityTextField
          fullWidth
          id="contractValue"
          multiline
          variant="filled"
          label="contractValue"
          disabled
          value={value}
          size="medium"
      />
      <QuantityTextField
          fullWidth
          id="contractData"
          multiline
          variant="filled"
          label="contractData"
          disabled
          value={submitListData}
          size="medium"
      />
      <QuantityTextField
          fullWidth
          id="contractDataSize"
          variant="filled"
          multiline
          label="contractDataSize"
          disabled
          value={dataSize}
          size="medium"
      />
      <QuantityTextField
          fullWidth
          variant="filled"
          id="contractDescription"
          multiline
          label="contractDescription"
          disabled
          value={description}
          size="medium"
      />
        </Stack>
          )
          :
          <div/>
        }
        
      </div>
      
        
        
  )
}

export default MintNft;
