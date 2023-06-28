import React, { useState } from "react";
import "./index.scss";
import axios from "axios";

const Breakdown = (props) => {
  const { allExpenses } = props;
  const [isHouseExpense, setIsHouseExpense] = useState(true);

  let allEntries = [...allExpenses];
  //Filter the entries
  const filteredEntries = allEntries.filter(
    (element) => element.isHouseExpense === isHouseExpense
  );

  const selectedEntriesJSX = filteredEntries.map((element, idx) => {
    const expenseType = element.expenseType.split("_").join(" ");
    const date = new Date(element.date).toLocaleDateString();
    const amount = element.amount.toFixed(2);
    const companyOrItem = element.companyName;
    return (
      <details key={idx} className="expense flex">
        <summary>
          <span>{companyOrItem}</span>
          <span>
            <strong>$ </strong>
            <strong> {amount} </strong>
          </span>
        </summary>
        <div className="more-details">
          <span>{expenseType}</span>
          <span>{date}</span>
        </div>
      </details>
    );
  });

  const handleOptionChange = (event) => {
    let { value, name } = event.target;
    setIsHouseExpense(value === "true" ? true : false);
  };
  return (
    <div className="section container-fluid" id="breakdown">
      <div className="breakdown-title">
        <h1 className="section-title">Break down</h1>
        <select onChange={handleOptionChange}>
          <option value={true} key="1">
            House Expenses
          </option>
          <option value={false} key="2">
            Personal Expenses
          </option>
        </select>
      </div>
      <div className="summary">
        <div className="numbers">{selectedEntriesJSX}</div>
        <div className="charts">Chart here</div>
      </div>
    </div>
  );
};

export default Breakdown;
