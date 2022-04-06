import React, { FC } from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

const PrivateRoute: FC = React.memo(({ children }) => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
});

export default PrivateRoute;
