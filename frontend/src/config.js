var NFT_abi = require("./InteractWithSmartContract/EvoBullNFT.json");
var evoManager_abi = require("./InteractWithSmartContract/EvoManager.json");
var evoToken_abi = require("./InteractWithSmartContract/EvoToken.json");
var config = {
    baseUrl: "http://192.168.103.53/api/",    
    socketUrl: "http://192.168.103.53",
    imgUrl: "http://192.168.103.53/uploads/",
    chainId: 97, //Cronos testnet : 338, Cronos mainnet : 25,   bsctestnet : 97
    ipfsUrl: 'https://ipfs.infura.io/ipfs/',
    mainNetUrl: 'https://evm-cronos.crypto.org/',
    testNetUrl:  "https://data-seed-prebsc-1-s2.binance.org:8545/", 
    avaxUsdtPair: "0xed8cbd9f0ce3c6986b22002f03c6475ceb7a6256",
    EvoNFTContractAddress : "0xDb03711cC23c3E7C597835d469B0084b0254d2F9",
    EvoNFTContractAbi : NFT_abi,
    EvoManagerContractAbi : evoManager_abi,
    EvoTokenContractAbi : evoToken_abi
}

export default config;
