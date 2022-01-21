import React from 'react';

const MADNFTContext = React.createContext({
  contract: null,
  collection: [],
  loadContract: () => {},
  loadCollection: () => {},
//   updateTotalSupply: () => {},
//   updateCollection: () => {},
//   updateOwner: () => {},
//   setNftIsLoading: () => {}
});

export default MADNFTContext;