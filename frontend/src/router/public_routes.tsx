import { Navigate } from "react-router-dom";

export function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("access_token");

  return token ? <Navigate to="/tickets" replace /> : children;
}