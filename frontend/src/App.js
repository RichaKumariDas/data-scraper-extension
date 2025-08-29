/* global chrome */
import { useState, useEffect } from "react";
import "./styles/popup.css";   // Popup UI styles
import Summary from "./components/Summary"; // ✅ Updated import

function App() {
  const [data, setData] = useState([]);     // Scraped data storage
  const [active, setActive] = useState(false); // Scraper toggle state

  // ✅ Check scraper status when popup opens
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getStatus" }, (res) => {
        if (res) setActive(res.active);
      });
    });
  }, []);

  // ✅ Toggle scraper mode (start/stop selecting elements)
  const toggleScraper = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "toggleScraper" },
        (response) => response && setActive(response.active)
      );
    });
  };

  // ✅ Get scraped data from content.js
  const getData = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]) return;
      chrome.tabs.sendMessage(tabs[0].id, { action: "getData" }, (response) => {
        if (chrome.runtime.lastError) {
          console.warn("No content script:", chrome.runtime.lastError.message);
          return;
        }
        if (response) setData(response);
      });
    });
  };

  // ✅ Clear scraped data + remove highlights
  const clearData = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "clearData" }, () => {
        setData([]);
      });
    });
  };

  // ✅ Export scraped data as CSV file
  const exportCSV = () => {
    if (!data.length) return;
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Tag,Text", ...data.map((d) => `${d.tag},"${d.text.replace(/"/g, '""')}"`)].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "scraped_data.csv";
    link.click();
  };

  return (
    <div className="ds-popup">
      {/* Title */}
      <h1 className="ds-title">
        <span className="ds-emoji"></span>Data Scraper
      </h1>

      {/* Status Indicator */}
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <span className={`ds-badge ${active ? "green" : ""}`}>
          {active ? "🟢 Selecting Mode" : "🔴 Inactive"}
        </span>
      </div>

      {/* Scraper Controls */}
      <div className="ds-row">
        <button onClick={toggleScraper} className="ds-btn ds-primary">
          {active ? "Stop Selecting" : "Start Selecting"}
        </button>
        <button onClick={getData} className="ds-btn ds-success">Get Data</button>
        <button onClick={clearData} className="ds-btn ds-dark">Clear</button>
      </div>

      {/* Scraped Data Display */}
      <div className="ds-card">
        {data.length === 0 ? (
          <p className="ds-empty">No data scraped yet</p>
        ) : (
          <ul className="ds-list">
            {data.map((d, i) => (
              <li key={i} className="ds-item">
                <b>{d.tag}</b>: {d.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Export CSV */}
      <button
        onClick={exportCSV}
        disabled={data.length === 0}
        className="ds-btn ds-warn ds-export"
      >
        Export CSV
      </button>
        <br/>
      {/* ✅ New Feature: Gemini Summary Component */}
      <Summary scrapedData={data.map((d) => d.text)} />
    </div>
  );
}

export default App;
