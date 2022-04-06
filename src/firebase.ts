import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMD3AlJ8uXVIRbRuRAs-8flOmfG1mWmDE",
  authDomain: "react-redux-app-20325.firebaseapp.com",
  projectId: "react-redux-app-20325",
  storageBucket: "react-redux-app-20325.appspot.com",
  messagingSenderId: "850256639965",
  appId: "1:850256639965:web:ca1bfa1d195975139de834",
  measurementId: "G-C0DL28G04D",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
