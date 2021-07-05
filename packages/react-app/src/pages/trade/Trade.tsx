import React, { FC, useState } from 'react';

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
  grid-auto-flow: column;

  column-gap: 30px;
`;

export type OrderType = {
  market: string;
  size: string;
  open: string;
  lev: string;
  tp: string;
  sl: string;
  pnl: string;
  expiry: string;
};

const ORDER: OrderType = {
  market: 'USDC/DAI',
  size: '1 USDC',
  open: '$1,995.12',
  lev: '2X',
  tp: '120%',
  sl: '80%',
  pnl: '+6.34%',
  expiry: '5 Aug, 2021',
};

interface Props {
  web3Modal: Web3Modal;
  loadWeb3Modal: () => void;
  tx: any;
  writeContracts: any;
}

export const Trade: FC<Props> = ({ web3Modal, loadWeb3Modal, tx, writeContracts }) => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  const handleCreateOrderClick = () => {
    setOrders([ORDER]);
  };

  const handleRemoveOrderClick = () => {
    setOrders([]);
  };

  return (
    <Wrapper>
      <Container>
        <TradeCard
          web3Modal={web3Modal}
          loadWeb3Modal={loadWeb3Modal}
          tx={tx}
          writeContracts={writeContracts}
          onCreateOrderClick={handleCreateOrderClick}
        />
        <OrdersCard
          orders={orders}
          tx={tx}
          writeContracts={writeContracts}
          onRemoveOrderClick={handleRemoveOrderClick}
        />
      </Container>
    </Wrapper>
  );
};
