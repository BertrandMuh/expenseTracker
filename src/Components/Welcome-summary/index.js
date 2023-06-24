import React from "react";
import "./index.scss";

const Welcome = () => {
  return (
    <div className="section container-fluid" id="welcomeSummary">
      <h1 className="section-title">Dashboard</h1>
      <div className="summary">
        <div className="summary-charts">The container for the chart</div>
      </div>
    </div>
  );
};

export default Welcome;
