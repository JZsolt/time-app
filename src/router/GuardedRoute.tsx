import { Navigate } from "react-router-dom";

export const GuardedRoute = ({ children }: { children: JSX.Element }) => {
  const userStorage: string | null = localStorage.getItem("user");
  const userObj = userStorage ? JSON.parse(userStorage) : "";

  return userObj.jwt ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};
