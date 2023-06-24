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
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    const getUser = async () => {
      let activeUser = await getUserFromSession();
      if (user) {
        setUser(activeUser);
      } else {
        navigate("/auth/login");
      }
    };
    getUser();
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
