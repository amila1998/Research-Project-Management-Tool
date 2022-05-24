import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: [],
  isLoggedIn: false,
  isAdmin:false,
  isPanelMember:false,
  isSupervisor:false,
  isCoSupervisor:false,
  token: "",
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        isAdmin:state.isAdmin,
        isPanelMember:state.isPanelMember,
        isSupervisor:state.isSupervisor,
        isCoSupervisor:state.isCoSupervisor,
        token: state.token,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};