import { EnumUsers, UsersActions, UsersState } from "./typesUsers";

const initialState: UsersState = {
  users: [],
};

export const usersReducer = (state = initialState, action: UsersActions) => {
  switch (action.type) {
    case EnumUsers.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    default:
      return state;
  }
};
