import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import AccountPage from "./pages/AccountPage";
import ChatsPage from "./pages/ChatsPage";

import PrivateRoute from "./HOC/PrivateRoute";
import AboutLayout from "./Components/AboutLayout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="chats"
            element={
              <PrivateRoute>
                <ChatsPage />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="/profile" element={<AboutLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <AboutPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/account" element={<AboutLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
