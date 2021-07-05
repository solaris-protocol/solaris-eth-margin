import { styled } from '@linaria/react';

export const Button = styled.button`
  flex-shrink: 0;

  width: 100%;
  height: 45px;

  color: #fff;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  text-transform: uppercase;

  background: linear-gradient(92.18deg, #9c32be -43.31%, #a422a1 102.49%);
  border-radius: 5px;
  opacity: 0.97;
   
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;
