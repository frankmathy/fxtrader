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
  const [channel] = useState(() => new BroadcastChannel("fx-trading-channel"));

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "TRADE_EXECUTED") {
        console.log("Trade executed:", event.data.data);
      }
    };

    channel.addEventListener("message", handleMessage);
    return () => channel.removeEventListener("message", handleMessage);
  }, [channel]);

  useEffect(() => {
    const updateRates = () => {
      const getRandomAdjustment = () => {
        return 1 + (Math.random() * 0.002 - 0.001);
      };

      const newBidRate = bidRate * getRandomAdjustment();
      const newOfferRate = offerRate * getRandomAdjustment();

      setBidRate(newBidRate);
      setOfferRate(newOfferRate);

      // Broadcast rate updates to all windows
      channel.postMessage({
        type: "RATE_UPDATE",
        data: {
          bidRate: newBidRate,
          offerRate: newOfferRate,
          currencyPair,
        },
      });
    };

    const intervalId = setInterval(updateRates, 1000);
    return () => clearInterval(intervalId);
  }, [bidRate, offerRate, currencyPair, channel]);

  const handleTradeClick = (side: "Buy" | "Sell") => {
    const width = 400;
    const height = 300;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const rate = side === "Buy" ? offerRate : bidRate;
    window.open(
      `/trade-ticket?side=${side}&currencyPair=${currencyPair}&rate=${rate.toFixed(4)}`,
      "TradeTicket",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  return (
    <div className="fx-rate-panel">
      <div className="panel-header">
        <div className="currency-pair">{currencyPair}</div>
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
