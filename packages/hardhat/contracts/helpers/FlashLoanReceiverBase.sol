// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import { IFlashLoanReceiver } from "../interfaces/IFlashLoanReceiver.sol";
import { ILendingPoolAddressesProvider } from "../interfaces/ILendingPoolAddressesProvider.sol";
import { ILendingPool } from "../interfaces/ILendingPool.sol";

/**
    !!!
    Never keep funds permanently on your FlashLoanReceiverBase contract as they could be
    exposed to a 'griefing' attack, where the stored funds are used by an attacker.
    !!!
 */
abstract contract FlashLoanReceiverBase is IFlashLoanReceiver {
  ILendingPoolAddressesProvider public immutable override ADDRESSES_PROVIDER;
  ILendingPool public immutable override LENDING_POOL;

  constructor(ILendingPoolAddressesProvider provider) {
    ADDRESSES_PROVIDER = provider;
    LENDING_POOL = ILendingPool(provider.getLendingPool());
  }
}
