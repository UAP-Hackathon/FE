import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(() => {
    // Initialize state from localStorage if available
    const savedState = localStorage.getItem("globalState");
    return savedState ? JSON.parse(savedState) : {
      user: null,

    };
  });

  // Save globalState to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("globalState", JSON.stringify(globalState));
  }, [globalState]);

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
