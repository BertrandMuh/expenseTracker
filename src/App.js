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
      // Get house expense category
      axios("/get/house_expense_category").then((response) => {
        const responseData = response.data;
        setHouseExpenseType(
          responseData.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            }
            return 0;
          })
        );
      });
      // Get personal expense category
      axios("/get/personal_expense_category").then((response) => {
        const responseData = response.data;
        setPersonalExpenseType(
          responseData.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            }
            return 0;
          })
        );
      });
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
