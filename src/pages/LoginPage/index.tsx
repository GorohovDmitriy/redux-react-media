import { FC } from "react";
import { signInWithPopup } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, provider } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { signInWithGoogle } from "../../redux/actions/authActions";
import { setUserStore } from "../../redux/actions/usersAction";
import { User } from "../../redux/reducers/typesAuth";

import Button from "../../UI/Button";

import "./index.scss";

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signIn = async () => {
    await signInWithPopup(auth, provider).then(({ user }) => {
      if (user) {
        const newUser: User = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          image: user.photoURL,
        };
        const usersCollection = collection(db, "users");
        addDoc(usersCollection, {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          image: user.photoURL,
        });
        dispatch(
          setUserStore({
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            image: user.photoURL,
          })
        );
        dispatch(signInWithGoogle(newUser));
        navigate("/");
      }
    });
  };

  return (
    <div className="login">
      <div className="login__form">
        <h4>Sign In With Google to Continue</h4>
        <Button
          icon={<FcGoogle size={30} />}
          text="Sign in with Google"
          className="login__button"
          onClick={signIn}
        />
      </div>
    </div>
  );
};

export default LoginPage;
