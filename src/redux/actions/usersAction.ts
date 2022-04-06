import { RootState } from "./../store";
import { ThunkAction } from "redux-thunk";
import { Users, UsersActions, EnumUsers } from "../reducers/typesUsers";

export const setUserStore = (
  data: Users
): ThunkAction<void, RootState, null, UsersActions> => {
  return (dispatch) => {
    dispatch({
      type: EnumUsers.ADD_USER,
      payload: data,
    });
  };
};
