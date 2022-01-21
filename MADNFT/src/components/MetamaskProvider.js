import React, { useEffect, useState } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';

function MetamaskProvider({ children }) {
  const Injected = new InjectedConnector({
    supportedNetworks: [1, 3, 4, 5, 42],
  });
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    Injected.isAuthorized()
      .then(isAuthorized => {
        setLoaded(true);
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(Injected);
        }
      })
      .catch(() => {
        setLoaded(true);
      });
  }, [activateNetwork, networkActive, networkError]);
  if (loaded) {
    return children;
  }
  return <>Loading</>;
}

export default MetamaskProvider;
