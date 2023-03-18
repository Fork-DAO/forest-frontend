import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Layout from '../components/Layout';
import MintNftButton from '../components/MintNftButton';

const contractAddress = "0x466b832D391cD52E066A8fFc88c39a1fa4547112";
const abi = [{ "inputs": [{ "internalType": "uint256", "name": "_maxSupply", "type": "uint256" }, { "internalType": "uint256", "name": "_unitPrice", "type": "uint256" }, { "internalType": "address payable", "name": "_treasury", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ConstructorParamsInvalid", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "_maxSupply", "type": "uint256" }], "name": "MaxSupplyReached", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "_expectedPaymentAmount", "type": "uint256" }, { "internalType": "uint256", "name": "_actualPaymentAmount", "type": "uint256" }], "name": "PaymentAmountInvalid", "type": "error" }, { "inputs": [], "name": "PaymentFailed", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_buyer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_mintQuantity", "type": "uint256" }], "name": "PreMint", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "_mintQuantity", "type": "uint256" }], "name": "preMint", "outputs": [], "stateMutability": "payable", "type": "function" }] // Paste your ABI here

// function PreMint(props) {
//   return (
//     <div>
//       <p>{props.address}</p>
//       <button onClick={props.onClick}>
//         PreMint
//       </button>
//     </div>
//   );
// }

// function Index() {

//   const [web3, setWeb3] = useState(null);
//   const [address, setAddress] = useState(null);
//   const [contract, setContract] = useState(null);

//   useEffect(() => {
//     window.ethereum ?
//       ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
//         setAddress(accounts[0])
//         const w3 = new Web3(ethereum)
//         setWeb3(w3)

//         const c = new w3.eth.Contract(abi, contractAddress)
//         setContract(c)

//       }).catch((err : Error) => console.log(err))
//     : console.log("Please install MetaMask")
//   }, [address, web3, contract])

//   function preMint() {
//     const price = 1;
//     const mintAmount = 1;
//     const encoded = contract.methods.preMint(mintAmount).encodeABI()
//     const totalPrice = price * mintAmount;

//     let tx = {
//         from: address,
//         to : contractAddress,
//         data : encoded,
//         value: web3.utils.numberToHex(totalPrice)
//     }

//     let txHash = ethereum.request({
//         method: 'eth_sendTransaction',
//         params: [tx],
//     }).then((hash) => {
//         alert("You can now view your transaction with hash: " + hash)
//     }).catch((err : Error) => console.log(err))

//     return txHash
//   }

//   return (
//     <div>
//       {address ? <PreMint address={address} onClick={preMint} /> : <h1> You need to connect your wallet in order to premint the NFT</h1> }
//     </div>
//   )
// }

const Index = () => {
  const { address } = useAccount();
  const [hasConnected, setHasConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [address]);

  return (
    <Layout setHasConnected={setHasConnected}>
      <div className="flex flex-col justify-center items-center">
        {(hasConnected || address) && !loading ?
          <MintNftButton />
          :
          "Please, connect wallet."}

      </div>;

    </Layout>)
}

export default Index;