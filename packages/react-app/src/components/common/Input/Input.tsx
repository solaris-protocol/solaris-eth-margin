import React, { FC } from 'react';

import { styled } from '@linaria/react';
import classNames from 'classnames';

const InputStyled = styled.input`
  position: relative;

  width: 100%;
  padding: 0;

  color: #fff;
  font-weight: 600;
  font-size: 30px;
  line-height: 37px;
  letter-spacing: 0.02em;
  text-align: inherit;

  background-color: transparent;
  border: none;
  outline: none;

  &.isZero {
    color: #45364d;
  }

  &::placeholder {
    color: #45364d;
  }

  &::before {
    position: absolute;

    display: block;

    color: #45364d;

    content: attr(placeholder);
  }
`;

interface Props {
  placeholder?: string;
  value: string;
  onChange: (nextValue: string) => void;
}

export const Input: FC<Props> = ({ value, placeholder = '0.00', onChange }) => {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
      .replace(',', '.')
      .replace(/[^\d.,]/g, '')
      .replace(/^(\d*\.?)|(\d*)\.?/g, '$1$2');

    if (value === '.') {
      value = '0.';
    }

    onChange(value);
  };

  return (
    <InputStyled
      value={value}
      placeholder={placeholder}
      onChange={handleValueChange}
      className={classNames({ isZero: !value })}
      contentEditable
    />
  );
};
