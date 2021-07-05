import React, { FC, useState } from 'react';

import { styled } from '@linaria/react';
import range from 'lodash/range';
import Web3Modal from 'web3modal';

import { Button } from './Button';
import { Params } from './Params';
import { PROVIDERS, Providers } from './Providers';
import { Tokens } from './Tokens';

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 500px;
  padding: 25px 30px 30px;

  background: linear-gradient(147.79deg, #0e090f 0%, #170f18 100%);
  background-clip: padding-box;
  border: 1px solid transparent;
  border-radius: 20px;
  box-shadow: 0 10px 150px #0c0010;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;

    margin: -2px;

    background: linear-gradient(139deg, #39d0ff 0, #00a0fa 5%, #7b279a);
    border-radius: inherit;

    content: '';
  }
`;

const LEVERAGES = range(2, 26);

interface Props {
  web3Modal: Web3Modal;
  loadWeb3Modal: () => void;
}

export const TradeCard: FC<Props> = ({ web3Modal, loadWeb3Modal }) => {
  // Tokens
  const [tokenAddressA, setTokenAddressA] = useState('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48');
  const [tokenAddressB, setTokenAddressB] = useState('0x6B175474E89094C44Da98b954EedeAC495271d0F');
  const [tokenValueA, setTokenValueA] = useState('');
  const [tokenValueB, setTokenValueB] = useState('');

  // Params
  const [takeProfitPercent, setTakeProfitPercent] = useState('');
  const [stopLossPercent, setStopLossPercent] = useState('');
  const [leverage, setLeverage] = useState(LEVERAGES[0]);
  const [expiresIn, setExpiresIn] = useState('');

  // Providers
  const [provider, setProvider] = useState(PROVIDERS[0].name);

  // Tokens
  const handleTokenAddressAChange = (nextAddress: string) => {
    setTokenAddressA(nextAddress);
  };

  const handleTokenAddressBChange = (nextAddress: string) => {
    setTokenAddressB(nextAddress);
  };

  const handleTokenValueAChange = (nextValue: string) => {
    setTokenValueA(nextValue);
  };

  const handleTokenValueBChange = (nextValue: string) => {
    setTokenValueB(nextValue);
  };

  // Params
  const handleTakeProfitChange = (nextValue: string) => {
    setTakeProfitPercent(nextValue);
  };

  const handleStopLossChange = (nextValue: string) => {
    setStopLossPercent(nextValue);
  };

  const handleLeverageChange = () => {
    const index = LEVERAGES.findIndex((item) => item === leverage);
    if (index + 1 === LEVERAGES.length) {
      setLeverage(LEVERAGES[0]);
    } else {
      setLeverage(LEVERAGES[index + 1]);
    }
  };

  const handleExpiresInChange = (nextValue: string) => {
    setExpiresIn(nextValue);
  };

  // Providers
  const handleProviderChange = (nextProvider: string) => {
    setProvider(nextProvider);
  };

  return (
    <Wrapper>
      <Tokens
        tokenAddressA={tokenAddressA}
        onTokenAddressAChange={handleTokenAddressAChange}
        tokenAddressB={tokenAddressB}
        onTokenAddressBChange={handleTokenAddressBChange}
        tokenValueA={tokenValueA}
        onTokenValueAChange={handleTokenValueAChange}
        tokenValueB={tokenValueB}
        onTokenValueBChange={handleTokenValueBChange}
      />
      <Params
        takeProfitPercent={takeProfitPercent}
        onTakeProfitChange={handleTakeProfitChange}
        stopLossPercent={stopLossPercent}
        onStopLossChange={handleStopLossChange}
        leverage={leverage}
        onLeverageChange={handleLeverageChange}
        expiresIn={expiresIn}
        onExpiresInChange={handleExpiresInChange}
      />
      <Providers provider={provider} onProviderChange={handleProviderChange} />
      {web3Modal.cachedProvider ? <Button>Create order</Button> : <Button onClick={loadWeb3Modal}>Connect</Button>}
    </Wrapper>
  );
};
