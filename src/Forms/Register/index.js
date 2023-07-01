import React, { useContext, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import {
  getUserFromSession,
  login,
  register,
} from "../../usefull-functions/functions";

const Register = () => {
  const [registration, setRegistration] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    // Get the input elements
    let email = document.getElementById("email");
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirm-password");
    let { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Enable the register button if all the input fields are not empty
    //and meet the minimum requirements
    // otherwise Disable the button
    if (
      password.value !== "" &&
      firstName.value !== "" &&
      lastName.value !== "" &&
      email.value !== "" &&
      confirmPassword.value !== ""
    ) {
      if (
        email.value.length >= 3 &&
        email.value.indexOf("@") >= 1 &&
        email.value.indexOf("@") !== email.value.length - 1 &&
        password.value.length >= 8 &&
        password.value === confirmPassword.value
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
    // Disable the register button
    else {
      setDisabled(true);
    }

    // Alert the user when the confirm password is not empty and does not match the password value
    let inputAlert = "0 0 5px red";
    if (name === "confirm_password") {
      if (value !== formData.password) {
        confirmPassword.style.boxShadow = inputAlert;
      } else {
        confirmPassword.style.boxShadow = "none";
      }
    } else if (name === "password") {
      if (
        formData.confirm_password !== "" &&
        value !== formData.confirm_password
      ) {
        confirmPassword.style.boxShadow = inputAlert;
      } else if (value === formData.confirm_password) {
        confirmPassword.style.boxShadow = "none";
      }
    }
  };

  const handleFormOnSubmit = async (event) => {
    // Prevent form from reloading the page
    event.preventDefault();
    // Register the account
    let response = await register(formData);

    // Check if the registration was successful
    let responseData = response.data;
    if (responseData.includes("success")) {
      // Let the user know that the registration was a success
      document.getElementById("registration-feedback").style.color = "green";
      setRegistration("Your account was successfully created");

      // Login the user
      let response = await login({
        email: formData.email,
        password: formData.password,
      });

      // Check if login was successful
      if (response.data.message.includes("successfully")) {
        setTimeout(async () => {
          // Get the current user in session
          let user = await getUserFromSession();
          setUser(user);

          // Redirect to homepage if there is a user in session
          if (user.firstName) {
            navigate("/");
          } else {
            document.getElementById("registration-feedback").style.color =
              "red";
            setRegistration("Go to the log in page and try to login.");
          }
        }, 1000);
      } else {
      }
    } else {
      document.getElementById("registration-feedback").style.color = "red";
      setRegistration(responseData);
    }
  };
  return (
    <div id="auth" className="flex flex-column center">
      <div className="auth-form-ctn">
        <div id="register" className="flex flex-column  register-ctn">
          <h3 className="form-title">Registration Form</h3>
          <form
            className="auth-form"
            autoComplete="off"
            onSubmit={handleFormOnSubmit}
          >
            <div className="mb-3 flex start flex-column">
              <label htmlFor="firstName">
                First name<sup className="bi bi-asterisk"></sup>
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="form-control"
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3 flex start flex-column">
              <label htmlFor="lastName">
                Last name<sup className="bi bi-asterisk"></sup>
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
                onChange={handleFormChange}
                required
              />
            </div>
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
                required
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
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
                autoComplete="new-password"
                onChange={handleFormChange}
                required
                minLength={8}
              />
              <div className="form-text">8 characters mininum.</div>
            </div>

            <div className="mb-3 flex start flex-column">
              <label htmlFor="confirm-password">
                Confirm password<sup className="bi bi-asterisk"></sup>
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm-password"
                className="form-control"
                autoComplete="false"
                onChange={handleFormChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={disabled}
            >
              Register
            </button>
          </form>
          <p
            className="container-fluid login-register"
            id="registration-feedback"
          >
            {registration}
          </p>
          <p className="login-register container-fluid">
            Click <Link to="/auth/login">login</Link> to access your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
