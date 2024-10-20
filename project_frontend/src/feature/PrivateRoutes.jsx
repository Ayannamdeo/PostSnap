import { Outlet, Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Privateroutes = ({ isAuth }) => {
  const token = sessionStorage.getItem("JWT");
  return isAuth && token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};
