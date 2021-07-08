// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract NFTMock is ERC721, Ownable {
    // solhint-disable-next-line no-empty-blocks
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    function getChainId() external view returns (uint256) {
        return block.chainid;
    }
}
