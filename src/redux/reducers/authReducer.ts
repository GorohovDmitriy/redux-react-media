import { AuthState, AuthActions, EnumAuth } from "../reducers/typesAuth";

const initialState: AuthState = {
  user: null,
  isAuth: false,
};

export const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case EnumAuth.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case EnumAuth.SIGN_OUT:
      return {
        user: null,
        isAuth: false,
      };
    default:
      return state;
  }
};
