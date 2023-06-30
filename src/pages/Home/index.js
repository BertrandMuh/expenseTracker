import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { AppContext } from "../../context";
import Welcome from "../../Components/Welcome-summary";
import Breakdown from "../../Components/More-details";
import axios from "axios";

const Home = () => {
  const {
    user,
    houseExpense,
    setHouseExpense,
    personalExpense,
    setPersonalExpense,
  } = useContext(AppContext);
  const [houseExpensePeriod, setHouseExpensePeriod] = useState([]);
  const [personalExpensePeriod, setPersonalExpensePeriod] = useState([]);
  const [maxPageNumber, setMaxPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState();
  // const []

  const getHouseExpenses = (userId, month, year, page = 1) => {
    axios(
      `/get/specific_house_expenses?user=${userId}&month=${month}&year=${year}&page=${page}`
    ).then((response) => {
      setHouseExpense(response.data.response);
      setHasNextPage(response.data.hasNextPage);
      setMaxPageNumber(response.data.maxPageNumber);
    });
  };
  const getPersonalExpenses = (userId, month, year, page = 1) => {
    axios(
      `/get/specific_personal_expenses?user=${userId}&month=${month}&year=${year}&page=${page}`
    ).then((response) => {
      setPersonalExpense(response.data.response);
      setHasNextPage(response.data.hasNextPage);
      setMaxPageNumber(response.data.maxPageNumber);
    });
  };

  useEffect(() => {
    const getExpenses = async () => {
      // Get house expenses period and set the house expense
      axios("/get/house_expense_period").then(async (response) => {
        const responseData = response.data;
        setHouseExpensePeriod(responseData);
        if (responseData.length > 0) {
          const month = responseData[0].month - 1;
          const year = responseData[0].year;
          getHouseExpenses(user._id, month, year);
        }
      });

      // Get personal expenses period and set the personal expense
      axios("/get/personal_expense_period").then(async (response) => {
        const responseData = response.data;
        setPersonalExpensePeriod(responseData);
        if (responseData.length > 0) {
          const month = responseData[0].month - 1;
          const year = responseData[0].year;
          getPersonalExpenses(user._id, month, year);
        }
      });
    };
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
        houseExpense={houseExpense}
        personalExpense={personalExpense}
        houseExpensePeriod={houseExpensePeriod}
        personalExpensePeriod={personalExpensePeriod}
        getHouseExpenses={getHouseExpenses}
        getPersonalExpenses={getPersonalExpenses}
        hasNextPage={hasNextPage}
        setHasNextPage={setHasNextPage}
        maxPageNumber={maxPageNumber}
      />
    </div>
  );
};

export default Home;
