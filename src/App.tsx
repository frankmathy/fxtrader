import './App.css'
import FXRatePanel from './components/FXRatePanel'

function App() {
  return (
    <div className="app-container">
      <h1>FX Trader</h1>
      <div className="fx-rates-container">
        <FXRatePanel 
          currencyPair="EUR/USD"
          initialBidRate={1.0876}
          initialOfferRate={1.0878}
        />
        <FXRatePanel 
          currencyPair="EUR/GBP"
          initialBidRate={0.8534}
          initialOfferRate={0.8536}
        />
      </div>
    </div>
  )
}

export default App
