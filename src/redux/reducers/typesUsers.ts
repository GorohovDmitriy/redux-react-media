export enum EnumUsers {
  ADD_USER = "ADD_USER",
}

export interface Users {
  displayName: string | null;
  email: string | null;
  image: string | null;
  uid: string | null;
  time?: string | null;
}

export interface UsersState {
  users: Users[] | [];
}

interface setUsersAction {
  type: typeof EnumUsers.ADD_USER;
  payload: Users;
}

export type UsersActions = setUsersAction;
