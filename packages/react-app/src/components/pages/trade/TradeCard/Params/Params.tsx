import React, { FC } from 'react';

import { styled } from '@linaria/react';

import { Input } from 'components/common/Input';

import { SubTitle } from '../common/styled';

const Wrapper = styled.div`
  display: flex;
  padding: 40px 0 34px;

  border-top: 1px solid rgba(160, 119, 176, 0.2);
  border-bottom: 1px solid rgba(160, 119, 176, 0.2);
`;

const Column = styled.div`
  &.center {
    text-align: center;
  }

  &.right {
    text-align: right;
  }
`;

const SubTitleStyled = styled(SubTitle)`
  margin-bottom: 15px;
`;

const Leverage = styled.button`
  color: #fff;
  font-weight: 600;
  font-size: 30px;
  line-height: 37px;
  letter-spacing: 0.02em;
`;

interface Props {
  takeProfitPercent: string;
  onTakeProfitChange: (nextValue: string) => void;
  stopLossPercent: string;
  onStopLossChange: (nextValue: string) => void;
  leverage: number;
  onLeverageChange: () => void;
  expiresIn: string;
  onExpiresInChange: (nextValue: string) => void;
}

export const Params: FC<Props> = ({
  takeProfitPercent,
  onTakeProfitChange,
  stopLossPercent,
  onStopLossChange,
  leverage,
  onLeverageChange,
  expiresIn,
  onExpiresInChange,
}) => {
  return (
    <Wrapper>
      <Column>
        <SubTitleStyled>Take profit</SubTitleStyled>
        <Input placeholder="0.00%" value={takeProfitPercent} onChange={onTakeProfitChange} />
      </Column>
      <Column>
        <SubTitleStyled>Stop loss</SubTitleStyled>
        <Input placeholder="0.00%" value={stopLossPercent} onChange={onStopLossChange} />
      </Column>
      <Column className="center">
        <SubTitleStyled>Leverage</SubTitleStyled>
        <Leverage onClick={onLeverageChange}>{leverage}x</Leverage>
      </Column>
      <Column className="right">
        <SubTitleStyled>Expires in</SubTitleStyled>
        <Input placeholder="0" value={expiresIn} onChange={onExpiresInChange} />
      </Column>
    </Wrapper>
  );
};
