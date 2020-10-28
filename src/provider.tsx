import React, { useState } from 'react';
import AppContext from './index';





const ContextProvider = ({ children }) => {
  const [example, setExample] = useState('Hello there')
  const context = {
    setExample,
    example,
  };
  return (
    <AppContext.Provider value={ context }> 
      {children}
    </AppContext.Provider>
  );
}
export default ContextProvider;