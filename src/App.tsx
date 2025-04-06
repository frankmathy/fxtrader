import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FXRatePanel from "./components/FXRatePanel";
import TradeTicketPage from "./pages/TradeTicketPage";
import TradeBlotter from "./components/TradeBlotter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">
              <h1>FX Trader</h1>
              <div className="fx-rates-container">
                <FXRatePanel currencyPair="EUR/USD" initialBidRate={1.0876} initialOfferRate={1.0878} />
                <FXRatePanel currencyPair="EUR/GBP" initialBidRate={0.8534} initialOfferRate={0.8536} />
              </div>
              <TradeBlotter />
            </div>
          }
        />
        <Route path="/trade-ticket" element={<TradeTicketPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
