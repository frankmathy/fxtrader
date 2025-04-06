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
  const [childWindows, setChildWindows] = useState<Window[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "TRADE_EXECUTED") {
        console.log("Trade executed:", event.data.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const updateRates = () => {
      const getRandomAdjustment = () => {
        return 1 + (Math.random() * 0.002 - 0.001);
      };

      const newBidRate = bidRate * getRandomAdjustment();
      const newOfferRate = offerRate * getRandomAdjustment();

      setBidRate(newBidRate);
      setOfferRate(newOfferRate);

      // Notify open trade tickets
      const message = {
        type: "RATE_UPDATE",
        data: {
          bidRate: newBidRate,
          offerRate: newOfferRate,
          currencyPair,
        },
      };
      childWindows.forEach((win) => {
        if (!win.closed) {
          win.postMessage(message, "*");
        } else {
          setChildWindows((prev) => prev.filter((w) => w !== win));
        }
      });
    };

    const intervalId = setInterval(updateRates, 500);
    return () => clearInterval(intervalId);
  }, [bidRate, offerRate, currencyPair, childWindows]);

  const handleTradeClick = (side: "Buy" | "Sell") => {
    const width = 400;
    const height = 300;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const rate = side === "Buy" ? offerRate : bidRate;
    const newWindow = window.open(
      `/trade-ticket?side=${side}&currencyPair=${currencyPair}&rate=${rate.toFixed(4)}`,
      "TradeTicket",
      `width=${width},height=${height},left=${left},top=${top}`
    );
    if (newWindow) {
      setChildWindows((prev) => [...prev, newWindow]);
    }
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
