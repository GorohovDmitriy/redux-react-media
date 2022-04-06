import { EnumAuth, User } from "../reducers/typesAuth";
import { RootState } from "./../store";
import { ThunkAction } from "redux-thunk";
import { AuthActions } from "../reducers/typesAuth";

export const signInWithGoogle = (
  user: User
): ThunkAction<void, RootState, null, AuthActions> => {
  return (dispatch) => {
    dispatch({
      type: EnumAuth.SET_USER,
      payload: user,
    });
  };
};

export const signOutWithGoogle = (): ThunkAction<
  void,
  RootState,
  null,
  AuthActions
> => {
  return (dispatch) => {
    dispatch({
      type: EnumAuth.SIGN_OUT,
    });
  };
};
