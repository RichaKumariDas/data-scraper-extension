// src/components/Summary.js
import React, { useState } from "react";
import { summarizeWithGemini } from "../api"; // Gemini API function

const Summary = ({ scrapedData }) => {
  const [summary, setSummary] = useState("");

  // Fetch summarized text
  const getSummary = async () => {
    if (!scrapedData || scrapedData.length === 0) {
      setSummary("⚠️ No data to summarize.");
      return;
    }
    const result = await summarizeWithGemini(scrapedData.join(" "));
    setSummary(result);
  };

  return (
    <div className="ds-card summary-box">
      <h2 className="ds-title">✨ Gemini Summary</h2>

      <div className="ds-row" style={{ marginBottom: "10px" }}>
        <button onClick={getSummary} className="ds-btn ds-primary">
          Summarize Data
        </button>
      </div>

      {summary ? (
        <p className="ds-text">{summary}</p>
      ) : (
        <p className="ds-empty">No summary generated yet</p>
      )}
    </div>
  );
};

export default Summary;
