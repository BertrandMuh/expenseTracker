import React, { useContext, useState } from "react";
import "./index.scss";
import { logout } from "../../usefull-functions/functions";
import { AppContext } from "../../context";
import Logo from "../../images/Money_Management_Logo_3.png";

const Nav = () => {
  const { user } = useContext(AppContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.onpopstate = (event) => {
    console.log(event);
  };

  window.addEventListener("resize", () => {
    let currentWindowWidth = window.innerWidth;
    setWindowWidth(currentWindowWidth);
  });

  const changePage = (event) => {
    let navButton = event.target;
    console.log(navButton);
  };
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <div className="logo-ctn">
            <img src={Logo} alt="logo" />
          </div>
        </a>
        {windowWidth <= 991 ? (
          <span className="username">{user.firstName}</span>
        ) : (
          ""
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/">
                Features
              </a>
            </li> */}
          </ul>

          <ul className="navbar-nav">
            {windowWidth > 991 ? (
              <li className="nav-item">
                <span className="nav-link">{user.firstName}</span>
              </li>
            ) : (
              ""
            )}

            {windowWidth > 991 ? (
              <li className="nav-item">
                <span className="nav-link">|</span>
              </li>
            ) : (
              ""
            )}

            <li className="nav-item dropdown">
              <button
                className="nav-link "
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span>My Account</span>
                {/* {windowWidth > 991 ? (
                  <span className="dropdown-toggle"></span>
                ) : (
                  <span className="bi-caret-right-fill"></span>
                )} */}
              </button>
              <ul className="dropdown-menu">
                {/* <li>
                  <a className="dropdown-item" href="/">
                    Action
                  </a>
                </li>
                <li>
                  <button className="dropdown-item">Personal Info</button>
                </li> */}
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
