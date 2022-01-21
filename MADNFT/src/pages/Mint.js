import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import MintForm from '../components/MintForm';

function Mint() {
  return (
    <ChakraProvider theme={theme}>
      <MintForm />
    </ChakraProvider>
  );
}

export default Mint;
