// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./LimitOrderProtocol.sol";
import "./EIP712Alien.sol";
import "./libraries/ArgumentsDecoder.sol";
import { FlashLoanReceiverBase } from "./helpers/FlashLoanReceiverBase.sol";
import { ILendingPoolAddressesProvider } from "./interfaces/ILendingPoolAddressesProvider.sol";
import { IProtocolDataProvider } from "./interfaces/IProtocolDataProvider.sol";
import {IStableDebtToken} from "./interfaces/IStableDebtToken.sol";
import "hardhat/console.sol";


contract SolarisMargin is Ownable, EIP712Alien, FlashLoanReceiverBase {
    using SafeERC20 for IERC20;
    using ArgumentsDecoder for bytes;
    using SafeMath for uint256;

    event OrderCreated(address indexed maker, bytes32 orderHash, uint256 amount);
    event OrderCancelled(bytes32 orderHash);
    event OrderNotified(bytes32 orderHash, uint256 amount);
    event OrderWithdrawn(bytes32 orderHash, uint256 amount);

    struct Order {
        address user;
        address asset;
        uint256 remaining;
        uint256 toWithdraw;
    }

    struct Position {
        uint256 id;
        uint8 direction; // 0 long, 1 short
        address collateral;
        address leveragedAsset;
        uint256 collateralAmount;
        uint256 leveragedAmount;
        address user;
    }

    bytes32 constant public LIMIT_ORDER_TYPEHASH = keccak256(
        "Order(uint256 salt,address makerAsset,address takerAsset,bytes makerAssetData,bytes takerAssetData,bytes getMakerAmount,bytes getTakerAmount,bytes predicate,bytes permit,bytes interaction)"
    );

    uint256 constant private _FROM_INDEX = 0;
    uint256 constant private _TO_INDEX = 1;
    uint256 constant private _AMOUNT_INDEX = 2;

    address private immutable _limitOrderProtocol;
    address private immutable _oneInchExchange;
    IProtocolDataProvider private immutable _dataProvider;

    mapping(bytes32 => Order) private _orders; // orderHash => Order
    mapping(address => Position[]) public positions;
    mapping(address => uint256) public positionsOpen;
    mapping(bytes32 => Position) public positionsByOrder; //orderHash => Position

    constructor(address limitOrderProtocol, address oneInchExchange, ILendingPoolAddressesProvider addressProvider, IProtocolDataProvider dataProvider)
    // constructor(address limitOrderProtocol, address oneInchExchange, ILendingPoolAddressesProvider addressProvider)
    EIP712Alien(limitOrderProtocol, "1inch Limit Order Protocol", "1")
    FlashLoanReceiverBase(addressProvider)
    {
        _limitOrderProtocol = limitOrderProtocol;
        _oneInchExchange = oneInchExchange;
        _dataProvider = dataProvider;
    }

    /// @notice creates leveraged position and stores asset, amount, user
    /// called after order creation
    function createOrder(bytes32 orderHash, address asset, uint256 amount) public {
        require(_orders[orderHash].user == address(0x0), "order is already exist");

        _orders[orderHash].user = msg.sender;
        _orders[orderHash].asset = asset;
        _orders[orderHash].remaining = amount; // unfilled amount of order
        emit OrderCreated(msg.sender, orderHash, amount);
    }

    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        int8 operation = abi.decode(params, (int8));
        if (operation == 0) {
            _executeLongLeverage(assets[0], amounts[0], premiums[0], params);
        } else if (operation == 1) {
            _executeCloseLong(assets[0], amounts[0], premiums[0], params);
        } else if (operation == 2) {
            _executeShortLeverage(assets[0], amounts[0], premiums[0], params);
        } else if (operation == 2) {
            _executeShortLeverage(assets[0], amounts[0], premiums[0], params);
        } else if (operation == 3) {
            _executeCloseShort(assets[0], amounts[0], premiums[0], params);
        }

        // necessary to repay the loan
        for (uint256 i = 0; i < assets.length; i++) {
            uint256 amountOwing = amounts[i].add(premiums[i]);
            IERC20(assets[i]).approve(address(LENDING_POOL), amountOwing);
        }
        return true;
    }

    function positionsLength(address sender) external view returns (uint256) {
        return positions[sender].length;
    }

    function longLeverage(
        address loanAsset,
        address positionAsset,
        uint256 amount,
        uint8 leverage,
        bytes calldata oneInchData,
        bytes32 orderHash
    ) public {
        console.log('Long leverage');
		//approve credit delegation
        (address aPositionAssetAddress, address stableDebtTokenAddress,) = _dataProvider.getReserveTokensAddresses(positionAsset);
        IStableDebtToken(stableDebtTokenAddress).approveDelegation(address(this), type(uint128).max);

		//approve collateral transfer
        IERC20(aPositionAssetAddress).approve(address(this), type(uint128).max);

        address receiverAddress = address(this);

        address[] memory assets = new address[](1);
        assets[0] = loanAsset;

        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;

        // 0 = no debt, 1 = stable, 2 = variable
        uint256[] memory modes = new uint256[](1);
        modes[0] = 0;

        address onBehalfOf = address(this);
        // bytes memory params = abi.encode(0, msg.sender, positionAsset, leverage, oneInchData);

        bytes memory params = abi.encode(0);

        uint16 referralCode = 0;

        // LENDING_POOL.flashLoan(receiverAddress, assets, amounts, modes, onBehalfOf, params, referralCode);
    }

    function _executeLongLeverage(
        address asset,
        uint256 amount,
        uint256 premium,
        bytes memory params
    ) private {
        // decode params
        // (, address sender, address positionAsset, uint8 leverage, bytes memory oneInchData) =
        //     abi.decode(params, (uint256, address, address, uint8, bytes));
        console.log('_executeLongLeverage');
        // // console.log(amount.div(leverage));
        // // console.log(asset);
        // // console.log(sender);
        // // console.log(IERC20(asset).balanceOf(sender));
        // // transfer collateral from user to contract
        // IERC20(asset).transferFrom(sender, address(this), amount.div(leverage));
        // // approve for 1inch
        // if (IERC20(asset).allowance(address(this), address(_oneInchExchange)) < amount.div(leverage)) {
        //     IERC20(asset).approve(address(_oneInchExchange), type(uint128).max);
        // }

        // // 1inch trade
        // (, bytes memory res) = _oneInchExchange.call(oneInchData);
        // uint256 balanceFrom1Inch = _toUint256(res);
        // if no aave allowance, approve
        // if (IERC20(positionAsset).allowance(address(this), address(LENDING_POOL)) < balanceFrom1Inch) {
        //     IERC20(positionAsset).approve(address(LENDING_POOL), type(uint128).max);
        // }

        IERC20(asset).approve(address(LENDING_POOL), type(uint128).max);

        // // console.log('before aave deposit');
        // // console.log('balanceFrom1Inch', balanceFrom1Inch);
        // // deposit collateral to aave on behalf of user
        // LENDING_POOL.deposit(positionAsset, balanceFrom1Inch, sender, 0);
        // console.log('after aave deposit');
        // LENDING_POOL.borrow(asset, amount.add(premium), 2, 0, sender);
        // // save position info in storage
        // Position memory newPosition =
        //     Position(positions[sender].length, 0, asset, positionAsset, amount, balanceFrom1Inch, sender);
        // positions[sender].push(newPosition);
        // // positionsOpen[sender]++;

        // console.log('position created');
        // positionsByOrder[orderHash] = newPosition;
        // createOrder(orderHash, loanAsset, amount);
    }

    function closeLong(
        address loanAsset,
        address positionAsset,
        address apositionAsset,
        address debtToken,
        uint256 amount,
        uint256 collateralAmount,
        uint16 id,
        bytes calldata oneInchData
    ) public {
        address receiverAddress = address(this);

        address[] memory assets = new address[](1);
        assets[0] = loanAsset;

        uint256[] memory amounts = new uint256[](1);
        if (positionsOpen[msg.sender] == 1) {
            uint256 debt = IERC20(debtToken).balanceOf(msg.sender);
            amounts[0] = debt;
        } else {
            amounts[0] = amount;
        }
        // 0 = no debt, 1 = stable, 2 = variable
        uint256[] memory modes = new uint256[](1);
        modes[0] = 0;

        address onBehalfOf = address(this);
        bytes memory params =
            abi.encode(1, msg.sender, positionAsset, apositionAsset, collateralAmount, id, oneInchData);
        uint16 referralCode = 0;

        LENDING_POOL.flashLoan(receiverAddress, assets, amounts, modes, onBehalfOf, params, referralCode);
    }

    function _executeCloseLong(
        address asset,
        uint256 amount,
        uint256 premium,
        bytes memory params
    ) private {
        // decode params
        (
            ,
            address sender,
            address positionAsset,
            address apositionAsset,
            uint256 collateralAmount,
            uint8 id,
            bytes memory oneInchData
        ) = abi.decode(params, (uint256, address, address, address, uint256, uint8, bytes));
        // if no aave allowance, approve
        if (IERC20(asset).allowance(address(this), address(LENDING_POOL)) < amount) {
            IERC20(asset).approve(address(LENDING_POOL), type(uint128).max);
        }
        // first repay the debt of the user using the flashloan funds
        LENDING_POOL.repay(asset, amount, 2, sender);
        // transfer atoken from user to contract
        if (positionsOpen[sender] == 1) {
            uint256 newAmount = IERC20(apositionAsset).balanceOf(sender);
            IERC20(apositionAsset).transferFrom(sender, address(this), newAmount);
            LENDING_POOL.withdraw(positionAsset, newAmount, address(this));
        } else {
            IERC20(apositionAsset).transferFrom(sender, address(this), collateralAmount);
            LENDING_POOL.withdraw(positionAsset, collateralAmount, address(this));
        }
        // approve for 1inch
        if (IERC20(positionAsset).allowance(address(this), address(_oneInchExchange)) < collateralAmount) {
            IERC20(positionAsset).approve(address(_oneInchExchange), type(uint128).max);
        }
        // 1inch trade
        (, bytes memory res) = _oneInchExchange.call(oneInchData);
        uint256 balanceFrom1Inch = _toUint256(res);
        // send collateral back to user
        IERC20(asset).transfer(sender, balanceFrom1Inch - amount.add(premium));
        IERC20(positionAsset).transfer(sender, IERC20(positionAsset).balanceOf(address(this)));
        // remove position info from storage
        delete positions[sender][id];
        positionsOpen[sender]--;
    }

    function shortLeverage(
        address loanAsset,
        address positionAsset,
        uint256 amount,
        uint256 collateralAmount,
        bytes calldata oneInchData
    ) public {
        address receiverAddress = address(this);

        address[] memory assets = new address[](1);
        assets[0] = loanAsset;

        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;

        // 0 = no debt, 1 = stable, 2 = variable
        uint256[] memory modes = new uint256[](1);
        modes[0] = 0;

        address onBehalfOf = address(this);
        bytes memory params = abi.encode(2, msg.sender, positionAsset, collateralAmount, oneInchData);
        uint16 referralCode = 0;

        LENDING_POOL.flashLoan(receiverAddress, assets, amounts, modes, onBehalfOf, params, referralCode);
    }

    function _executeShortLeverage(
        address asset,
        uint256 amount,
        uint256 premium,
        bytes memory params
    ) private {
        // decode params
        (, address sender, address positionAsset, uint256 collateralAmount, bytes memory oneInchData) =
            abi.decode(params, (uint256, address, address, uint256, bytes));
        // transfer collateral from user to contract
        IERC20(positionAsset).transferFrom(sender, address(this), collateralAmount);
        // 1inch approve
        if (IERC20(asset).allowance(address(this), address(_oneInchExchange)) < amount) {
            IERC20(asset).approve(address(_oneInchExchange), type(uint128).max);
        }
        // 1inch trade
        (, bytes memory res) = _oneInchExchange.call(oneInchData);
        uint256 balanceFrom1Inch = _toUint256(res);
        balanceFrom1Inch = balanceFrom1Inch + collateralAmount;
        // if no aave allowance, approve
        if (IERC20(positionAsset).allowance(address(this), address(LENDING_POOL)) < balanceFrom1Inch) {
            IERC20(positionAsset).approve(address(LENDING_POOL), type(uint128).max);
        }
        // deposit collateral to aave on behalf of user
        LENDING_POOL.deposit(positionAsset, balanceFrom1Inch, sender, 0);
        // borrow loaned asset on behalf of user
        LENDING_POOL.borrow(asset, amount.add(premium), 2, 0, sender);
        // save position info in storage
        Position memory newPosition =
            Position(positions[sender].length, 1, positionAsset, asset, amount, balanceFrom1Inch, sender);
        positions[sender].push(newPosition);
        positionsOpen[sender]++;
    }

    function closeShort(
        address loanAsset,
        address positionAsset,
        address apositionAsset,
        address debtToken,
        uint256 amount,
        uint256 atokenAmount,
        uint16 id,
        bytes calldata oneInchData
    ) public {
        address receiverAddress = address(this);

        address[] memory assets = new address[](1);
        assets[0] = loanAsset;

        uint256[] memory amounts = new uint256[](1);
        if (positionsOpen[msg.sender] == 1) {
            uint256 debt = IERC20(debtToken).balanceOf(msg.sender);
            amounts[0] = debt;
        } else {
            amounts[0] = amount;
        }
        // 0 = no debt, 1 = stable, 2 = variable
        uint256[] memory modes = new uint256[](1);
        modes[0] = 0;

        address onBehalfOf = address(this);
        bytes memory params = abi.encode(3, msg.sender, positionAsset, apositionAsset, atokenAmount, id, oneInchData);
        uint16 referralCode = 0;

        LENDING_POOL.flashLoan(receiverAddress, assets, amounts, modes, onBehalfOf, params, referralCode);
    }

    function _executeCloseShort(
        address asset,
        uint256 amount,
        uint256 premium,
        bytes memory params
    ) private {
        // decode params
        (
            ,
            address sender,
            address positionAsset,
            address apositionAsset,
            uint256 atokenAmount,
            uint16 id,
            bytes memory oneInchData
        ) = abi.decode(params, (uint256, address, address, address, uint256, uint16, bytes));
        // if no aave allowance, approve
        if (IERC20(asset).allowance(address(this), address(LENDING_POOL)) < amount) {
            IERC20(asset).approve(address(LENDING_POOL), type(uint128).max);
        }
        // first repay the debt of the user using the flashloan funds
        LENDING_POOL.repay(asset, amount, 2, sender);
        // transfer atoken from user to contract
        if (positionsOpen[sender] == 1) {
            atokenAmount = IERC20(apositionAsset).balanceOf(sender);
        }
        IERC20(apositionAsset).transferFrom(sender, address(this), atokenAmount);
        // transform atoken in token
        LENDING_POOL.withdraw(positionAsset, atokenAmount, address(this));
        // approve for 1inch
        if (IERC20(positionAsset).allowance(address(this), address(_oneInchExchange)) < atokenAmount) {
            IERC20(positionAsset).approve(address(_oneInchExchange), type(uint128).max);
        }
        // 1inch trade
        (, bytes memory res) = _oneInchExchange.call(oneInchData);
        uint256 balanceFrom1Inch = _toUint256(res);
        // send collateral back to user
        IERC20(asset).transfer(sender, balanceFrom1Inch - amount.add(premium));
        IERC20(positionAsset).transfer(sender, IERC20(positionAsset).balanceOf(address(this)));
        // remove position info from storage
        delete positions[sender][id];
        positionsOpen[sender]--;
    }

    function _toUint256(bytes memory _bytes) internal pure returns (uint256 value) {
        assembly {
            value := mload(add(_bytes, 0x20))
        }
    }


    /// @notice callback from limit order protocol, executes on order fill
    function notifyFillOrder(
        address makerAsset,
        address takerAsset,
        uint256 makingAmount,
        uint256 takingAmount,
        bytes memory interactiveData // abi.encode(orderHash)
    ) external {
        require(msg.sender == _limitOrderProtocol, "only LOP can exec callback");
        makerAsset;
        takingAmount;
        bytes32 orderHash;
        assembly {  // solhint-disable-line no-inline-assembly
            orderHash := mload(add(interactiveData, 32))
        }
        // Order storage order = _orders[orderHash];
        // address user = order.user;
        // require(user != address(0x0), "order should exist");
        // require(makingAmount <= order.remaining, "withdraw amount exceeds user balance");
        // if (makingAmount == 0) {
        //     return;
        // }

        // Position memory _position = positionsByOrder[orderHash];

        // // first repay the debt of the user using takingAmount
        // LENDING_POOL.repay(takerAsset, _position.leveragedAmount, 2, _position.user);

        // // transfer atoken from user to contract and withdraw makerAsset
        // uint256 newAmount = IERC20(_position.collateral).balanceOf(_position.user);
        // IERC20(_position.collateral).transferFrom(_position.user, address(this), newAmount);
        // LENDING_POOL.withdraw(_position.collateral, newAmount, address(this));

        // IERC20(makerAsset).safeApprove(_limitOrderProtocol, 0);
        // IERC20(makerAsset).safeApprove(_limitOrderProtocol, makingAmount);

        // order.remaining -= makingAmount;

        // // close position when fully filled
        // if (order.remaining == 0) {
        //     delete _orders[orderHash];
        //     delete positionsByOrder[orderHash];
        // }

        emit OrderNotified(orderHash, makingAmount);
    }

    /// @notice just proxy to Limit Order Protocol
    function fillOrder(LimitOrderProtocol.Order memory order, bytes calldata signature, uint256 makingAmount, uint256 takingAmount, uint256 thresholdAmount) external returns(uint256, uint256) {
        return LimitOrderProtocol(_limitOrderProtocol).fillOrder(order, signature, makingAmount, takingAmount, thresholdAmount);
    }

    /// @notice withdraws all user funds from Compound, sends funds + fee to user
    function cancelOrder(bytes32 orderHash, LimitOrderProtocol.Order memory order) external {
        require(_orders[orderHash].user != msg.sender, "invalid user or order not exist");

        LimitOrderProtocol(_limitOrderProtocol).cancelOrder(order); // cancel in protocol
        delete _orders[orderHash];
        emit OrderCancelled(orderHash);
    }

    function getOrder(bytes32 orderHash) external view returns(address) {
        return _orders[orderHash].user;
    }

    /// @notice validate signature from Limit Order Protocol, checks also asset and amount consistency
    function isValidSignature(bytes32 hash, bytes memory signature) external view returns(bytes4) {
        uint256 salt;
        address makerAsset;
        address takerAsset;
        bytes memory makerAssetData;
        bytes memory takerAssetData;
        bytes memory getMakerAmount;
        bytes memory getTakerAmount;
        bytes memory predicate;
        bytes memory permit;
        bytes memory interaction;

        assembly {  // solhint-disable-line no-inline-assembly
            salt := mload(add(signature, 0x40))
            makerAsset := mload(add(signature, 0x60))
            takerAsset := mload(add(signature, 0x80))
            makerAssetData := add(add(signature, 0x40), mload(add(signature, 0xA0)))
            takerAssetData := add(add(signature, 0x40), mload(add(signature, 0xC0)))
            getMakerAmount := add(add(signature, 0x40), mload(add(signature, 0xE0)))
            getTakerAmount := add(add(signature, 0x40), mload(add(signature, 0x100)))
            predicate := add(add(signature, 0x40), mload(add(signature, 0x120)))
            permit := add(add(signature, 0x40), mload(add(signature, 0x140)))
            interaction := add(add(signature, 0x40), mload(add(signature, 0x160)))
        }
        bytes32 orderHash;
        assembly {  // solhint-disable-line no-inline-assembly
            orderHash := mload(add(interaction, 32))
        }

        Order storage _order = _orders[orderHash];

        require( // validate maker amount, address, asset address
            makerAsset == _order.asset && makerAssetData.decodeUint256(_AMOUNT_INDEX) == _order.remaining &&
            makerAssetData.decodeAddress(_FROM_INDEX) == address(this) &&
            _hash(salt, makerAsset, takerAsset, makerAssetData, takerAssetData, getMakerAmount, getTakerAmount, predicate, permit, interaction) == hash,
            "bad order"
        );


        return this.isValidSignature.selector;
    }

    function _hash(
        uint256 salt,
        address makerAsset,
        address takerAsset,
        bytes memory makerAssetData,
        bytes memory takerAssetData,
        bytes memory getMakerAmount,
        bytes memory getTakerAmount,
        bytes memory predicate,
        bytes memory permit,
        bytes memory interaction
    ) internal view returns(bytes32) {
        return _hashTypedDataV4(
            keccak256(
                abi.encode(
                    LIMIT_ORDER_TYPEHASH,
                    salt,
                    makerAsset,
                    takerAsset,
                    keccak256(makerAssetData),
                    keccak256(takerAssetData),
                    keccak256(getMakerAmount),
                    keccak256(getTakerAmount),
                    keccak256(predicate),
                    keccak256(permit),
                    keccak256(interaction)
                )
            )
        );
    }
}
