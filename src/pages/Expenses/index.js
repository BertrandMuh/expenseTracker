import React from "react";
import "./index.scss";
import ExpenseForm from "../../Forms/Expenses-form";

const Expenses = () => {
  return (
    <div className="container-fluid expenses-ctn">
      <p className="msg">
        To effortlessly track your expenses, we encourage you to utilize our
        user-friendly form. Simply enter your expenses using the provided
        fields, and watch as your financial progress unfolds. Let's start
        logging those expenses and taking control of your finances!
      </p>

      <div className="form-ctn">
        <ExpenseForm />
      </div>
    </div>
  );
};

export default Expenses;
