const AuthReducer = (state, action) => {
    switch (action.type) {
      case "SIGNING":
        return {
          ...state,
          isLoggedIn: true,
        };
      case "GET_TOKEN":
        return {
          ...state,
          token: action.payload,
        };
      case "GET_USER":
        return {
          ...state,
          user: action.payload,
        };
      case "IS_ADMIN":
          return {
            ...state,
            isAdmin: true,
      };
      case "IS_PANEL_MEMBER":
          return {
            ...state,
            isPanelMember: true,
      };
      case "IS_SUPERVISOR":
        return {
          ...state,
          isSupervisor: true,
    };
    case "IS_CO_SUPERVISOR":
      return {
        ...state,
        isCoSupervisor: true,
  };

      case "UPDATE_AVATAR":
        return {
          ...state,
          user: [{ avatar: action.payload }],
        };
      case "SIGNOUT":
        return {
          ...state,
          isLoggedIn: false,
          isPanelMember:false,
          isSupervisor:false,
          isCoSupervisor:false,
          isAdmin: false,
          token: "",
          user: [],
        };
      default:
        return state;
    }
  };
  
  export default AuthReducer;