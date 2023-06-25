import React from "react";
import "./index.scss";

const ExpenseForm = () => {
  const expenses = [
    "mortgage",
    "internet",
    "summit_utilities",
    "water",
    "vivint",
    "solar_panels",
    "entergy",
    "saline_waste_management",
  ];

  let selectJSX = expenses.sort().map((element, idx) => {
    // return <div></div>;
    let elementValue = element.includes("_")
      ? element.replace("_", " ")
      : element;

    return (
      <option value={element} key={idx}>
        {elementValue}
      </option>
    );
  });

  const addExpenseRow = () => {
    let inputRowCtn = document.querySelector(".input-row-ctn");
    let expenseInputCtn = document.querySelector(".expense-input-ctn");
    let cloneRow = expenseInputCtn.cloneNode(true);
    let childElemnts = cloneRow.querySelectorAll("input");
    childElemnts.forEach((child) => {
      child.value = "";
    });
    inputRowCtn.appendChild(cloneRow);
  };

  return (
    <form className="expense-form">
      <div className="header-inputs">
        <div className="expense-header">
          <span>Expense Type</span>
          <span>Date</span>
          <span className="amount">Amount($)</span>
          <span></span>
        </div>
        <div className="input-row-ctn">
          <div className="expense-input-ctn">
            <select
              defaultValue=""
              className="form-control"
              name="expenseType"
              required
            >
              <option value="" disabled={true}>
                --Select a type--
              </option>
              {selectJSX}
            </select>

            <input
              type="date"
              name="date"
              className="form-control date"
              required
            />
            <input
              type="number"
              name="amount"
              step="0.01"
              placeholder="2.50"
              className="form-control amount"
              required
            />
            <span className="bi-trash"></span>
          </div>
        </div>
      </div>
      <div className="btn-ctn">
        <button
          type="button"
          className="btn add-expense"
          onClick={addExpenseRow}
        >
          {/* <span>Add another expense</span> */}
          <span className="bi-plus-circle"></span>
        </button>
        <button type="submit" className="btn btn-primary">
          Submit Form
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
