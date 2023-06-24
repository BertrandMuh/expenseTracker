import React, { useContext } from "react";
import "./index.scss";
import { AppContext } from "../../context";
import Welcome from "../../Components/Welcome-summary";
import Breakdown from "../../Components/More-details";

const Home = () => {
  const { user } = useContext(AppContext);
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
      <Welcome />
      <Breakdown />
    </div>
  );
};

export default Home;
