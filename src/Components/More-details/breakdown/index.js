import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { returnMonths } from "../../../usefull-functions/functions";
import { AppContext } from "../../../context";
import Pagination from "../../Pagination-buttons";
import { decryptAES } from "../../../Encryption/encrypt";
import BreakdownSummary from "../breakdown-overview";

const Breakdown = (props) => {
  const {
    getExpenses,
    getAllExpenses,
    hasNextPage,
    setHasNextPage,
    maxPageNumber,
  } = props;
  //
  const { user, expense, expensePeriod, breakdownOverview } =
    useContext(AppContext);
  const [isHouseExpense, setIsHouseExpense] = useState(true);
  const [page, setPage] = useState(1);

  let selectedEntriesJSX = [];
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
    let requestedPage;
    let type;
    //
    if (isHouseExpense) {
      type = "house";
      if (name === "next") {
        requestedPage = page + 1;
        //
        if (requestedPage >= maxPageNumber) {
          setHasNextPage(false);
        }
        //
        setPage(requestedPage);
        //
      }
      //
      else if (name === "back") {
        //
        requestedPage = page > 1 ? page - 1 : 1;
        //
        if (requestedPage <= 1) {
          setPage(1);
        }
        //
        setPage(requestedPage);
        setHasNextPage(true);
        //
      }
    } else {
      type = "personal";
      if (name === "next") {
        requestedPage = page + 1;
        //
        if (requestedPage >= maxPageNumber) {
          setHasNextPage(false);
        }
        //
        setPage(requestedPage);
        //
      }
      //
      else if (name === "back") {
        //
        requestedPage = page > 1 ? page - 1 : 1;
        //
        if (requestedPage <= 1) {
          setPage(1);
        }
        //
        setPage(requestedPage);
        setHasNextPage(true);
        //
      }
    }
    getAllExpenses(type, user._id, month, year, requestedPage);
  };

  // Get the right expense to display in the browser

  const returnJSX = (array) => {
    const selectedEntriesJSX = array.map((element, idx) => {
      // Replace Underscore with a space
      const expenseType = element.expenseType.name.split("_").join(" ");
      // Convert the time
      const date = new Date(element.date).getUTCDate();
      const monthInteger = new Date(element.date).getUTCMonth();
      console.log(monthInteger);
      const month = returnMonths()[+monthInteger];
      console.log(month);
      const year = new Date(element.date).getUTCFullYear();
      // Set the amount to 2 decimal place
      const amount = element.amount.toFixed(2);

      const companyOrItem = decryptAES(element.companyName);
      //
      return (
        <details key={idx} className="expense flex details">
          <summary>
            <p>
              <span>{companyOrItem}</span>
              <span className="amount">
                <span className="bi-currency-dollar"></span>
                <strong> {amount} </strong>
              </span>
            </p>
          </summary>
          <div className="more-details">
            <span>{expenseType}</span>
            <span>
              {month} {date}, {year}
            </span>
          </div>
        </details>
      );
    });
    return selectedEntriesJSX;
  };

  let allEntries = expense ? [...expense] : [];
  selectedEntriesJSX = returnJSX(allEntries);

  // Get The right period
  const expensesPeriod = [...expensePeriod];
  //
  const monthOptionsJSX = expensesPeriod.map((element, idx) => {
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
    setPage(1);
    setHasNextPage(false);

    let { value, name } = event.target;
    let periodSelected = document.getElementById("month");
    let period;

    let year;
    let month;
    let type;

    if (name === "house-personal") {
      if (value === "true" || value === true) {
        setIsHouseExpense(true);
        period = "house";
      } else if (value === "false" || value === false) {
        setIsHouseExpense(false);
        period = "personal";
      }
      getExpenses(period);
      if (periodSelected) {
        periodSelected.selectedIndex = 0;
      }
    } else if (name === "month") {
      month = returnMonthAndYear(periodSelected.value).month;
      year = returnMonthAndYear(periodSelected.value).year;
      if (isHouseExpense) {
        type = "house";
        getAllExpenses(type, user._id, month, year);
      } else {
        type = "personal";
        getAllExpenses(type, user._id, month, year);
      }
    }
  };

  return (
    <div className="section container-fluid" id="breakdown">
      <div className="breakdown">
        <h1 className="section-title">Monthly Break down</h1>
        <div>
          <div className="select">
            <select
              onChange={handleOptionChange}
              name="house-personal"
              className="bi-caret-down-fill"
            >
              <option value={true} key="1">
                House Expenses
              </option>
              <option value={false} key="2">
                Personal Expenses
              </option>
            </select>
          </div>

          {expensePeriod.length > 0 ? (
            <div className="select">
              <select onChange={handleOptionChange} name="month" id="month">
                {monthOptionsJSX}
              </select>
              {/* <span className="bi-caret-down-fill"></span> */}
            </div>
          ) : (
            ""
          )}
          <i className="bi-info-circle">
            <span>
              Click on either the type of expenses or time period to select more
              option in the dropdown menu.
            </span>
          </i>
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
        {breakdownOverview.length > 0 ? (
          <div className="charts">
            <BreakdownSummary isHouseExpense={isHouseExpense} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Breakdown;
