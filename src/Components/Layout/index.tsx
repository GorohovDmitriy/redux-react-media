import React, { FC } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import Right from "../Sidebar/Right";
import Left from "../Sidebar/Left";
import NewPost from "../NewPost";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import "./index.scss";

const Layout: FC = React.memo(() => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return (
    <div className="container">
      <Header />
      <div className={isAuth ? "wrapper" : "wrapper__login"}>
        {isAuth && <Left />}
        <div className="wrapper__center">
          {isAuth && <NewPost />}
          <Outlet />
        </div>
        {isAuth && <Right />}
      </div>
      <Footer />
    </div>
  );
});

Layout.displayName = "Layout";

export default Layout;
