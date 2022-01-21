import React, { useContext, useEffect } from 'react';

// import web3 from './connection/web3';
// import Web3Context from './store/web3-context';
// import FundingContext from './store/collection-context';
// import MadToken from './abis/MADTOKEN.json';

import { address } from './constants/address';

import { ChakraProvider, theme } from '@chakra-ui/react';
// import MainArea from './pages/MainArea';
// import BodyContent from './pages/BodyContent';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import MetamaskProvider from './components/MetamaskProvider';
// import Main from './components/Main';
import MintForm from './components/MintForm';
// import Collections from './components/Collections';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000; //
  return library;
}

function App() {
  // const App = () => {
  //   const web3Ctx = useContext(Web3Context);
  //   const fundingCtx = useContext(FundingContext);

  return (
    <ChakraProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MetamaskProvider>
          {/* -- component -- */}
          {/* <MainArea />
          <BodyContent /> */}
          <MintForm />
          {/* <Collections /> */}
          {/* <Collections /> */}
          {/* -- component -- */}
        </MetamaskProvider>
      </Web3ReactProvider>
    </ChakraProvider>
  );
}
export default App;
