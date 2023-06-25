import React from "react";
import "./index.scss";

const ExpenseForm = () => {
  const expenses = [
    "mortgage",
    "internet",
    "gas",
    "water",
    "home_security",
    "solar_panels",
    "electricity",
    "waste_management",
  ];

  let selectJSX = expenses.sort().map((element, idx) => {
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
    // Select container that holds all the inputs
    let inputRowCtn = document.querySelector(".input-row-ctn");
    // Select one row of inputs
    let expenseInputCtn = document.querySelector(".expense-input-ctn");
    // Clone the selected row of inputs
    let cloneRow = expenseInputCtn.cloneNode(true);
    // Add event listener to the trash icon
    let trashIcon = cloneRow.querySelector(".bi-trash");
    trashIcon.addEventListener("click", deleteARow);
    // Make sure the field's input are empty
    let childElemnts = cloneRow.querySelectorAll("input");
    childElemnts.forEach((child) => {
      child.value = "";
    });
    // Add the clone row to the browser
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

  const handleScrolling = (event) => {
    let element = event.target;
    let spacedOnTheLeft = element.scrollLeft;
    let widthViewByUser = element.clientWidth;
    let maxWidthCtn = element.scrollWidth;
    let container = document.querySelector(".header-inputs");

    if (spacedOnTheLeft + widthViewByUser === maxWidthCtn) {
      container.style.borderRight = 0;
    } else if (spacedOnTheLeft >= 0) {
      if (spacedOnTheLeft === 0) {
        container.style.borderRight = "2px solid gray";
        container.style.borderLeft = 0;
      } else if (
        spacedOnTheLeft >= 0 &&
        spacedOnTheLeft + widthViewByUser !== maxWidthCtn
      ) {
        container.style.borderLeft = "2px solid gray";
        container.style.borderRight = "2px solid gray";
      }
      container.style.borderRight = "2px solid gray";
    }
  };

  const handleContainerResize = new ResizeObserver((container) => {
    for (const entry of container) {
      // Get the new dimensions of the observed element
      const { width } = entry.contentRect;

      // Check if the width has reached 500px
      if (width <= 680) {
        // Perform some action or update UI when width is 500px or more
        entry.target.style.borderRight = "2px solid gray";
      } else {
        entry.target.style.borderRight = "0";
      }
    }
  });

  setTimeout(() => {
    handleContainerResize.observe(document.querySelector(".header-inputs"));
  }, 2000);

  const handleFormOnSubmit = (event) => {
    event.preventDefault();

    let form = document.getElementById("general-expense");
    console.log(form);
  };

  return (
    <form
      className="expense-form"
      id="general-expense"
      onSubmit={handleFormOnSubmit}
    >
      <div
        className="header-inputs"
        onScroll={handleScrolling}
        // onResize={handleContainerResize}
      >
        <div className="expense-header">
          <span>Expense Type</span>
          <span>Company Name</span>
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
              type="text"
              required
              name="company"
              className="form-control"
              placeholder="Company name"
            />

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
