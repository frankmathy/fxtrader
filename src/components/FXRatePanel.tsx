import "./FXRatePanel.css";
import { useState } from "react";

interface FXRatePanelProps {
  currencyPair: string;
  initialBidRate: number;
  initialOfferRate: number;
}

const FXRatePanel: React.FC<FXRatePanelProps> = ({ currencyPair, initialBidRate, initialOfferRate }) => {
  const [bidRate, setBidRate] = useState(initialBidRate);
  const [offerRate, setOfferRate] = useState(initialOfferRate);

  const handleReload = () => {
    const randomChange = () => (Math.random() - 0.5) * 0.002;
    setBidRate((prev) => +(prev + randomChange()).toFixed(4));
    setOfferRate((prev) => +(prev + randomChange()).toFixed(4));
  };

  const handleSellClick = () => {
    console.log(`Sell ${currencyPair} at ${bidRate}`);
  };

  const handleBuyClick = () => {
    console.log(`Buy ${currencyPair} at ${offerRate}`);
  };

  return (
    <div className="fx-rate-panel">
      <div className="panel-header">
        <div className="currency-pair">{currencyPair}</div>
        <button className="reload-button" onClick={handleReload}>
          Refresh
        </button>
      </div>
      <div className="rates-container">
        <button className="rate-button" onClick={handleSellClick}>
          <div className="rate-label">Sell</div>
          <div className="bid-rate">{bidRate.toFixed(4)}</div>
        </button>
        <button className="rate-button" onClick={handleBuyClick}>
          <div className="rate-label">Buy</div>
          <div className="offer-rate">{offerRate.toFixed(4)}</div>
        </button>
      </div>
    </div>
  );
};

export default FXRatePanel;
