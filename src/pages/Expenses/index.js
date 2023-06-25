import React, { useState } from "react";
import "./index.scss";
import ExpenseForm from "../../Forms/Expenses-form";

const Expenses = () => {
  const [personal, setPersonal] = useState(false);

  const handleOptionChange = (event) => {
    let element = event.target;
    setPersonal(element.value === "true" ? true : false);
  };
  return (
    <div className="container-fluid expenses-ctn">
      <p className="msg">
        To effortlessly track your expenses, we encourage you to utilize our
        user-friendly form. Simply enter your expenses using the provided
        fields, and watch as your financial progress unfolds. Let's start
        logging those expenses and taking control of your finances!
      </p>

      <div className="form-ctn">
        <div>
          <select className="form-title" onChange={handleOptionChange}>
            <option value={false} key="2">
              Group Expense Form
            </option>
            <option value={true} key="1">
              Personal Expense Form
            </option>
          </select>
          <ExpenseForm personal={personal} />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
