import React, { useContext } from "react";
import { AppContext } from "../../../context";
import "./index.scss";
import { Charts } from "../../Charts";

const BreakdownSummary = (props) => {
  const { breakdownOverview } = useContext(AppContext);
  // console.log(breakdownOverview[0].expenseByCategory);
  const expenseByCategory = breakdownOverview[0].expenseByCategory;
  const total = breakdownOverview[0].totalSum.totalAmount;
  const overviewJSX = [...expenseByCategory].map((element, idx) => {
    const name = element.name.split("_").join(" ");
    const amount = element.totalAmount.toFixed(2);
    return (
      <div key={idx}>
        <span className="type">{name}</span>
        <div>
          {/* <span className="bi-currency-dollar"></span> */}
          <span className="amount">{amount}</span>
        </div>
      </div>
    );
  });
  return (
    <div className="breakdown-summary">
      <div className="graph">
        <Charts expenseByCategory={expenseByCategory} />
      </div>
      <div className="breakdown-summary">
        <div className="breakdown-overview ">
          <h2 className="title">Summary</h2>
          <span className="type header">Type</span>
          <span className="amount header">Amount ($)</span>
          <div className="details">{overviewJSX}</div>
        </div>
        <div className="total">
          <span className="type">Total</span>
          <span className="amount">{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default BreakdownSummary;
