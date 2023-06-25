import React, { useContext, useState } from "react";
import "./index.scss";
import { AppContext } from "../../context";
import { getUserFromSession, login } from "../../usefull-functions/functions";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useContext(AppContext);
  const [feedback, setFeedback] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    let { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    let email = document.getElementById("email");
    let password = document.getElementById("password");

    // Enable login button if all the input fields are not empty
    if (email.value === "" && password.value === "") {
      setDisabled(true);
    }
    // Make sure the email field meets all the requirements
    else if (email.value !== "" && password.value !== "") {
      if (email.value.includes("@")) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }

    // Disable the login button if at least one field is empty
    else {
      setDisabled(true);
    }

    // Alert the user when the email field does not meet the requirement
    if (name === "email") {
      if (
        value === "" ||
        (value.length >= 3 &&
          value.indexOf("@") > 0 &&
          value.indexOf("@") < value.length - 1)
      ) {
        email.style.boxShadow = "none";

        console.log(!value.includes("@"));
      } else {
        email.style.boxShadow = "0 0 5px red";
      }
    }
  };

  const handleFormOnSubmit = async (event) => {
    event.preventDefault();
    let response = await login(formData);
    // get session info (user)
    let user = await getUserFromSession();
    setUser(user);

    if (user.firstName) {
      navigate("/");
    } else {
      document.getElementById("login-feedback").style.color = "red";
      setFeedback(response.data.message);
    }
  };

  return (
    <div id="auth" className="flex flex-column center">
      <div className="auth-form-ctn">
        <div id="login" className="flex flex-column login-ctn">
          <h3 className="form-title">Login Form</h3>
          <form
            className="auth-form"
            autoComplete="off"
            onSubmit={handleFormOnSubmit}
          >
            <div className="mb-3 flex start flex-column">
              <label htmlFor="email">
                Email<sup className="bi bi-asterisk"></sup>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3 flex start flex-column">
              <label htmlFor="password">
                Password<sup className="bi bi-asterisk"></sup>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                onChange={handleFormChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={disabled}
            >
              Login
            </button>
          </form>
          <p className="container-fluid login-register" id="login-feedback">
            {feedback}
          </p>
          <p className="login-register container-fluid">
            Click{" "}
            <Link to="/auth/register" className="text-blue-500">
              register
            </Link>{" "}
            to open an account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
