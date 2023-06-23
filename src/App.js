import axios from "axios";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "./context";
import Auth from "./pages/Auth";
import Nav from "./Components/Nav";

function App() {
  document.cookie = `${document.cookie};SameSite=Lax`;

  const testFunction = async () => {
    const response = await axios("/test_route");
    console.log(response.data);
  };
  testFunction();

  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    const getUser = async () => {
      let activeUser = await axios("/session-info");
      if (activeUser.data.session.passport) {
        let current_user = activeUser.data.session.passport.user;
        delete current_user.password;
        setUser(current_user);
      }
    };
    getUser();
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <Routes>
            <Route path="/" element={<Nav />} />
          </Routes>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
