import { Route, Routes } from "react-router-dom";
import AuthForms from "../pages/auth/AuthForms";
import Home from "../pages/Home";
import { GuardedRoute } from "./GuardedRoute";
import AddMembers from "../pages/AddEditMembers";
import TimeTable from "../pages/layout/TimeTable/TimeTable";

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
      <Route
        path="/edit-member"
        element={
          <GuardedRoute>
            <AddMembers />
          </GuardedRoute>
        }
      />
      <Route
        path="/time-table"
        element={
          <GuardedRoute>
            <TimeTable />
          </GuardedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
