import { EnumUsers, UsersActions, UsersState, Users } from "./typesUsers";

const initialState: UsersState = {
  users: [],
};

const saveUserToLS = (user: Users) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const usersReducer = (state = initialState, action: UsersActions) => {
  switch (action.type) {
    case EnumUsers.ADD_USER:
      saveUserToLS(action.payload);

      return {
        ...state,
        users: [...state.users, action.payload],
      };

    default:
      return state;
  }
};
