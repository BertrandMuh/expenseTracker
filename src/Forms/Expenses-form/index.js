import React, { useContext, useState } from "react";
import "./index.scss";
import axios from "axios";
// import AddExpenseType from "../Add-Expsense_type";
import { AppContext } from "../../context";

const ExpenseForm = (props) => {
  const { isHouseExpense } = props;

  const { houseExpenseType, personalExpenseType } = useContext(AppContext);

  // Show and Hide form to add expense type
  // for (const item of personalExpense) {
  //   try {
  //     axios
  //       .post("/add/personal_category", {
  //         name: item,
  //       })
  //       .then((response) => console.log(response));
  //   } catch (error) {
  //     continue;
  //   }
  // }

  // const [addExpenseType, setAddExpenseType] = useState(false);

  // const showOrHideFormToAddExpenseType = (event) => {
  //   let element = event.target;
  //   if (element.value === "add") {
  //     setAddExpenseType(true);
  //     element.selectedIndex = 0;
  //   }
  //   console.log(element.value);
  // };

  // Options for expense type

  let optionsList =
    isHouseExpense === "true" || isHouseExpense === true
      ? [...houseExpenseType]
      : [...personalExpenseType];
  let selectOptionsJSX = optionsList.sort().map((element, idx) => {
    // console.log(element.split("_").join(" "));
    return (
      <option value={element} key={idx}>
        {element.split("_").join(" ")}
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
      container.style.borderRight = "2px solid gray";
      container.style.borderLeft = 0;
    } else if (
      spacedOnTheLeft > 0 &&
      spacedOnTheLeft + widthViewByUser < maxWidthCtn
    ) {
      container.style.borderLeft = 0;
      container.style.borderRight = 0;
    } else if (spacedOnTheLeft === 0) {
      container.style.borderLeft = "2px solid gray";
    }
  };

  const handleContainerResize = new ResizeObserver((container) => {
    for (const entry of container) {
      // Get the new dimensions of the observed element
      const { width } = entry.contentRect;

      // Check if the width has reached 500px
      if (width <= 680) {
        // Perform some action or update UI when width is 500px or more
        entry.target.style.borderLeft = "2px solid gray";
      } else {
        entry.target.style.border = "0";
      }
    }
  });

  setTimeout(() => {
    if (document.querySelector(".header-inputs")) {
      handleContainerResize.observe(document.querySelector(".header-inputs"));
    }
  }, 1000);

  const handleFormOnSubmit = async (event) => {
    event.preventDefault();
    //
    let form = document.getElementById("general-expense");
    let formInputsCtn = form.querySelectorAll(".expense-input-ctn");
    let expenseArray = Array.from(formInputsCtn).map((child) => {
      //
      let dict = {};
      //
      let allInputs = Array.from(child.querySelectorAll("input"));
      //
      let expenseType = child.querySelector("select");
      dict[expenseType.name] = expenseType.value;
      dict["isHouseExpense"] =
        isHouseExpense === true || isHouseExpense === "true" ? true : false;
      //Change the input to appropriate type
      allInputs.forEach((element) => {
        let { name, value } = element;
        // Convert values
        if (name === "date") {
          dict[name] = new Date(value);
        } else if (name === "amount") {
          dict[name] = parseFloat(value);
        } else if (name === "companyName") {
          dict[name] = value;
        }
      });

      return dict;
    });

    for (const expense of expenseArray) {
      try {
        axios
          .post("/add/expense", {
            data: expense,
          })
          .then((response) => {
            let data = response.data;
            console.log(data);
          });
      } catch (error) {
        console.log(error);
        continue;
      }
    }
  };

  return (
    <form
      className="expense-form"
      id="general-expense"
      onSubmit={handleFormOnSubmit}
    >
      <div className="header-inputs" onScroll={handleScrolling}>
        <div className="expense-header">
          <span>Expense Type</span>
          <span className="name">
            Name{" "}
            <i className="bi-info-circle">
              <span>
                Name of the company or the name of the item you are paying for.
              </span>
            </i>
          </span>
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
              data-identifier="expense_type"
              // onChange={showOrHideFormToAddExpenseType}
            >
              <option value="" disabled={true}>
                --Select a type--
              </option>
              {selectOptionsJSX}
              {/* <option value="add" key="add">
                add new expense type
              </option> */}
            </select>

            <input
              type="text"
              required
              name="companyName"
              className="form-control"
              placeholder="Company name"
              data-identifier="company"
            />

            <input
              type="date"
              name="date"
              className="form-control date"
              required
              data-identifier="date"
            />

            <input
              type="number"
              name="amount"
              step={0.01}
              placeholder="2.50"
              className="form-control amount"
              required
              data-identifier="amount"
              min={0.01}
            />

            <span className="bi-trash" onClick={deleteARow}></span>
          </div>
        </div>
      </div>
      <div className="btn-ctn">
        <button type="submit" className="btn btn-primary submit">
          Submit Form
        </button>

        <span
          className="bi-plus-circle"
          onClick={addExpenseRow}
          title="Add a new row"
        ></span>
      </div>
      {/* <AddExpenseType
        addExpenseType={addExpenseType}
        setAddExpenseType={setAddExpenseType}
      /> */}
    </form>
  );
};

export default ExpenseForm;
