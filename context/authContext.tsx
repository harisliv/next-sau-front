import { createContext, FC, useEffect, useState } from "react";

interface authContextInterface {
  isLoggedIn: boolean;
  onLogIn: (token: string) => void;
  onLogOut: () => void;
}

export const authContext = createContext<authContextInterface>({
  isLoggedIn: true,
  onLogIn: (token) => {},
  onLogOut: () => {},
});

const AuthContextProvider: FC = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    if(localStorage.getItem("jwt")){
      setIsLoggedIn(true)
    }
  }, [])
  
  const loginHandler = (token: string) => {
    localStorage.setItem("jwt", token);
    setIsLoggedIn(true);
  };
  const logOutHandler = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  const contextValue: authContextInterface = {
    isLoggedIn: isLoggedIn,
    onLogIn: loginHandler,
    onLogOut: logOutHandler,
  };

  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
