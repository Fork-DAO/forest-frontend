import React, {useState, useEffect} from 'react';
let Web3 = require('web3');

function Index() {

  const [web3, setWeb3] = useState(null)
  const [address, setAddress] = useState(null)
  const [contract, setContract] = useState(null)

  let abi =[{"inputs":[{"internalType":"uint256","name":"_maxSupply","type":"uint256"},{"internalType":"uint256","name":"_unitPrice","type":"uint256"},{"internalType":"address payable","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ConstructorParamsInvalid","type":"error"},{"inputs":[{"internalType":"uint256","name":"_maxSupply","type":"uint256"}],"name":"MaxSupplyReached","type":"error"},{"inputs":[{"internalType":"uint256","name":"_expectedPaymentAmount","type":"uint256"},{"internalType":"uint256","name":"_actualPaymentAmount","type":"uint256"}],"name":"PaymentAmountInvalid","type":"error"},{"inputs":[],"name":"PaymentFailed","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"_mintQuantity","type":"uint256"}],"name":"PreMint","type":"event"},{"inputs":[{"internalType":"uint256","name":"_mintQuantity","type":"uint256"}],"name":"preMint","outputs":[],"stateMutability":"payable","type":"function"}] // Paste your ABI here
  let contractAddress = "0xCd7Ed93D4b95c9F93Ca7e2b4B8960Bd577A0DF9C";

  useEffect(() => {
    window.ethereum ?
      ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
        setAddress(accounts[0])
        let w3 = new Web3(ethereum)
        setWeb3(w3)

        let c = new w3.eth.Contract(abi, contractAddress)
        setContract(c)

        preMint()

      }).catch((err) => console.log(err))
    : console.log("Please install MetaMask")
  }, [address])

  function preMint(){
    let _price = web3.utils.toWei("0.000000000000000001");
    let encoded = contract.methods.preMint(2).encodeABI()

    let tx = {
        from: address,
        to : contractAddress,
        data : encoded,
        nonce: "0x00",
        value: web3.utils.numberToHex(_price)
    }

    let txHash = ethereum.request({
        method: 'eth_sendTransaction',
        params: [tx],
    }).then((hash) => {
        alert("You can now view your transaction with hash: " + hash)
    }).catch((err) => console.log(err))
    
    return txHash
  }

    return (
      <div>
        Address: {address}
      </div>
    )
}

export default Index