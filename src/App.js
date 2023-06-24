import axios from "axios";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "./context";
import Auth from "./pages/Auth";
import Nav from "./Components/Nav";
import Home from "./pages/Home";
import { getUserFromSession } from "./usefull-functions/functions";

function App() {
  document.cookie = `${document.cookie};SameSite=Lax`;

  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    const getUser = async () => {
      let activeUser = await getUserFromSession();

      setUser(activeUser);
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
          </Routes>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
