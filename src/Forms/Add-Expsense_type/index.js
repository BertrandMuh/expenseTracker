import axios from "axios";
import React from "react";

const AddExpenseType = (props) => {
  const { addExpenseType, setAddExpenseType } = props;
  const hideForm = () => {
    setAddExpenseType(false);
  };

  const handleSubmit = async () => {
    const inputTag = document.getElementById("new-expense-type");
    if (inputTag.value === "") {
      inputTag.style.boxShadow = "inset 0 0 5px red";
    } else {
      inputTag.style.boxShadow = "none";
      axios
        .post("/add/house_expense_category", {
          data: inputTag.value,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleChange = () => {
    const inputTag = document.getElementById("new-expense-type");
    if (inputTag.value !== "") {
      inputTag.style.boxShadow = "none";
    }
  };

  return (
    <>
      {addExpenseType ? (
        <div className="add-expense-type-ctn center flex">
          <div className="flex flex-column center">
            <input
              type="text"
              id="new-expense-type"
              className="form-control"
              placeholder="Enter a new expense's type"
              onChange={handleChange}
              required
            />
            <p className="form-text">8 characters mininum.</p>
            <button
              type="button"
              className="btn btn-primary add-expense-btn"
              onClick={handleSubmit}
            >
              Submit Request
            </button>
            <button
              type="button"
              className="btn btn-primary cancel-btn"
              onClick={hideForm}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AddExpenseType;
