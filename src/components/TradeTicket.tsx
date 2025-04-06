import React, { useState, useEffect } from "react";

const TradeTicket: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [side, setSide] = useState<string>(""); // D
  const [currencyPair, setCurrencyPair] = useState<string>("");
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    // Get parameters from the URL
    const params = new URLSearchParams(window.location.search);
    setSide(params.get("side") || "");
    setCurrencyPair(params.get("currencyPair") || "");
    setRate(parseFloat(params.get("rate") || "0"));

    // Listen for rate updates
    const handleRateUpdate = (event: MessageEvent) => {
      if (event.data.type === "RATE_UPDATE" && event.data.data.currencyPair === currencyPair) {
        const newRate = side === "Buy" ? event.data.data.offerRate : event.data.data.bidRate;
        setRate(newRate as number);
      }
    };

    window.addEventListener("message", handleRateUpdate);
    return () => window.removeEventListener("message", handleRateUpdate);
  }, [side, currencyPair]);
  const handleExecute = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      window.opener?.postMessage(
        {
          type: "TRADE_EXECUTED",
          data: {
            side: side,
            currencyPair: currencyPair,
            amount: numAmount,
            rate: rate,
          },
        },
        "*"
      );
      window.close();
    }
  };

  return (
    <div className="trade-ticket-standalone">
      <div className="trade-ticket">
        <div className="trade-ticket-header">
          {side} {currencyPair}
        </div>
        <div className="trade-ticket-body">
          <div className="rate-display" style={{ marginBottom: "5px" }}>
            Rate: {rate.toFixed(4)}
          </div>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
        </div>
        <button onClick={handleExecute}>Execute</button>
        <button onClick={() => window.close()}>Cancel</button>
      </div>
    </div>
  );
};

export default TradeTicket;
