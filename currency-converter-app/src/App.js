import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();
      setCurrencies(Object.keys(data.rates));
    } catch (error) {
      console.error("Error fetching currencies:", error);
      alert("Failed to fetch currencies. Please try again later.");
    }
  };

  const handleConvert = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rate");
      }

      const data = await response.json();
      const rate = data.rates[toCurrency];

      if (!rate) {
        throw new Error("Exchange rate not found");
      }

      const converted = (amount * rate).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${converted} ${toCurrency}`);
    } catch (error) {
      console.error("Error converting currency:", error);
      alert("Failed to convert currency. Please try again.");
      setResult("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <form onSubmit={handleConvert}>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Your Amount"
            required
          />
        </div>

        <div className="form-group">
          <label>From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Converting..." : "Convert"}
        </button>
      </form>

      {/* Fixed: Display the result */}
      {result && (
        <div id="result" className="result">
          <h2>{result}</h2>
        </div>
      )}
    </div>
  );
}

export default App;