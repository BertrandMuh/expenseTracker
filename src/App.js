import axios from "axios";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "./context";
import Nav from "./Components/Nav";
import Home from "./pages/Home";
import { getUserFromSession } from "./usefull-functions/functions";
import Expenses from "./pages/Expenses";
import Login from "./Forms/Login";
import Register from "./Forms/Register";

function App() {
  document.cookie = `${document.cookie};SameSite=Lax`;

  let navigate = useNavigate();
  const { user, setUser, setHouseExpenseType, setPersonalExpenseType } =
    useContext(AppContext);

  useEffect(() => {
    const getUser = async () => {
      let activeUser = await getUserFromSession();
      if (activeUser) {
        setUser(activeUser);
        navigate("/");
      } else {
        navigate("/auth/login");
      }
    };

    const getExpenseType = async () => {
      let houseExpense = await axios("/get/house_expense_category");
      let houseExpenseDate = houseExpense.data;
      let houseExpenseDataArray = houseExpenseDate.map(
        (element) => element.name
      );
      setHouseExpenseType(houseExpenseDataArray.sort());
      //
      let personalExpense = await axios("/get/personal_expense_category");
      let personalExpenseDate = personalExpense.data;
      let personalExpenseDataArray = personalExpenseDate.map(
        (element) => element.name
      );
      setPersonalExpenseType(personalExpenseDataArray.sort());
    };
    getUser();
    getExpenseType();
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/expenses" element={<Expenses />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
