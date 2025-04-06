import './App.css'
import FXRatePanel from './components/FXRatePanel'

function App() {
  return (
    <div className="app-container">
      <h1>FX Trader</h1>
      <div className="fx-rates-container">
        <FXRatePanel 
          currencyPair="EUR/USD"
          bidRate={1.0876}
          offerRate={1.0878}
        />
        <FXRatePanel 
          currencyPair="EUR/GBP"
          bidRate={0.8534}
          offerRate={0.8536}
        />
      </div>
    </div>
  )
}

export default App
