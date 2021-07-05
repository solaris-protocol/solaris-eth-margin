import React, { FC } from 'react';

import { styled } from '@linaria/react';

import { OrdersCard } from 'components/pages/trade/OrdersCard';
import { TradeCard } from 'components/pages/trade/TradeCard';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Container = styled.div`
  z-index: 1;
  
  display: grid;
  grid-auto-rows: 1fr;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  
  column-gap: 30px;
`;

interface Props {}

export const Trade: FC<Props> = (props) => {
  return (
    <Wrapper>
      <Container>
        <TradeCard />
        <OrdersCard />
      </Container>
    </Wrapper>
  );
};
