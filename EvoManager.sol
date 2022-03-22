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

    mapping(uint => StakingInfo) _allStakingInfo;
    mapping(string => uint) _getStakingId;
    mapping(string => bool) _tokenHashExists;
    mapping(address => uint256) _mintingFees;

    modifier nonReentrant() {
        require(_status != true, "ReentrancyGuard: reentrant call");
        _status = true;
        _;
        _status = false;
    }

    constructor(address _nftAddress, address _evoAddress) {
        evoManagerAddress = msg.sender;
        evoNFTaddress = _nftAddress;
        evoTokenAddress = _evoAddress;
        _StakingIdCounter = 0;
        _status = false;
    }

    function mintSingleNFT(string memory _tokenHash) external payable  {
        require(!_tokenHashExists[_tokenHash], "Existing NFT hash value....");
        evoNFT = EvoBullNFT(evoNFTaddress);
        evoNFT.mint(msg.sender, _tokenHash);
        _tokenHashExists[_tokenHash] = true;
    }

    function mintMultipleNFT(string[] memory _tokenHashs) external payable  {
        for (uint256 i = 0; i < _tokenHashs.length; i++) {
            require(!_tokenHashExists[_tokenHashs[i]], "Existing NFT hash value....");
            evoNFT = EvoBullNFT(evoNFTaddress);
            evoNFT.mint(msg.sender, _tokenHashs[i]);
            _tokenHashExists[_tokenHashs[i]] = true;
        }
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

    function setMintingFee(address _creater, uint256 _amount) external onlyOwner {
        require(_creater != address(0), "Invalid input address...");
        require(_amount >= 0, "Too small amount");
        _mintingFees[_creater] = _amount;
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
