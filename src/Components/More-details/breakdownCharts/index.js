import React, { useContext } from "react";
import { AppContext } from "../../../context";
import "./index.scss";

const BreakdownSummary = (props) => {
  const { breakdownOverview } = useContext(AppContext);
  const overviewJSX = [...breakdownOverview].map((element, idx) => {
    const name = element.name.split("_").join(" ");
    const amount = element.totalAmount.toFixed(2);
    return (
      <div key={idx}>
        <span className="type">{name}</span>
        <span className="amount">{amount}</span>
      </div>
    );
  });

  return (
    <div className="breakdown-overview ">
      <h2 className="title">Summary</h2>
      <span className="type header">Type</span>
      <span className="amount header">Amount</span>
      <div className="details">{overviewJSX}</div>
    </div>
  );
};

export default BreakdownSummary;
