import React, { createContext, useContext, useState } from 'react';

const contextApi = createContext();

const Context = ({children}) => {

    const [userName,setUserName] = useState("");
  return (
    <contextApi.Provider value={{userName,setUserName}}>
      {children}
    </contextApi.Provider>
  )
}

export const ContextProvider = () => {return useContext(contextApi)}

export default Context;
