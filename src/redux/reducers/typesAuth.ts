export enum EnumAuth {
  SET_USER = "SET_USER",
  SIGN_OUT = "SIGN_OUT",
  SIGN_IN = "SIGN_IN",
}

export interface User {
  displayName: string | null;
  email: string | null;
  image: string | null;
  uid: string;
}

export interface AuthState {
  user: User | null;
  isAuth: boolean;
}

// Actions

interface SetUserAction {
  type: typeof EnumAuth.SET_USER;
  payload: User;
}

interface SignOutAction {
  type: typeof EnumAuth.SIGN_OUT;
}

interface SignInActions {
  type: typeof EnumAuth.SIGN_IN;
}

export type AuthActions = SetUserAction | SignOutAction | SignInActions;
