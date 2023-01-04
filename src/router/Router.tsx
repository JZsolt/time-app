import { Route, Routes } from "react-router-dom";
import AuthForms from "../pages/auth/AuthForms";
import Home from "../pages/Home";
import { GuardedRoute } from "./GuardedRoute";
import AddMembers from "../pages/AddMembers";

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
        path="/add-members"
        element={
          <GuardedRoute>
            <AddMembers />
          </GuardedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
