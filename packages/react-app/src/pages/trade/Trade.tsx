import React, { FC } from 'react';

import { styled } from '@linaria/react';
import Web3Modal from 'web3modal';

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

interface Props {
  web3Modal: Web3Modal;
  loadWeb3Modal: () => void;
}

export const Trade: FC<Props> = ({ web3Modal, loadWeb3Modal }) => {
  return (
    <Wrapper>
      <Container>
        <TradeCard web3Modal={web3Modal} loadWeb3Modal={loadWeb3Modal} />
        <OrdersCard />
      </Container>
    </Wrapper>
  );
};
