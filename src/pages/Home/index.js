import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { AppContext } from "../../context";
import Welcome from "../../Components/Welcome-summary";
import Breakdown from "../../Components/More-details";
import axios from "axios";

const Home = () => {
  const { user } = useContext(AppContext);

  const [maxPageNumber, setMaxPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState();
  const [breakdownExpense, setBreakdownExpense] = useState([]);
  const [expensePeriod, setExpensePeriod] = useState([]);
  // const []

  const getAllExpenses = (route, userId, month, year, page = 1) => {
    axios(
      `/get/${route}?user=${userId}&month=${month}&year=${year}&page=${page}`
    ).then((response) => {
      setBreakdownExpense(response.data.response);
      setHasNextPage(response.data.hasNextPage);
      setMaxPageNumber(response.data.maxPageNumber);
    });
  };

  const getExpenses = (period = "house_expense_period") => {
    // Get house expenses period and set the house expense
    axios(`/get/${period}`)
      .then((response) => {
        const responseData = response.data;
        const route =
          period === "house_expense_period"
            ? "specific_house_expenses"
            : "specific_personal_expenses";
        setExpensePeriod(responseData);
        return { data: response.data, route: route };
      })
      .then((response) => {
        if (response.data.length > 0) {
          const month = response.data[0].month - 1;
          const year = response.data[0].year;
          getAllExpenses(response.route, user._id, month, year);
        }
      });
  };
  // const getPersonalExpenses = (route,userId, month, year, page = 1) => {
  //   axios(
  //     `/get/${route}?user=${userId}&month=${month}&year=${year}&page=${page}`
  //   ).then((response) => {
  //     setPersonalExpense(response.data.response);
  //     setBreakdownExpense(response.data.response);

  //     setHasNextPage(response.data.hasNextPage);
  //     setMaxPageNumber(response.data.maxPageNumber);
  //     console.log(response.data);
  //   });
  // };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className="homepage container-fluid">
      <p className="welcome-msg">
        <span className="user-firstname">{user.firstName}, </span>welcome to
        your personal finance dashboard!
        <br />
        <br />
        We are delighted to have you join our platform, where you can take
        charge of your financial well-being. Our comprehensive expense tracker
        website is designed to empower you with the tools and insights needed to
        make informed decisions about your money. Simply log your transactions,
        categorize them, set budgetss for different categories, and add helpful
        tags to keep your financial records organized.
        <br />
        <br />
        Visualize your progress with intuitive charts and reports, enabling you
        to identify areas where you can optimize your budget. Our platform is
        designed to be accessible wherever you are. Whether you prefer using a
        desktop computer or managing your finances on the go, our
        mobile-friendly design ensures a seamless experience across devices.
        <br />
        <br />
        Welcome to our expense tracker website! Get ready to take control of
        your financial journey, make confident decisions, and witness your
        financial goals becoming a reality. We're excited to be a part of your
        success story. Wishing you a prosperous and fulfilling financial
        journey!
      </p>
      {/* <Welcome houseExpense={houseExpense} personalExpense={personalExpense} /> */}
      <Breakdown
        breakdownExpense={breakdownExpense}
        expensePeriod={expensePeriod}
        getAllExpenses={getAllExpenses}
        getExpenses={getExpenses}
        hasNextPage={hasNextPage}
        setHasNextPage={setHasNextPage}
        maxPageNumber={maxPageNumber}
        setMaxPageNumber={setMaxPageNumber}
      />
    </div>
  );
};

export default Home;
