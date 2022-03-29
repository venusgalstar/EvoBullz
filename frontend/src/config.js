var evoNFT_abi = require("./interactWithSmartContract/EvoBullNFT.json");
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
    EvoNFTContractAddress : "0x6eC307991344c2E72EeBF37C04BA75047C19999D", 
    EvoTokenContractAddress : "0x003DC66C355f8296902835d0a80F927fC3bBF58D",
    EvoManagerContractAddress : "0x24Ae69005E29841402650062007B65A1cc045c7a",
    MoralisAPIKey: "YEEwMh0B4VRg6Hu5gFQcKxqinJ7UizRza1JpbkyMgNTfj4jUkSaZVajOxLNabvnt",
    EvoNFTContractAbi : evoNFT_abi,
    EvoTokenContractAbi : evoToken_abi,
    EvoManagerContractAbi : evoManager_abi, 
    NFT_MAX_MINT: 100,
    MINTING_FEE_PER_NFT: 0.05
}

export default config;
