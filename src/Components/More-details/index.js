import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { returnMonths } from "../../usefull-functions/functions";
import { AppContext } from "../../context";
import Pagination from "../Pagination-buttons";

const Breakdown = (props) => {
  const {
    houseExpense,
    personalExpense,
    houseExpensePeriod,
    personalExpensePeriod,
    getHouseExpenses,
    getPersonalExpenses,
    hasNextPage,
    setHasNextPage,
    maxPageNumber,
  } = props;
  //
  const { user } = useContext(AppContext);
  const [isHouseExpense, setIsHouseExpense] = useState(true);
  const [page, setPage] = useState(1);

  //
  const returnMonthAndYear = (value) => {
    const period = value.split("_");
    const year = +period[1];
    const month = +returnMonths().indexOf(period[0]);
    return { month: month, year: year };
  };

  //
  useEffect(() => {}, [hasNextPage]);

  //
  const detailsArray = document.querySelectorAll("details");
  // Close the details if they are opened
  if (detailsArray) {
    detailsArray.forEach((element) => {
      element.removeAttribute("open");
    });
  }

  //
  const changePage = (event) => {
    let { name } = event.target;
    //
    const period = document.getElementById("month");
    const month = returnMonthAndYear(period.value).month;
    const year = returnMonthAndYear(period.value).year;
    //
    if (name === "next") {
      const requestedPage = page + 1;
      //
      if (requestedPage >= maxPageNumber) {
        setHasNextPage(false);
      }
      //
      setPage(requestedPage);
      //
      if (isHouseExpense) {
        getHouseExpenses(user._id, month, year, requestedPage);
      }
      //
      else {
        getPersonalExpenses(user._id, month, year, requestedPage);
      }
    }
    //
    else if (name === "back") {
      //
      const requestedPage = page > 1 ? page - 1 : 1;
      //
      if (requestedPage <= 1) {
        setPage(1);
      }
      //
      setPage(requestedPage);
      setHasNextPage(true);
      //
      if (isHouseExpense) {
        getHouseExpenses(user._id, month, year, requestedPage);
      }
      //
      else {
        getPersonalExpenses(user._id, month, year, requestedPage);
      }
    }
  };

  // Get the right expense to display in the browser
  let allEntries = isHouseExpense ? [...houseExpense] : [...personalExpense];
  const selectedEntriesJSX = allEntries.map((element, idx) => {
    // Replace Underscore with a space
    const expenseType = element.expenseType.name.split("_").join(" ");
    // Convert the time
    const date = new Date(element.date).toLocaleDateString();
    // Set the amount to 2 decimal place
    const amount = element.amount.toFixed(2);
    const companyOrItem = element.companyName;
    //
    return (
      <details key={idx} className="expense flex details">
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

  // Get The right period
  const expensePeriod = isHouseExpense
    ? [...houseExpensePeriod]
    : [...personalExpensePeriod];
  //
  const monthOptionsJSX = expensePeriod.map((element, idx) => {
    const month = returnMonths()[element.month - 1];
    const year = element.year;
    return (
      //
      <option value={month + "_" + year} key={idx + 1}>
        {month + "/" + year}
      </option>
    );
  });

  // Request the appropriate expenses based on the month and year
  const handleOptionChange = (event) => {
    let { value, name } = event.target;
    let periodSelected = value;
    let year;
    let month;
    //
    if (name === "house-personal") {
      setIsHouseExpense(value === "true" || value === true ? true : false);
      const monthSelected = document.getElementById("month");
      //
      if (monthSelected) {
        monthSelected.selectedIndex = 0;
        periodSelected = monthSelected.value;
        year = returnMonthAndYear(periodSelected).year;
        month = returnMonthAndYear(periodSelected).month;
      }
    }
    //
    else if (name === "month") {
      year = returnMonthAndYear(periodSelected).year;
      month = returnMonthAndYear(periodSelected).month;
    }
    //
    if (year && month) {
      if (isHouseExpense) {
        getHouseExpenses(user._id, month, year);
      } else {
        getPersonalExpenses(user._id, month, year);
      }
    }
    setPage(1);
  };

  return (
    <div className="section container-fluid" id="breakdown">
      <div className="breakdown">
        <h1 className="section-title">Monthly Break down</h1>
        <div>
          <select onChange={handleOptionChange} name="house-personal">
            <option value={true} key="1">
              House Expenses
            </option>
            <option value={false} key="2">
              Personal Expenses
            </option>
          </select>
          {expensePeriod.length > 0 ? (
            <select onChange={handleOptionChange} name="month" id="month">
              {monthOptionsJSX}
            </select>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="summary">
        <div className="numbers">
          <div className="expenses-ctn">{selectedEntriesJSX}</div>
          <Pagination
            changePage={changePage}
            page={page}
            hasNextPage={hasNextPage}
          />
        </div>
        <div className="charts">Chart here</div>
      </div>
    </div>
  );
};

export default Breakdown;
