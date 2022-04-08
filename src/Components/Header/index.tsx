import React, { FC } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import Button from "../../UI/Button";

import { auth } from "../../firebase";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { signOutWithGoogle } from "../../redux/actions/authActions";

import "./index.scss";

const Header: FC = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state: RootState) => state.auth);

  const signUserOut = async () => {
    await signOut(auth).then(() => {
      dispatch(signOutWithGoogle());
      navigate("/login");
    });
  };

  return (
    <header className="header">
      <div>Logo</div>
      {isAuth && (
        <div className="header__link">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/chats">Chats</NavLink>
          <NavLink to="/account">Profile</NavLink>
        </div>
      )}
      {isAuth ? (
        <Button
          className="header__button"
          onClick={signUserOut}
          text="Sig Out"
        />
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
});

export default Header;
