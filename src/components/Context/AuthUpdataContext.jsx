import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
const UPDATA_STATE = {
  users: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
};

export const AuthUpdataContext = createContext(UPDATA_STATE);
const AuthUpdata = (state, action) => {
  switch (action.type) {
    case "UPDATA_START":
      return {
        users: null,
        loading: true,
        error: null,
      };
    case "UPDATA_SUCCESS":
      return {
         users: action.payload,
        loading: false,
        error: null,
      };
    case "UPDATA_FAILURE":
      return {
         users: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export const AuthUpdataContextProvider = ({ children }) => {
  const [state, dispatchup] = useReducer(AuthUpdata, UPDATA_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.users));
  }, [state.users]);
  return (
    <AuthUpdataContext.Provider
      value={{
         users: state.users,
         loading: state.loading,
         error: state.error,
         dispatchup,
      }}
    >
      {children}
    </AuthUpdataContext.Provider>
  );
};
