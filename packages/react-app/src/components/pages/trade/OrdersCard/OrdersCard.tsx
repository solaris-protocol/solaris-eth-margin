import React, { FC } from 'react';

import { styled } from '@linaria/react';

import { Empty } from './Empty';

const Wrapper = styled.div`
  display: flex;
  width: 500px;

  background: #151016;
  border-radius: 20px;
`;

interface Props {}

export const OrdersCard: FC<Props> = (props) => {
  return <Wrapper>
    <Empty />
  </Wrapper>;
};
