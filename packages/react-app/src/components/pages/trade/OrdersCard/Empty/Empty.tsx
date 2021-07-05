import React, { FC } from 'react';

import { styled } from '@linaria/react';

import emptyGif from './empty.gif';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 85px 54px 0;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;
`;

const Title = styled.span`
  color: #fff;
  font-weight: 600;
  font-size: 30px;
  line-height: 37px;
  letter-spacing: 0.02em;
`;

const Desc = styled.span`
  margin-top: 15px;

  color: #fff;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;

  opacity: 0.5;
`;

const EmptyGif = styled.div`
  position: relative;
  
  width: 385px;
  height: 373px;
  
  background: url(${emptyGif});
  background-size: 385px 373px;
  
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;

    background: linear-gradient(360deg, rgba(21, 16, 22, 0.6) -58.48%, rgba(21, 16, 22, 0) 180.26%);

    content: '';
  }
`;

export const Empty: FC = () => {
  return (
    <Wrapper>
      <Text>
        <Title>No active orders</Title>
        <Desc>It looks like you haven&apos;t created any orders yet.</Desc>
      </Text>

      <EmptyGif />
    </Wrapper>
  );
};
