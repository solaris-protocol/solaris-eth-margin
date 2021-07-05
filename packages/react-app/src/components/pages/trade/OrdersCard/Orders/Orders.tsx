import React, { FC } from 'react';

import { styled } from '@linaria/react';

import TrashIcon from 'assets/icons/trash-icon.svg';
import { OrderType } from 'pages/trade/Trade';

const WrapperTable = styled.table`
  width: 100%;
`;

const TH = styled.th`
  padding-bottom: 15px;

  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.02em;

  border-bottom: 1px solid rgba(160, 119, 176, 0.2);
`;

const TBody = styled.tbody`
  &::before {
    display: block;

    height: 10px;

    content: '';
  }
`;

const TR = styled.tr`
  height: 36px;
`;

const TD = styled.td`
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.02em;

  &.green {
    color: #00d395;
  }
`;

const RemoveButton = styled.button`
  display: flex;
  margin-top: -2px;
  padding: 0;

  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

interface Props {
  orders: OrderType[];
  tx: any;
  writeContracts: any;
  onRemoveOrderClick: () => void;
}

export const Orders: FC<Props> = ({ orders, tx, writeContracts, onRemoveOrderClick }) => {
  const handleRemoveOrderClick = async () => {
    const result = tx(writeContracts.YourContract.setPurpose('Send'), (update: any) => {
      console.log('📡 Transaction Update:', update);
      if (update && (update.status === 'confirmed' || update.status === 1)) {
        console.log(` 🍾 Transaction ${update.hash} finished!`);
        console.log(
          ` ⛽️ ${update.gasUsed}/${update.gasLimit || update.gas} @ ${parseFloat(update.gasPrice) / 1000000000} gwei`
        );
      }
    });
    console.log('awaiting metamask/web3 confirm result...', result);
    console.log(await result);

    onRemoveOrderClick();
  };

  return (
    <WrapperTable>
      <thead>
        <tr>
          <TH scope="col">Market</TH>
          <TH scope="col">Size</TH>
          <TH scope="col">Open</TH>
          <TH scope="col">Lev</TH>
          <TH scope="col">TP</TH>
          <TH scope="col">SL</TH>
          <TH scope="col">PNL</TH>
          <TH scope="col">Expiry</TH>
          <TH scope="col" />
        </tr>
      </thead>
      <TBody>
        {orders.map((order) => (
          <TR key={order.market}>
            <TD>{order.market}</TD>
            <TD>{order.size}</TD>
            <TD>{order.open}</TD>
            <TD>{order.lev}</TD>
            <TD>{order.tp}</TD>
            <TD>{order.sl}</TD>
            <TD className="green">{order.pnl}</TD>
            <TD>{order.expiry}</TD>
            <TD>
              <RemoveButton onClick={handleRemoveOrderClick}>
                <TrashIcon />
              </RemoveButton>
            </TD>
          </TR>
        ))}
      </TBody>
    </WrapperTable>
  );
};
