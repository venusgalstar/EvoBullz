import Web3 from "web3";
import store from '../store';
import config from "../config";
import create from "ipfs-http-client";
import {setConnectedWalletAddress, setWalletStatus, setConnectedChainId, updateBalanceOfUser} from "../store/actions/auth.actions"; 
import { setNFTTradingResult } from "../store/actions/nft.actions";

export const loadWeb3 = async () => 
{
  if (window.ethereum) 
  {
    window.web3 = new Web3(window.ethereum);
    window.web3.eth.handleRevert = true;
  } 
  else if (window.web3) 
  {
    window.web3 = new Web3(Web3.givenProvider);
    window.web3.eth.handleRevert = true;
  } 
  else {
    // window.alert(
    //   "Non-Ethereum browser detected. Please connect and unlock your wallet."
    // );
    return;
  }
  if (window.ethereum) {
    window.ethereum.on('chainChanged', function (chainId) {
      checkNetworkById(chainId);

    });
    window.web3.eth.getChainId().then((chainId) => {
      checkNetworkById(chainId);

    })
    window.ethereum.on('disconnect', function(error  /*:ProviderRpcError*/) {
      //alert("disconnected, " + error);      
      store.dispatch(setConnectedWalletAddress(0))
      store.dispatch(setWalletStatus(false));
    });
    window.ethereum.on('accountsChanged', function(accounts /*: Array<string>*/) {
      //  alert("wallet "+accounts[0]+" is connected");
       if(accounts[0]   !== undefined)
       {
        store.dispatch(setConnectedWalletAddress(accounts[0]))
        store.dispatch(setWalletStatus(true));
       }
       if(accounts.length === 0) store.dispatch(setWalletStatus(false));
    });
  }
};

export const checkNetwork = async () => {
  if (window.web3) {
    const chainId = await window.web3.eth.getChainId();
    return checkNetworkById(chainId);
  }
}

export const checkNetworkById = async (chainId) => {
  if (window.web3.utils.toHex(chainId) !== window.web3.utils.toHex(config.chainId)) 
  {
    await changeNetwork();      
  }
  const cid = await window.web3.eth.getChainId();
  store.dispatch(setConnectedChainId(cid));
  return (window.web3.utils.toHex(cid) === window.web3.utils.toHex(config.chainId) )
}

const changeNetwork = async () => 
{
  try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: window.web3.utils.toHex(config.chainId) }],
      });
    } 
  catch (switchError) 
    {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) 
      {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: window.web3.utils.toHex(config.chainId),
                chainName: 'Cronos',
                rpcUrls: [config.testNetUrl] /* ... */,
              },
            ],
          });
          return {
            success : true,
            message : "switching succeed"
          }
        } catch (addError) {          
          return {
            success : false,
            message : "Switching failed." + addError.message
          }
        }
      }
    }
}

export const connectWallet = async () => 
{
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        success: true,
        message: "Metamask successfuly connected.",
        address: addressArray[0],
      };
      checkNetwork();
      store.dispatch(setWalletStatus(true));
      return obj;
    } catch (err) {
      store.dispatch(setWalletStatus(false));
      return {
        success: false,
        address: "",
        message: err.message,
      };
    }
  }
  else {
    store.dispatch(setWalletStatus(false));
    return {
      success: false,
      address: "",
      message: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual BSC wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getValidWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        store.dispatch(setWalletStatus(true));
        return {
          success: true,
          address: addressArray[0],
          status: "Fill in the text-field above.",
        };
      } else {
        store.dispatch(setWalletStatus(false));
        return {
          success: false,
          address: "",
          status: "🦊 Please connect to Metamask.",
        };
      }
    } catch (err) {
      store.dispatch(setWalletStatus(false));
      return {
        success: false,
        address: "",
        status: err.message,
      };
    }
  } else {
    store.dispatch(setWalletStatus(false));
    return {
      success: false,
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual BSC wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getBalanceOfAccount = async (address) => 
{
  try {
    //let accounts = await web3.eth.getAccounts();

    let accountBalance = await window.web3.eth.getBalance(address);

    accountBalance = window.web3.utils.fromWei(accountBalance);

    store.dispatch(updateBalanceOfUser(accountBalance));

    return {
      success: true,
      account: address,
      balance: accountBalance
    }
  } catch (error) {
    
    store.dispatch(updateBalanceOfUser(0));

    return {
      success: false,
      balance: 0,
      result: "Something went wrong: " + parseErrorMsg(error.message)
    }
  }
}

export const compareWalllet = (first, second) => 
{
  if (!first || !second) {
    return false;
  }
  if (first.toUpperCase() === second.toUpperCase()) {
    return true;
  }
  return false;
}

const updateUserBalanceAfterTrading = async (currentAddr) =>
{
  let balanceOfUser = await window.web3.eth.getBalance(currentAddr);
  balanceOfUser = window.web3.utils.fromWei(balanceOfUser);
  store.dispatch(updateBalanceOfUser(balanceOfUser));
}

const parseErrorMsg = (errMsg) =>
{  
  var returStr  = "";
  let startPos = JSON.stringify(errMsg).search("message");
  if(startPos >= 0)
  {
    let subStr = errMsg.substring(startPos+4, errMsg.length)
    let endPos = subStr.indexOf("\"");
    if(endPos >= 0)
    {
      subStr = subStr.substring(0, endPos);
      returStr = subStr;
    }
  }else returStr = errMsg;
  return returStr;
}

export const createNftFile = async (file, title, description) => {
    const client = create('https://ipfs.infura.io:5001/api/v0')
    try {
      const image_hash = await client.add(file);
      const metadata = JSON.stringify({
        name: title,
        description: description,
        image: config.ipfsUrl + image_hash.cid.toString()
      });
      const meta_hash = await client.add(metadata);
      const token_uri = config.ipfsUrl + meta_hash.cid.toString();
      return {
        success: true,
        image_uri: config.ipfsUrl + image_hash.cid.toString(),
        token_uri: token_uri
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error uploading file: ' + error
      }
    }
  };

  export const mintMultipleNFT = async (currentAddr, tokenUris, fee) => 
  {
    /*
     Multiple mint :  mintMultipleNFT(string[] memory tokenUris)
    */
      
    try 
    {
      let EvoManagerContract = await new window.web3.eth.Contract(config.EvoManagerContractAbi, config.EvoManagerContractAddress);
      let minting_fee = window.web3.utils.toWei(fee !== null ? fee.toString() : '0', 'ether');
      
      var mintMultipleNFT = EvoManagerContract.methods.mintMultipleNFT(tokenUris);
      let gasFee = await mintMultipleNFT.estimateGas({ from: currentAddr, value: minting_fee });
      var balanceOfUser = await window.web3.eth.getBalance(currentAddr);
      var gasPrice = 30 * (10 ** 9);
  
      if (balanceOfUser <= gasFee * gasPrice) {
        store.dispatch(setNFTTradingResult("mintMultipleNFT", false, "Insufficient balance." ));
      
        return {
          success : false,
          message : "Insufficient balance."
        }
      }
      await mintMultipleNFT.send({ from: currentAddr, value: minting_fee });
  
      store.dispatch(setNFTTradingResult("mintMultipleNFT", true, "Succeed in put on sale"));
  
      updateUserBalanceAfterTrading(currentAddr);
  
      return {
        success : true,
        message : "Succeed on minting a item"
      }
    } catch (error) {
      store.dispatch(setNFTTradingResult("mintMultipleNFT", false, parseErrorMsg(error.message) ));
  
      return {
        success : false,
        message : parseErrorMsg(error.message)
      }
    }
  }
  
