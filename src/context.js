import { useState, createContext } from "react";

export const AppContext = createContext();

// we take in props because we want access to the children
const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
