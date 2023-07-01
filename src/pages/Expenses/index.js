import React, { useState } from "react";
import "./index.scss";
import ExpenseForm from "../../Forms/Expenses-form";

const Expenses = () => {
  const [isHouseExpense, setIsHouseExpense] = useState(true);
  const handleOptionChange = (event) => {
    let element = event.target;
    setIsHouseExpense(element.value);
  };

  return (
    <div className="container-fluid expenses-ctn">
      <p className="msg">
        To effortlessly track your expenses, we encourage you to utilize our
        user-friendly form. Simply enter your expenses using the provided
        fields, and watch as your financial progress unfolds. Let's start
        logging those expenses and taking control of your finances!
        <br />
      </p>

      <div className="form-ctn">
        <div>
          <div className="select">
            <select className="form-title" onChange={handleOptionChange}>
              <option value={true} key="1">
                Household Expense Form
              </option>
              <option value={false} key="2">
                Personal Expense Form
              </option>
            </select>
            <i className="bi-info-circle">
              <span>Click on the form title to select another form.</span>
            </i>
          </div>

          <ExpenseForm isHouseExpense={isHouseExpense} />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
