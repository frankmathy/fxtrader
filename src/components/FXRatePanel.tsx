import "./FXRatePanel.css";
import React, { useEffect } from "react";

interface FXRatePanelProps {
  currencyPair: string;
  initialBidRate: number;
  initialOfferRate: number;
}

const FXRatePanel: React.FC<FXRatePanelProps> = ({ currencyPair, initialBidRate, initialOfferRate }) => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "TRADE_EXECUTED") {
        console.log("Trade executed:", event.data.data);
        // Handle the trade execution here
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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
      <div className="currency-pair">{currencyPair}</div>
      <div className="rates">
        <button onClick={() => handleTradeClick("Sell")}>
          <div className="rate-button-content">
            <span className="action">Sell</span>
            <span className="rate">{initialBidRate.toFixed(4)}</span>
          </div>
        </button>
        <button onClick={() => handleTradeClick("Buy")}>
          <div className="rate-button-content">
            <span className="action">Buy</span>
            <span className="rate">{initialOfferRate.toFixed(4)}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FXRatePanel;
