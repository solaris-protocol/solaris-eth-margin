import React, { FC, useState } from 'react';

import { styled } from '@linaria/react';
import range from 'lodash/range';

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

const LEVERAGES = range(2, 26);

interface Props {}

export const Params: FC<Props> = (props) => {
  const [takeProfitPercent, setTakeProfitPercent] = useState('');
  const [stopLossPercent, setStopLossPercent] = useState('');
  const [leverage, setLeverage] = useState(LEVERAGES[0]);
  const [expiresIn, setExpiresIn] = useState('');

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

  return (
    <Wrapper>
      <Column>
        <SubTitleStyled>Take profit</SubTitleStyled>
        <Input placeholder="0.00%" value={takeProfitPercent} onChange={handleTakeProfitChange} />
      </Column>
      <Column>
        <SubTitleStyled>Stop loss</SubTitleStyled>
        <Input placeholder="0.00%" value={stopLossPercent} onChange={handleStopLossChange} />
      </Column>
      <Column className="center">
        <SubTitleStyled>Leverage</SubTitleStyled>
        <Leverage onClick={handleLeverageChange}>{leverage}x</Leverage>
      </Column>
      <Column className="right">
        <SubTitleStyled>Expires in</SubTitleStyled>
        <Input placeholder="0" value={expiresIn} onChange={handleExpiresInChange} />
      </Column>
    </Wrapper>
  );
};
