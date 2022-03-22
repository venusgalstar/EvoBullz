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
    EvoNFTContractAddress : "0x61b64f52a5888635677899B8ECD4B93D84e7b2e2",
    EvoTokenContractAddress : "0xF808a58963a052e3c14121d3B4E2C450B07ab778",
    EvoManagerContractAddress : "0xADCAFe3De8b507A52C73fB9E4335947ADDEAD77c",
    EvoNFTContractAbi : NFT_abi,
    EvoTokenContractAbi : evoToken_abi,
    EvoManagerContractAbi : evoManager_abi
}

export default config;
