import React, { FC, useState } from 'react';

import { styled } from '@linaria/react';

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

interface Props {}

export const TradeCard: FC<Props> = (props) => {
  const [provider, setProvider] = useState<string>(PROVIDERS[0]);

  const handleProviderChange = (nextProvider: string) => {
    setProvider(nextProvider);
  };

  return (
    <Wrapper>
      <Tokens />
      <Params />
      <Providers provider={provider} onProviderChange={handleProviderChange} />
      <Button>Create order</Button>
    </Wrapper>
  );
};
