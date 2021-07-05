import React, { FC } from 'react';

import { styled } from '@linaria/react';

import ReverseIcon from 'assets/icons/reverse-icon.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    flex: 1;
    height: 1px;

    background: rgba(160, 119, 176, 0.2);

    content: '';
  }
`;

const ReverseWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;

  border: 1px solid #907a99;
  border-radius: 50%;
`;

const ReverseIconStyled = styled(ReverseIcon)`
  color: #907a99;
`;

interface Props {
  onClick: () => void;
}

export const Reverse: FC<Props> = ({ onClick }) => {
  return (
    <Wrapper>
      <ReverseWrapper onClick={onClick}>
        <ReverseIconStyled />
      </ReverseWrapper>
    </Wrapper>
  );
};
