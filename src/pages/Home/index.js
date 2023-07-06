import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { AppContext } from "../../context";
import Welcome from "../../Components/Welcome-summary";
import axios from "axios";
import Breakdown from "../../Components/More-details/breakdown";

const Home = () => {
  const { user, setExpense, setExpensePeriod, setBreakdownOverview } =
    useContext(AppContext);

  const [maxPageNumber, setMaxPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState();

  const getAllExpenses = (type, userId, month, year, page = 1) => {
    axios(
      `/get/specific_expenses?user=${userId}&month=${month}&year=${year}&page=${page}&type=${type}`
    )
      .then((response) => {
        setExpense(response.data.response);
        setHasNextPage(response.data.hasNextPage);
        setMaxPageNumber(response.data.maxPageNumber);
      })
      .then(() => {
        axios(
          `/get/sum_by_category?user=${userId}&month=${month}&year=${year}&page=${page}&type=${type}`
        ).then((response) => {
          setBreakdownOverview(response.data);
        });
      });
  };

  const getExpenses = (type = "house") => {
    // Get house expenses period and set the house expense
    axios(`/get/expense_period?period=${type}&user=${user._id}`)
      .then((response) => {
        const responseData = response.data;

        setExpensePeriod(responseData);
        return { data: response.data, type: type };
      })
      .then((response) => {
        if (response.data.length > 0) {
          const month = response.data[0].month - 1;
          const year = response.data[0].year;
          getAllExpenses(response.type, user._id, month, year);
        } else {
          getAllExpenses(response.type, user._id, 1, 2023);
        }
      });
  };

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
        categorize them, set budgets for different categories, and add helpful
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
      <Welcome />
      <Breakdown
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
