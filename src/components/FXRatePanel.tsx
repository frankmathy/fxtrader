import './FXRatePanel.css';

interface FXRatePanelProps {
  currencyPair: string;
  bidRate: number;
  offerRate: number;
}

const FXRatePanel: React.FC<FXRatePanelProps> = ({ currencyPair, bidRate, offerRate }) => {
  return (
    <div className="fx-rate-panel">
      <div className="currency-pair">{currencyPair}</div>
      <div className="rates-container">
        <div className="rate-column">
          <div className="rate-label">Sell</div>
          <div className="bid-rate">{bidRate.toFixed(4)}</div>
        </div>
        <div className="rate-column">
          <div className="rate-label">Buy</div>
          <div className="offer-rate">{offerRate.toFixed(4)}</div>
        </div>
      </div>
    </div>
  );
};

export default FXRatePanel;