// src/components/Advice.js
import React, { useState } from "react";
import { fetchAdvice } from "../api"; // API function to fetch advice text

const Advice = () => {
  const [advice, setAdvice] = useState(""); // state to store advice text

  // Fetch new advice from API
  const getAdvice = async () => {
    const newAdvice = await fetchAdvice();
    setAdvice(newAdvice);
  };

  return (
    <div className="ds-card advice-box">
      <h2>Random Advice</h2>
      <button onClick={getAdvice}>Get Advice</button>
      <p>{advice}</p> {/* Display fetched advice */}
    </div>
  );
};

export default Advice;
