// import react, { useState } from 'react';
// import { MADTOKEN_ADDRESS } from '../constants/address';
// // import { useWeb3React } from '@web3-react/core';
// // import { InjectedConnector } from '@web3-react/injected-connector';
// import { ethers } from 'ethers';
// const contractABI = require('../abis/MADTOKEN.json');

// // const injected = new InjectedConnector({
// //   supportedChainIds: [
// //     1, // Main net
// //     3, // Ropsten
// //     4, // Rinkeby
// //     5, // Goerli
// //     42, // Kovan
// //   ],
// // });

// // console.log(MADTOKEN_ADDRESS);

// // // const {
// // //   active,
// // //   account,
// // //   library,
// // //   connector,
// // //   activate,
// // //   deactivate,
// // // } = useWeb3React();

// const provider = new ethers.providers.Web3Provider(window.ethereum);
// const myContract = new ethers.Contract(
//   MADTOKEN_ADDRESS,
//   contractABI.abi,
//   provider
// );

// console.log(contractABI.abi);
// console.log('mycont!!!! :' + myContract.address);

// const Collections = async () => {
//   // const signer = new ethers.Wallet(`${ROPSTEN_PRIVATE_KEY}`, provider);
//   // const contractWithSigner = myContract.connect(signer);
//   // console.log(signer);

//   let collection = [];
//   console.log('loadCollectionHandler is load!!');
//   const totalSupply = await myContract.methods.tokenID().call();
//   console.log('TotalSupply !!' + totalSupply);

//   for (let i = 0; i < totalSupply; i++) {
//     const hash = await myContract.methods._tokenURIs(i).call();
//     try {
//       const response = await fetch(`https://ipfs.infura.io/ipfs/${hash}?clear`);
//       console.log('ok');
//       if (!response.ok) {
//         throw new Error('Something went wrong');
//       }

//       const metadata = await response.json();
//       const owner = await myContract.methods.ownerOf(i).call();
//       // const price = await myContract.methods.prices(i).call();
//       // const fundingPot = await myContract.methods.fundingPot(i).call();
//       // console.log('price ', price);
//       // console.log('fundingPot ', fundingPot);
//       // contract에서 데이터를 가져옴
//       collection = [
//         {
//           id: i,
//           title: metadata.properties.name.description,
//           img: metadata.properties.image.description,
//           owner: owner,
//           // price: price,
//           // fundingPot: fundingPot,
//         },
//         ...collection,
//       ];
//     } catch {
//       console.error('Something went wrong');
//     }
//   }
//   console.log('collection:', collection);
//   // dispatchCollectionAction({ type: 'LOADCOLLECTION', collection: collection });

//   return <div>hi;</div>;
// };

// export default Collections;
