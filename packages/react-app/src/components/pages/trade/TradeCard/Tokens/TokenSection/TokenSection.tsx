import React, { FC } from 'react';

import { styled } from '@linaria/react';
import contractMap from '@metamask/contract-metadata';

import { Input } from 'components/common/Input';
import { formatUSD } from 'utils/utils';

const Wrapper = styled.div``;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
`;

const Symbol = styled.span`
  margin-left: 15px;

  color: #fff;
  font-size: 30px;
  line-height: 37px;
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

const InputWrapper = styled.div`
  text-align: right;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 7px;
`;

const Name = styled.span`
  color: #45364d;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.02em;
`;

const BalanceUSD = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
`;

interface Props {
  address: string;
  onAddressChange: (nextAddress: string) => void;
  value: string;
  onValueChange: (nextValue: string) => void;
}

export const TokenSection: FC<Props> = ({ address, onAddressChange, value, onValueChange }) => {
  const token = contractMap[address];

  return (
    <Wrapper>
      <Top>
        <Group>
          <Img src={`/images/contract/${token.logo}`} alt={token.name} />
          <Symbol>{token.symbol}</Symbol>
        </Group>
        <InputWrapper>
          <Input value={value} onChange={onValueChange} />
        </InputWrapper>
      </Top>
      <Bottom>
        <Name>{token.name}</Name>
        <BalanceUSD>{formatUSD.format(0)}</BalanceUSD>
      </Bottom>
    </Wrapper>
  );
};
