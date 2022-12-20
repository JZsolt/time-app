import { Route, Routes } from "react-router-dom";
import AuthForms from "../pages/auth/AuthForms";
import Home from "../pages/Home";
import ProtectedPage from "../pages/ProtectedPage";
import { GuardedRoute } from "./GuardedRoute";

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
      <Route
        path="/protected"
        element={
          <GuardedRoute>
            <ProtectedPage />
          </GuardedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
