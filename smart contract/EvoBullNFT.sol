// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EvoBullNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(string => uint256) _getNFTId;
    string base_uri;

    constructor() ERC721("EvoBullNFT", "EBNFT") {
        base_uri = "https://ipfs.infura.io/ipfs/QmZAQMqPBHTifSe1jGoCex3We2DAwGVsLpHARr5Sis5EnV/";
    }

    function getBaseuri() public view returns(string memory){
        return base_uri;
    }

    function setBaseUri(string memory _newUri) external returns(string memory){
        base_uri = _newUri;
        return base_uri;
    }

    function tranferNFT(address _from, address _to, string memory _tokenUri) external payable {
        transferFrom(_from, _to, _getNFTId[_tokenUri]);
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        return super.tokenURI(_tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        super._setTokenURI(tokenId, _tokenURI);
    }

    function mint(address recipient, string memory _tokenURI)  external  returns (uint256) {
         // require(msg.value == 0.5 ether);
         
        _tokenIds.increment();

        uint256 nftId = _tokenIds.current(); 
        _mint(recipient, nftId);
        _getNFTId[_tokenURI] = nftId;
        string memory fullUri = string.concat(base_uri, _tokenURI);
        setTokenURI(nftId, fullUri);

        return nftId;
    }
    
    function batchMint(address recipient, string[] memory _tokenURIArry)  external  returns (uint256[] memory) {        
        require(_tokenURIArry.length > 0, "Invalid arguments, no uris." );
        uint256 len = _tokenURIArry.length;
        uint256 i; 
        uint256[] memory nftIds = new uint256[](len);
        string memory fullUri;
        for(i = 0; i < len; i++)
        {
            _tokenIds.increment();

            uint256 nftId = _tokenIds.current(); 
            _mint(recipient, nftId);
            _getNFTId[_tokenURIArry[i]] = nftId;
            fullUri = string.concat(base_uri, _tokenURIArry[i]);
            setTokenURI(nftId, fullUri);
            nftIds[i] = nftId;
        }
        return nftIds;
    }
}