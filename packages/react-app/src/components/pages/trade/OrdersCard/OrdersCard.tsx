import React, { FC } from 'react';

import { styled } from '@linaria/react';
import classNames from 'classnames';

import { OrderType } from 'pages/trade/Trade';

import { Empty } from './Empty';
import { Orders } from './Orders';

const Wrapper = styled.div`
  width: 500px;

  background: #151016;
  border-radius: 20px;

  &.isNotEmpty {
    width: 640px;
    padding: 20px;
  }
`;

interface Props {
  orders: OrderType[];
  tx: any;
  writeContracts: any;
  onRemoveOrderClick: () => void;
}

export const OrdersCard: FC<Props> = ({ orders, tx, writeContracts, onRemoveOrderClick }) => {
  const isNotEmpty = orders.length;

  return (
    <Wrapper className={classNames({ isNotEmpty })}>
      {isNotEmpty ? (
        <Orders orders={orders} tx={tx} writeContracts={writeContracts} onRemoveOrderClick={onRemoveOrderClick} />
      ) : (
        <Empty />
      )}
    </Wrapper>
  );
};
