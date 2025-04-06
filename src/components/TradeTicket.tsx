import React, { useState, useEffect } from 'react';

const TradeTicket: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [tradeDetails, setTradeDetails] = useState<{
    side: 'Buy' | 'Sell';
    currencyPair: string;
  } | null>(null);

  useEffect(() => {
    // Get parameters from the URL
    const params = new URLSearchParams(window.location.search);
    setTradeDetails({
      side: params.get('side') as 'Buy' | 'Sell',
      currencyPair: params.get('currencyPair') || '',
    });
  }, []);

  const handleExecute = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      // Send message to parent window
      window.opener?.postMessage({
        type: 'TRADE_EXECUTED',
        data: {
          side: tradeDetails?.side,
          currencyPair: tradeDetails?.currencyPair,
          amount: numAmount,
        },
      }, '*');
      window.close();
    }
  };

  if (!tradeDetails) return null;

  return (
    <div className="trade-ticket-standalone">
      <div className="trade-ticket">
        <div className="trade-ticket-header">
          {tradeDetails.side} {tradeDetails.currencyPair}
        </div>
        <div className="trade-ticket-body">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <button onClick={handleExecute}>Execute</button>
        <button onClick={() => window.close()}>Cancel</button>
      </div>
    </div>
  );
};

export default TradeTicket;