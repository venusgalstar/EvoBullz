var NFT_abi = require("./interactWithSmartContract/EvoBullNFT.json");
var evoManager_abi = require("./interactWithSmartContract/EvoManager.json");
var evoToken_abi = require("./interactWithSmartContract/EvoToken.json");
var config = {
    baseUrl: "http://192.168.103.53/api/",    
    socketUrl: "http://192.168.103.53",
    imgUrl: "http://192.168.103.53/uploads/",
    chainId: 97, //Cronos testnet : 338, Cronos mainnet : 25,   bsctestnet : 97
    ipfsUrl: 'https://ipfs.infura.io/ipfs/',
    mainNetUrl: 'https://evm-cronos.crypto.org/',
    testNetUrl:  "https://data-seed-prebsc-1-s2.binance.org:8545/", 
    EvoNFTContractAddress : "0xE2Ee894EC56A80B8dBff5c8Cf3a2231594c2de98", //"0xdb94eA3522060c0283c681Ea645A1936C77A6EEb",
    EvoTokenContractAddress : "0x11dC21a7D5343B8AaAECEf61D763041761f42772",
    EvoManagerContractAddress : "0x08338772648BC2C9F93770C5e9723A759b1A201C",
    EvoNFTContractAbi : NFT_abi,
    EvoTokenContractAbi : evoToken_abi,
    EvoManagerContractAbi : evoManager_abi
}

export default config;
