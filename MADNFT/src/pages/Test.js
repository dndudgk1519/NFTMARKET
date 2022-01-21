import React from 'react';
import { ThemeProvider, ColorModeProvider } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

const Test = ({ children }) => (
  <ThemeProvider>
    <ColorModeProvider>{children}</ColorModeProvider>
  </ThemeProvider>
);
