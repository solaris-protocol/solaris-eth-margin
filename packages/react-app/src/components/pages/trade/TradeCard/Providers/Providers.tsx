import React, { FC } from 'react';

import { styled } from '@linaria/react';
import classNames from 'classnames';

import { SubTitle } from 'components/pages/trade/TradeCard/common/styled';

import mph88Img from './88mph.png';
import aaveImg from './aave.png';
import compoundImg from './compound.png';

const Wrapper = styled.div`
  padding: 25px 0 30px;
`;

const ButtonsGroup = styled.div`
  display: flex;
  margin-top: 18px;

  border: 1px solid #45364d;
  border-radius: 5px;
`;

const ButtonProvider = styled.button`
  position: relative;

  flex: 1;
  height: 45px;
  margin: -1px;

  background-color: transparent;
  border: 1px solid transparent;

  transition: background-color 0.2s, border 0.2s;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;

    opacity: 0.4;

    transition: opacity 0.2s;

    content: '';
  }

  &.aave {
    &::before {
      background: url(${aaveImg}) no-repeat 50%;
    }
  }

  &.compound {
    &::before {
      background: url(${compoundImg}) no-repeat 50%;
    }
  }

  &[class*='88mph'] {
    &::before {
      background: url(${mph88Img}) no-repeat 50%;
    }
  }

  &:not(:last-child) {
    border-right: 1px solid #45364d;
  }

  &.active {
    background-color: #211823;
    border: 1px solid #907a99;
    border-radius: 5px;

    &::before {
      opacity: 1;
    }
  }

`;

type ProviderType = {
  name: string;
  isDisabled: boolean;
};

export const PROVIDERS: ProviderType[] = [
  {
    name: 'aave',
    isDisabled: false,
  },
  {
    name: 'compound',
    isDisabled: true,
  },
  {
    name: '88mph',
    isDisabled: true,
  },
];

interface Props {
  provider: string;
  onProviderChange: (nextProvider: string) => void;
}

export const Providers: FC<Props> = ({ provider, onProviderChange }) => {
  const handleProviderClick = (nextProvider: string) => () => {
    onProviderChange(nextProvider);
  };

  return (
    <Wrapper>
      <SubTitle>Liquidity provider</SubTitle>
      <ButtonsGroup>
        {PROVIDERS.map(({ name, isDisabled }) => (
          <ButtonProvider
            key={name}
            disabled={isDisabled}
            onClick={handleProviderClick(name)}
            className={classNames({ [name]: true, active: provider === name })}
          />
        ))}
      </ButtonsGroup>
    </Wrapper>
  );
};
