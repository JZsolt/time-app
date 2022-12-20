import { Route, Routes } from "react-router-dom";
import AuthForms from "../pages/auth/AuthForms";
import LogIn from "../pages/auth/LogIn";
import Home from "../pages/Home";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="login"
        element={<AuthForms />}
      />
    </Routes>
  );
};

export default Router;
