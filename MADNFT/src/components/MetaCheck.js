import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Link,
  Button,
  theme,
  Menu,
  MenuButton,
  Center, //추가된 main page logo 가운데 정렬을 위한 import
  Divider, //main page logo 와 menu 버튼의 구분을 위한 Divider
} from '@chakra-ui/react';
// import Home from './pages/Home';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import { InnerLayout } from '../Layouts';
import CtaButton from '../components/CtaButton';

function MetaCheck() {
  const injected = new InjectedConnector({
    supportedChainIds: [
      1, // Main net
      3, // Ropsten
      4, // Rinkeby
      5, // Goerli
      42, // Kovan
    ],
  });

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

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

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <InnerLayout>
          <div>메타마스크 계정 체크하기</div>
        </InnerLayout>
        {active ? (
          <span>
            Connected with <b>{account}</b>
          </span>
        ) : (
          <InnerLayout>
            <span>Not connected</span>
          </InnerLayout>
        )}
        <br></br>
        <br></br>
        <CtaButton
          onClick={disconnect}
          className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
          name={'Disconnect'}
        ></CtaButton>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default MetaCheck;
