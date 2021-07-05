import React, { FC } from 'react';

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
`;

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

interface Props {
  tokenAddressA: string;
  onTokenAddressAChange: (nextAddress: string) => void;
  tokenAddressB: string;
  onTokenAddressBChange: (nextAddress: string) => void;
  tokenValueA: string;
  onTokenValueAChange: (nextValue: string) => void;
  tokenValueB: string;
  onTokenValueBChange: (nextValue: string) => void;
}

export const Tokens: FC<Props> = ({
  tokenAddressA,
  onTokenAddressAChange,
  tokenAddressB,
  onTokenAddressBChange,
  tokenValueA,
  onTokenValueAChange,
  tokenValueB,
  onTokenValueBChange,
}) => {
  const handleReverseClick = () => {
    onTokenAddressBChange(tokenAddressB);
    onTokenAddressAChange(tokenAddressA);
    onTokenValueBChange(tokenValueA);
    onTokenValueAChange(tokenValueB);
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
        onAddressChange={onTokenAddressAChange}
        value={tokenValueA}
        onValueChange={onTokenValueAChange}
      />
      <ReverseWrapper>
        <Reverse onClick={handleReverseClick} />
      </ReverseWrapper>
      <Top>
        <SubTitle>Receive</SubTitle>
      </Top>
      <TokenSection
        address={tokenAddressB}
        onAddressChange={onTokenAddressBChange}
        value={tokenValueB}
        onValueChange={onTokenValueBChange}
      />
    </Wrapper>
  );
};
