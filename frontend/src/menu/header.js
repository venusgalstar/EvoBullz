import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "../utilities/isEmpty";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from "@mui/material";
import { connectWallet } from '../interactWithSmartContract';
import { setConnectedWalletAddress } from '../store/actions/auth.actions';
import { setEvoNFTList } from '../store/actions/nft.actions';
import axios from 'axios';
import config from '../config';

const connectTheme = createTheme({
    palette: {
      primary: {
        main: "#ffbd59",
      },
    },
  });

const Header= function() {
  
  const [compressedAddress, setCompressedAddress] = useState("");

  const account = useSelector(state => state.auth.currentWallet);
  const walletStatus = useSelector(state => state.auth.walletStatus);
  const nftOperationResult = useSelector( state => state.nft.tradingResult );
  const dispatch = useDispatch();

  useEffect(() =>
  {    
    if(isEmpty(account)) return;
    let compAddress = "";
    compAddress = account.substring(0, 6)+"..."+account.substring(account.length-4, account.length);
    setCompressedAddress(compAddress);
  }, [account])

  const ConnectWallet = async () => {
    let connection = await connectWallet();
    if(connection.success === true) dispatch(setConnectedWalletAddress(connection.address));
  }

  const DisconnectWallet = () =>
  {

  }
  
  useEffect(() => 
  {
    if(isEmpty(account)) return;
    let compAddress = "";
    compAddress = account.substring(0, 6)+"..."+account.substring(account.length-4, account.length);
    setCompressedAddress(compAddress);
    async function init() {
      const res = await axios.get("https://deep-index.moralis.io/api/v2/" + account + "/nft/" + config.EvoNFTContractAddress + "?chain=bsc%20testnet&format=decimal", {
        headers: { "X-API-Key": "YEEwMh0B4VRg6Hu5gFQcKxqinJ7UizRza1JpbkyMgNTfj4jUkSaZVajOxLNabvnt" },
      });
      const nftlist = res.data.result;
      if(nftlist && nftlist.length>0)
      {
        let nftItems = [];
        nftlist.forEach(item => {
          if(item.token_address.toLowerCase() === config.EvoNFTContractAddress.toLowerCase() ) 
            nftItems.push(item);
        });

        dispatch(setEvoNFTList(nftItems));
      }
    }
    init();
  }, [account, nftOperationResult, dispatch])

  return (
     <div className='header padder-50' style={{ justifyContent: "flex-end" }}>
        <ThemeProvider theme={connectTheme}>
          {walletStatus === false && <Button variant="contained" color="primary" className="btn_connect" onClick={() => ConnectWallet() }>Connect Wallet</Button>}
          {walletStatus === true &&  <Button variant="contained" color="primary" className="btn_connect" onClick={() => DisconnectWallet() }>{compressedAddress}</Button>}
        </ThemeProvider>      
      </div>
    );
}
export default Header;