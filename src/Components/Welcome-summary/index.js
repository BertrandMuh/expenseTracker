import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { AppContext } from "../../context";
import { Charts } from "../Charts";

const Welcome = (props) => {
  const { user } = useContext(AppContext);
  const [houseExpense, setHouseExpense] = useState({
    name: "",
    totalAmount: 0,
  });
  const [personalExpense, setPersonalExpense] = useState({
    name: "",
    totalAmount: 0,
  });
  const [total, setTotal] = useState(0);

  const getAllExpenses = async (type) => {
    axios(`/get/all_expenses?user=${user._id}&type=${type}`).then(
      (response) => {
        if (type === "house") {
          setHouseExpense({
            name: "house expenses",
            totalAmount: response.data[0].totalAmount,
          });
        } else {
          setPersonalExpense({
            name: "personal expenses",
            totalAmount: response.data[0].totalAmount,
          });
        }
      }
    );
  };

  useEffect(() => {
    getAllExpenses("house");
    getAllExpenses("personal");
    setTotal(houseExpense.totalAmount + personalExpense.totalAmount);
  }, []);

  return (
    <div className="section container-fluid" id="welcomeSummary">
      <h1 className="section-title">Dashboard</h1>
      <div className="summary">
        <Charts
          expenseByCategory={[houseExpense, personalExpense]}
          total={houseExpense.totalAmount + personalExpense.totalAmount}
        />
        <div className="overall-num">
          <p className="legend">
            <span className="name">
              {houseExpense.name}
              {"($) : "}
            </span>
            <span className="ratio">{houseExpense.totalAmount}</span>
          </p>
          <p className="legend">
            <span className="name">
              {personalExpense.name}
              {"($) : "}
            </span>
            <span className="ratio">{personalExpense.totalAmount}</span>
          </p>
          <p className="legend">
            <span className="name">
              Total
              {"($) : "}
            </span>
            <span className="ratio">
              {personalExpense.totalAmount + houseExpense.totalAmount}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
