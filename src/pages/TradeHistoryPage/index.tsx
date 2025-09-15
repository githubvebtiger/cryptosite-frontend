import React, { useEffect, useState } from 'react';
import './styles.scss';
import WrapperPage from '../../components/WrapperPage';
import { useTheme } from '../../provider/ThemeProvider';
import { fetchTrades } from '../../api/fetchTrades';

import Header from '../../components/Header';
import moment from 'moment';

type Props = {
  opened: string;
  closed: string;
  traiding_pair: string;
  exchange: string;
  tp_sl: string;
  fee: string;
  direction: string;
  deposit: string;
  closing_pnl: string;
  orders_type: string;
  opening_fee: string;
  closing_fee: string;
};

function HistoryItem({
                       opened,
                       closed,
                       traiding_pair,
                       exchange,
                       tp_sl,
                       fee,
                       direction,
                       deposit,
                       closing_pnl,
                       orders_type,
                       opening_fee,
                       closing_fee
                     }: Props) {
  const {theme} = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <div className="history-item">
      <div className="history-item-details">
        <div>
          <strong>Opened</strong>
          <p className="grayy">{opened}</p>
        </div>
        <div>
          <strong>Closed</strong>
          <p className="grayy">{closed}</p>
        </div>
        <div>
          <strong>Trading pair</strong>
          <p className="grayy">{traiding_pair}</p>
        </div>
        {/*<div>*/}
        {/*  <strong>Exchange</strong>*/}
        {/*  <p className='grayy'>{exchange}</p>*/}
        {/*</div>*/}
        <div>
          <strong>Direction</strong>
          <p className="grayy">{direction}</p>
        </div>
        <div>
          <strong>Orders type</strong>
          <p className="grayy">{orders_type}</p>
        </div>
        <div>
          <strong>TP/SL</strong>
          <p className="grayy">{tp_sl}</p>
        </div>
        <div>
          <strong>Deposit</strong>
          <p className="grayy">{deposit}</p>
        </div>
        <div>
          <strong> Closed P&L (USDT)</strong>
          <p className="closing-pnl green">{closing_pnl}</p>
        </div>
        <div>
          <strong>Commission</strong>
          <p className="grayy">{fee}</p>
        </div>
        <div>
          <strong>Closing Fee</strong>
          <p className="grayy">{closing_fee}</p>
        </div>
        <div>
          <strong>Opening Fee</strong>
          <p className="grayy">{opening_fee}</p>
        </div>
      </div>
    </div>
  );
}

export default function TradeHistoryPage() {
  const [trades, setTrades] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const loadTrades = async () => {
      try {
        setLoading(true);
        const data = await fetchTrades();
        setTrades(data);
      } catch (error) {
        console.error('Failed to load trades:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadTrades();
  }, []);


  return (
    <div className="trade-history-page-wrapper">
      <div className="hide-on-mobile">
        <Header disableContainer isAuth/>
      </div>
      <WrapperPage>
        <div className="trade-history-page">
          <h2>Trade history</h2>
          {trades.map((item, index) => (
            <HistoryItem
              key={index}
              opened={new Date(item.opened).toLocaleString()}
              closed={new Date(item.closed).toLocaleString()}
              traiding_pair={item.traiding_pair}
              exchange={item.exchange}
              tp_sl={item.tp_sl}
              fee={`${item.fee} USDT`}
              direction={item.direction}
              deposit={`${item.deposit} USDT`}
              closing_pnl={`${item.closing_pnl}`}
              orders_type={item.orders_type}
              opening_fee={item.opening_fee}
              closing_fee={item.closing_fee}
            />
          ))}
        </div>
      </WrapperPage>
    </div>
  );
}
