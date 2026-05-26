import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const RutasPrivadas = () => {
  const tieneLogin = useSelector((state) => state.auth.token);
  return tieneLogin ? <Outlet /> : <Navigate to={"/login"} replace />;
};
