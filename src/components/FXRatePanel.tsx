import './FXRatePanel.css';

interface FXRatePanelProps {
  currencyPair: string;
  bidRate: number;
  offerRate: number;
}

const FXRatePanel: React.FC<FXRatePanelProps> = ({ currencyPair, bidRate, offerRate }) => {
  const handleSellClick = () => {
    console.log(`Sell ${currencyPair} at ${bidRate}`);
  };

  const handleBuyClick = () => {
    console.log(`Buy ${currencyPair} at ${offerRate}`);
  };

  return (
    <div className="fx-rate-panel">
      <div className="currency-pair">{currencyPair}</div>
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