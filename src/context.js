import { useState, createContext } from "react";

export const AppContext = createContext();

// we take in props because we want access to the children
const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [tempCredential, setTempCredential] = useState({
    email: "",
    password: "",
  });
  const [houseExpenseType, setHouseExpenseType] = useState([]);
  const [personalExpenseType, setPersonalExpenseType] = useState([]);
  const [personalExpense, setPersonalExpense] = useState([]);
  const [houseExpense, setHouseExpense] = useState([]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        tempCredential,
        setTempCredential,
        houseExpenseType,
        setHouseExpenseType,
        personalExpenseType,
        setPersonalExpenseType,
        personalExpense,
        setPersonalExpense,
        houseExpense,
        setHouseExpense,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
