import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import image1 from "../../images/percentage.png";
import image2 from "../../images/personal_expenses.png";
import logo from "../../images/money-watch-logo.png";

const WelcomePage = () => {
  return (
    <div className=" welcome-page">
      <div className="welcome-nav">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="auth-ctn">
          <Link to="/auth/login">
            <button className="btn btn-primary">Sign in</button>
          </Link>
          <Link to="/auth/register">
            <button className="btn btn-primary">Sign up</button>
          </Link>
        </div>
      </div>
      <div>
        Welcome to Money Watcher Website! <br />
        <br />
        At our platform, we understand the importance of effective financial
        management. With our intuitive and feature-rich website, we offer you a
        powerful tool to take charge of your finances like never before.
        <br />
        <br />
        On our home page, you'll find a user-friendly interface designed to
        simplify the process of expense tracking. Conveniently input and
        categorize your expenses, whether it's your daily coffee fix, monthly
        bills, or unexpected purchases. With just a few clicks, you can
        effortlessly stay on top of your spending.
        <br />
        <br />
        We believe that managing your money shouldn't be a burden. That's why
        our expense tracker website is designed with simplicity and convenience
        in mind. With easy-to-use featuresand secure data handling, we
        prioritize your peace of mind.
        <br />
        <br />
        So why wait? Start your journey towards financial freedom today.{" "}
        <Link to="/auth/register">Sign up</Link>&nbsp;or{" "}
        <Link to="/auth/login">sign in</Link>&nbsp; to our expense tracker
        website and take control of your finances with confidence. Together,
        we'll pave the way to a brighter financial future.
      </div>
      <div className="image-ctn">
        <div>
          <img src={image1} alt="house expenses images" />
        </div>
        <div>
          <img src={image2} alt="personal expenses images" />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
