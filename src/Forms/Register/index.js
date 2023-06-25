import React, { useContext, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import {
  getUserFromSession,
  register,
} from "../../usefull-functions/functions";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    let { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormOnSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    let response = await register(formData);
    console.log(response);
    let responseData = response.data;
    if (responseData.includes("successfully")) {
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
              <div id="emailHelp" className="form-text">
                8 characters mininum.
              </div>
            </div>

            <div className="mb-3 flex start flex-column">
              <label htmlFor="confirm-password">
                Confirm password<sup className="bi bi-asterisk"></sup>
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="form-control"
                autoComplete="false"
                onChange={handleFormChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
          <p className="login-register container-fluid">
            Click <Link to="/auth/login">login</Link> to access your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
