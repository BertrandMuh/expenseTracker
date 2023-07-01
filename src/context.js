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
  const [expense, setExpense] = useState([]);
  const [expensePeriod, setExpensePeriod] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState({ month: "", year: "" });
  const [breakdownOverview, setBreakdownOverview]=useState([])

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
        expense,
        setExpense,
        expensePeriod,
        setExpensePeriod,
        currentPeriod,
        setCurrentPeriod,
        breakdownOverview,
        setBreakdownOverview,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
