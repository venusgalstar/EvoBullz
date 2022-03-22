// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EvoBullNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(string => uint256) _getNFTId;

    constructor() ERC721("EvoBullNFT", "EBNFT") {

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
        setTokenURI(nftId, _tokenURI);

        return nftId;
    }
    
    function batchMint(address recipient, string[] memory _tokenURIArry)  external  returns (uint256[] memory) {        
        require(_tokenURIArry.length > 0, "Invalid arguments, no uris." );
        uint256 len = _tokenURIArry.length;
        uint256 i; 
        uint256[] memory nftIds = new uint256[](len);
        for(i = 0; i < len; i++)
        {
            _tokenIds.increment();

            uint256 nftId = _tokenIds.current(); 
            _mint(recipient, nftId);
            _getNFTId[_tokenURIArry[i]] = nftId;
            setTokenURI(nftId, _tokenURIArry[i]);
            nftIds[i] = nftId;
        }
        return nftIds;
    }
}