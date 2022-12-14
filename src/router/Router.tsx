import { Route, Routes } from "react-router-dom";
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
        element={<LogIn />}
      />
    </Routes>
  );
};

export default Router;
