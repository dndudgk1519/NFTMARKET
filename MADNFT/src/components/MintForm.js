import React, { useState, useContext } from 'react';
import MADNFTContext from '../contractconnect/MADNFT-context.js';
import { Button, Center } from '@chakra-ui/react';
import { Buffer } from 'buffer';
import { useWeb3React } from '@web3-react/core';
import { MADTOKEN_ADDRESS } from '../constants/address';
import { ethers } from 'ethers';
// import { InnerLayout } from '../Layouts';
// import { contractABI } from '../abis/MADTOKEN.json';

import { InjectedConnector } from '@web3-react/injected-connector';
// import { useWeb3React } from '@web3-react/core';

const contractABI = require('../abis/MADTOKEN.json');
//ipfs 설정
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});
const ROPSTEN_PRIVATE_KEY =
  '0x61f8851ecd6ff6fb0c13639d55ffd0e1b4bbabcb210fcd0014095395c31c117f'; //공용계정

const MintForm = () => {
  const injected = new InjectedConnector({
    supportedChainIds: [
      1, // Main net
      3, // Ropsten
      4, // Rinkeby
      5, // Goerli
      42, // Kovan
    ],
  });

  console.log(MADTOKEN_ADDRESS);

  const {
    active,
    account,
    library,
    connector,
    activate,
    deactivate,
  } = useWeb3React();

  // Meta Mask Connect
  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  // Meta Mask DisConnect
  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const myContract = new ethers.Contract(
    MADTOKEN_ADDRESS,
    contractABI.abi,
    provider
  );
  console.log(contractABI.abi);
  console.log('mycont :' + myContract.address);

  const signer = new ethers.Wallet(`${ROPSTEN_PRIVATE_KEY}`, provider);
  const contractWithSigner = myContract.connect(signer);
  console.log(signer);

  const [enteredName, setEnteredName] = useState('');
  const [descriptionIsValid, setDescriptionIsValid] = useState(true);

  const [enteredDescription, setEnteredDescription] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);

  const [capturedFileBuffer, setCapturedFileBuffer] = useState(null);
  const [fileIsValid, setFileIsValid] = useState(true);

  const madnftCtx = useContext(MADNFTContext);

  const enteredNameHandler = event => {
    setEnteredName(event.target.value);
  };

  const enteredDescriptionHandler = event => {
    setEnteredDescription(event.target.value);
  };

  const captureFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      console.log(reader.result);
      setCapturedFileBuffer(Buffer(reader.result));
    };
  };

  const submissionHandler = event => {
    event.preventDefault();

    enteredName ? setNameIsValid(true) : setNameIsValid(false);
    enteredDescription
      ? setDescriptionIsValid(true)
      : setDescriptionIsValid(false);
    capturedFileBuffer ? setFileIsValid(true) : setFileIsValid(false);

    const formIsValid = enteredName && enteredDescription && capturedFileBuffer;

    // Upload file to IPFS and push to the blockchain
    const mintNFT = async () => {
      //모든 항목을 넣고 mint 버튼을 누르면 비동기적으로 수행되는 로직
      // Add file to the IPFS
      console.log('mintNFT');
      const fileAdded = await ipfs.add(capturedFileBuffer);
      console.log('fileHash : ' + fileAdded.path);
      if (!fileAdded) {
        console.error('Something went wrong when updloading the file');
        return;
      }

      const metadata = {
        title: 'Asset Metadata',
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: enteredName,
          },
          description: {
            type: 'string',
            description: enteredDescription,
          },
          image: {
            type: 'string',
            description: fileAdded.path,
          },
        },
      };

      const metadataAdded = await ipfs.add(JSON.stringify(metadata));
      if (!metadataAdded) {
        console.error('Something went wrong when updloading the file');
        return;
      }
      console.log('metadataAdded : ' + metadataAdded.path);
      // console.log('address : ' + metadataAdded.image.description);

      try {
        let result = await contractWithSigner.safeMint(
          account,
          metadataAdded.path
        );
        console.log('mint hash : ', result.hash);
      } catch (e) {
        console.log(e instanceof TypeError); // true
        console.log(e.message); // "null has no properties"
        console.log(e.name); // "TypeError"
        console.log(e.fileName); // "Scratchpad/1"
        console.log(e.lineNumber); // 2
        console.log(e.columnNumber); // 2
        console.log(e.stack); // "@Scratchpad/2:2:3\n"
      }
      // await myContract.safeMint(connector,metadataAdded)
      // madnftCtx.contract.methods.safeMint(metadataAdded.path,web3.utils.toWei(enteredPrice)).send({ from: web3Ctx.account })
      // let result = await contractWithSigner.safeMint(connector, metadataAdded);
      // console.log(result.hash);
    };

    console.log(formIsValid);
    formIsValid && mintNFT();
  };

  const nameClass = nameIsValid ? 'form-control' : 'form-control is-invalid';
  const descriptionClass = descriptionIsValid
    ? 'form-control'
    : 'form-control is-invalid';
  const fileClass = fileIsValid ? 'form-control' : 'form-control is-invalid';

  return (
    // <InnerLayout>
    //   <form onSubmit={submissionHandler}>
    //     <div className="row justify-content-center">
    //       <div className="col-md-2">
    //         <input
    //           type="text"
    //           className={`${nameClass} mb-1`}
    //           placeholder="Name..."
    //           value={enteredName}
    //           onChange={enteredNameHandler}
    //         />
    //       </div>

    //       <div className="col-md-6">
    //         <input
    //           type="text"
    //           className={`${descriptionClass} mb-1`}
    //           placeholder="Description..."
    //           value={enteredDescription}
    //           onChange={enteredDescriptionHandler}
    //         />
    //       </div>
    //       <div className="col-md-2">
    //         <input
    //           type="file"
    //           className={`${fileClass} mb-1`}
    //           onChange={captureFile}
    //         />
    //       </div>
    //     </div>
    //     <Button type="submit" colorScheme="teal" size="sm">
    //       MINT
    //     </Button>
    //     <br />
    //     <br />
    //   </form>
    // </InnerLayout>
    <div className="Minter">
      {/* <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          'Connected: ' +
          String(walletAddress).substring(0, 6) +
          '...' +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button> */}

      <br></br>
      <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form onSubmit={submissionHandler}>
        <h2>🖼 Link to asset: </h2>
        {/* <input type="file" onChange={captureFile} /> */}
        <input
          type="file"
          className={`${fileClass} mb-1`}
          onChange={captureFile}
        />
        <h2>🤔 Name: </h2>
        {/* <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={event => setName(event.target.value)}
        /> */}
        <input
          type="text"
          className={`${nameClass} mb-1`}
          placeholder="Name..."
          value={enteredName}
          onChange={enteredNameHandler}
        />
        <h2>✍️ Description: </h2>
        {/* <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={event => setDescription(event.target.value)}
        /> */}
        <input
          type="text"
          className={`${descriptionClass} mb-1`}
          placeholder="Description..."
          value={enteredDescription}
          onChange={enteredDescriptionHandler}
        />
        <Button type="submit" colorScheme="teal" size="sm">
          MINT
        </Button>
      </form>
      <div>
        <div>메타마스크 계정 체크하기</div>
        <Button
          type="submit"
          colorScheme="teal"
          size="sm"
          onClick={connect}
          className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
          name={'connect'}
        >
          connect
        </Button>
        <br></br>
        <Button
          type="submit"
          colorScheme="teal"
          size="sm"
          onClick={disconnect}
          className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
          name={'Disconnect'}
        >
          Disconnect
        </Button>
        {active ? (
          <span>
            Connected with <b>{account}</b>
          </span>
        ) : (
          <div>
            <span>Not connected</span>
          </div>
        )}
        <br></br>
      </div>

      {/* <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button> */}
      {/* <p id="status">{status}</p> */}
    </div>
  );
};

export default MintForm;
