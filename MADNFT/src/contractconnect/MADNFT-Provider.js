import { useReducer } from "react";
import MADNFTContext from './MADNFT-context';

const defaultMADNFTState = {
    contract: null,
};

const MADNFTReducer=(state, action)=> {
    if(action.type === 'CONTRACT') {    
        return {
          contract: action.contract,
          collection:state.collection
        };
      }
    
    return defaultMADNFTState;
}

const MADNFTProvider = props =>{
    const [CollectionState, dispatchNFTAction] = useReducer(MADNFTReducer, defaultMyNFTState);

    const loadContractHandler = (web3, abi, address) => {
    console.log("MyNFT Contract is load!!");
    const contract = address ? new web3.eth.Contract(abi, address): '';
    dispatchNFTAction({type: 'CONTRACT', contract: contract}); 
    return contract;
  };
  
  const MADNFTContext = {
    contract: CollectionState.contract,
    loadContract: loadContractHandler,
  };
  return (
    <MADNFTContext.Provider value={MADNFTContext}>
      {props.children}
    </MADNFTContext.Provider>
  );
}

