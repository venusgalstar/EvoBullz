// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.10;

import "./EvoBullNFT.sol";
import "./EvoToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EvoManager is Ownable {

    struct StakingInfo {
        uint256 tokenId;
        string tokenHash;
        address currentOwner;
        uint256 startTime;
        uint256 interval;
        uint24 royaltyRatio;
        uint8 kindOfCoin;
    }

    address evoManagerAddress;
    address evoNFTaddress;
    address evoTokenAddress;
    EvoBullNFT evoNFT;
    EvoToken evoToken;

    uint _StakingIdCounter;
    bool _status;
    uint256 private _mintingFee;

    mapping(uint => StakingInfo) _allStakingInfo;
    mapping(string => uint) _getStakingId;
    mapping(string => bool) _tokenHashExists;

    modifier nonReentrant() {
        require(_status != true, "ReentrancyGuard: reentrant call");
        _status = true;
        _;
        _status = false;
    }

    constructor(address _nftAddress, address _evoAddress, uint256 _minFee) {
        evoManagerAddress = msg.sender;
        evoNFTaddress = _nftAddress;
        evoTokenAddress = _evoAddress;
        _mintingFee = _minFee;
        _StakingIdCounter = 0;
        _status = false;
    }

    function setEvoNFTaddress(address _addr) external onlyOwner{
        require(_addr != address(0), "Invalid address...");
        evoNFTaddress = _addr;
    }

    function getEvoNFTAddress() view external returns(address){
        return evoNFTaddress;
    }

    function setEvoTokenAddress(address _addr) external onlyOwner{
        require(_addr != address(0), "Invalid address...");
        evoTokenAddress = _addr;
    }

    function getEvoTokenAddress() view external returns(address){
        return evoTokenAddress;
    }

    function setMintingFee(uint256 _amount) external onlyOwner {
        require(_amount >= 0, "Too small amount");
        _mintingFee = _amount;
    }

    function getMintingFee()  view external returns(uint256) {
        return _mintingFee;
    }

    function mintSingleNFT(string memory _tokenHash) external payable nonReentrant {
        require(msg.value >= _mintingFee, "Invalid price, price is less than minting fee.");
        require(!_tokenHashExists[_tokenHash], "Existing NFT hash value....");
        evoNFT = EvoBullNFT(evoNFTaddress);
        evoNFT.mint(msg.sender, _tokenHash);
        _tokenHashExists[_tokenHash] = true;
    }

    function mintMultipleNFT(string[] memory _tokenHashs) external payable nonReentrant {
        require(_tokenHashs.length > 0, "Invalid arguments, no hashes." );        
        require(msg.value >= _mintingFee * _tokenHashs.length, "Invalid price, price is less than minting fee * countOfUris");
        uint256 i;
        for (i = 0; i < _tokenHashs.length; i++) 
        {
            require(!_tokenHashExists[_tokenHashs[i]], "Existing NFT hash value....");
            _tokenHashExists[_tokenHashs[i]] = true;
        }
        evoNFT = EvoBullNFT(evoNFTaddress);
        evoNFT.batchMint(msg.sender, _tokenHashs);        
    }
    
    function getStakingInfo(string memory _tokenHash) public view returns (StakingInfo memory) {
        require(_tokenHashExists[_tokenHash], "Non-Existing NFT hash value....");

        return _allStakingInfo[_getStakingId[_tokenHash]];
    }

    function getWithdrawBalance(uint8 _kind) public  returns (uint256) {
        require(_kind >= 0, "Invalid cryptocurrency...");

        if (_kind == 0) {
          return address(this).balance;
        } else {
            evoToken = EvoToken(evoTokenAddress);
          return evoToken.balanceOf(address(this));
        }
    }

    function setOwner(address payable _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid input address...");
        evoManagerAddress = _newOwner;
        transferOwnership(evoManagerAddress);
    }

    function customizedTransfer(address payable _to, uint256 _amount, uint8 _kind) internal {
        require(_to != address(0), "Invalid address...");
        require(_amount >= 0, "Invalid transferring amount...");
        require(_kind >= 0, "Invalid cryptocurrency...");
        
        if (_kind == 0) {
          _to.transfer(_amount);
        } else {
            evoToken = EvoToken(evoTokenAddress);
          evoToken.transfer(_to, _amount);
        }
    }

    function withDraw(uint256 _amount, uint8 _kind) external onlyOwner {
        require(_amount > 0, "Invalid withdraw amount...");
        require(_kind >= 0, "Invalid cryptocurrency...");
        require(getWithdrawBalance(_kind) > _amount, "None left to withdraw...");

        customizedTransfer(payable(msg.sender), _amount, _kind);
    }

    function withDrawAll(uint8 _kind) external onlyOwner {
        require(_kind >= 0, "Invalid cryptocurrency...");
        uint256 remaining = getWithdrawBalance(_kind);
        require(remaining > 0, "None left to withdraw...");

        customizedTransfer(payable(msg.sender), remaining, _kind);
    }

    receive() payable external {

    }

    fallback() payable external {

    }

}
