import React, { FC, useState } from 'react';

import { styled } from '@linaria/react';

import WalletIcon from 'assets/icons/wallet-icon.svg';

import { SubTitle } from '../common/styled';
import { Reverse } from './Reverse';
import { TokenSection } from './TokenSection';

const Wrapper = styled.div`
  padding-bottom: 24px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  &.top {
    margin-bottom: 11px;
  }
`;

const BalanceWrapper = styled.div`
  display: flex;
  align-items: center;

  color: rgba(255, 255, 255, 0.5);
`;

const WalletIconStyled = styled(WalletIcon)`
  margin-top: -2px;
`

const Balance = styled.span`
  display: inline-block;
  margin: 0 17px 0 10px;

  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
`;

export const MaxButton = styled.button`
  height: 26px;
  padding: 0 10px;

  color: #907a99;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.15em;
  text-transform: uppercase;

  background-color: transparent;
  border: 1px solid #907a99;
  border-radius: 5px;
  opacity: 0.5;

  transition: opacity 200ms ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const ReverseWrapper = styled.div`
  margin: 5px 0 10px;
`;

interface Props {}

export const Tokens: FC<Props> = (props) => {
  const [tokenAddressA, setTokenAAddress] = useState('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');
  const [tokenAddressB, setTokenBAddress] = useState('0x6B175474E89094C44Da98b954EedeAC495271d0F');
  const [tokenAValue, setTokenAValue] = useState('');
  const [tokenBValue, setTokenBValue] = useState('');

  const handleTokenAAddressChange = (nextAddress: string) => {
    setTokenAAddress(nextAddress);
  };

  const handleTokenBAddressChange = (nextAddress: string) => {
    setTokenBAddress(nextAddress);
  };

  const handleReverseClick = () => {
    setTokenAAddress(tokenAddressB);
    setTokenBAddress(tokenAddressA);
    setTokenAValue(tokenBValue);
    setTokenBValue(tokenAValue);
  };

  const handleTokenAValueChange = (nextValue: string) => {
    setTokenAValue(nextValue);
  };

  const handleTokenBValueChange = (nextValue: string) => {
    setTokenBValue(nextValue);
  };

  return (
    <Wrapper>
      <Top className="top">
        <SubTitle>Pay</SubTitle>
        <BalanceWrapper>
          <WalletIconStyled />
          <Balance>1.234 WETH</Balance>
          <MaxButton>Max</MaxButton>
        </BalanceWrapper>
      </Top>
      <TokenSection
        address={tokenAddressA}
        onAddressChange={handleTokenAAddressChange}
        value={tokenAValue}
        onValueChange={handleTokenAValueChange}
      />
      <ReverseWrapper>
        <Reverse onClick={handleReverseClick} />
      </ReverseWrapper>
      <Top>
        <SubTitle>Receive</SubTitle>
      </Top>
      <TokenSection
        address={tokenAddressB}
        onAddressChange={handleTokenBAddressChange}
        value={tokenBValue}
        onValueChange={handleTokenBValueChange}
      />
    </Wrapper>
  );
};
