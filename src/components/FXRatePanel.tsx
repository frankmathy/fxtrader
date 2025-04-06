import "./FXRatePanel.css";
import React, { useEffect, useState } from "react";

interface FXRatePanelProps {
  currencyPair: string;
  initialBidRate: number;
  initialOfferRate: number;
}

const FXRatePanel: React.FC<FXRatePanelProps> = ({ currencyPair, initialBidRate, initialOfferRate }) => {
  const [bidRate, setBidRate] = useState(initialBidRate);
  const [offerRate, setOfferRate] = useState(initialOfferRate);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "TRADE_EXECUTED") {
        console.log("Trade executed:", event.data.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleRefresh = () => {
    const getRandomAdjustment = () => {
      return 1 + (Math.random() * 0.002 - 0.001); // Random between -0.001% and +0.001%
    };

    setBidRate((prevRate) => prevRate * getRandomAdjustment());
    setOfferRate((prevRate) => prevRate * getRandomAdjustment());
  };

  const handleTradeClick = (side: "Buy" | "Sell") => {
    const width = 400;
    const height = 300;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
      `/trade-ticket?side=${side}&currencyPair=${currencyPair}`,
      "TradeTicket",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  return (
    <div className="fx-rate-panel">
      <div className="panel-header">
        <div className="currency-pair">{currencyPair}</div>
        <button className="refresh-button" onClick={handleRefresh}>
          ↻
        </button>
      </div>
      <div className="rates">
        <button onClick={() => handleTradeClick("Sell")}>
          <div className="rate-button-content">
            <span className="action">Sell</span>
            <span className="rate">{bidRate.toFixed(4)}</span>
          </div>
        </button>
        <button onClick={() => handleTradeClick("Buy")}>
          <div className="rate-button-content">
            <span className="action">Buy</span>
            <span className="rate">{offerRate.toFixed(4)}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FXRatePanel;
