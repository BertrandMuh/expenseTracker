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
    let trashIcon = cloneRow.querySelector(".bi-trash");
    trashIcon.addEventListener("click", deleteARow);
    let childElemnts = cloneRow.querySelectorAll("input");
    childElemnts.forEach((child) => {
      child.value = "";
    });
    inputRowCtn.appendChild(cloneRow);
  };

  const deleteARow = (event) => {
    // Get the container that holds the rows for the expense's input
    let inputRowCtn = document.querySelector(".input-row-ctn");

    // Get the parent of the target element
    let element = event.target;
    let elementParentNode = element.parentNode;

    // Delete the parent of the target element if we have more than one row
    if (inputRowCtn.childElementCount > 1) {
      elementParentNode.parentNode.removeChild(elementParentNode);
    }
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
            <span className="bi-trash" onClick={deleteARow}></span>
          </div>
        </div>
      </div>
      <div className="btn-ctn">
        <button type="submit" className="btn btn-primary">
          Submit Form
        </button>

        <span
          className="bi-plus-circle"
          onClick={addExpenseRow}
          title="Add a new row"
        ></span>
      </div>
    </form>
  );
};

export default ExpenseForm;
