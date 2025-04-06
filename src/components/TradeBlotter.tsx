import React, { useEffect } from "react";
import "./TradeBlotter.css";

interface Trade {
  currencyPair: string;
  amount: number;
  rate: number;
}

const TradeBlotter: React.FC = () => {
  const [trades, setTrades] = React.useState<Trade[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "TRADE_EXECUTED") {
        const trade = event.data.data;
        setTrades((prev) => [
          ...prev,
          {
            currencyPair: trade.currencyPair,
            amount: trade.amount,
            rate: trade.rate,
          },
        ]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="trade-blotter">
      <h2>Trade Blotter</h2>
      <table>
        <thead>
          <tr>
            <th>Currency Pair</th>
            <th>Amount</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr key={index}>
              <td>{trade.currencyPair}</td>
              <td>{trade.amount.toLocaleString()}</td>
              <td>{trade.rate.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeBlotter;
