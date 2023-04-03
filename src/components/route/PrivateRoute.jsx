import { Outlet, Navigate } from "react-router";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import Spinner from "../tools/Spinner";

export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return (
      <div className="flex align-middle justify-center mt-[50vh]">
        <Spinner />
      </div>
    );
  }
  return loggedIn ? <Outlet /> : <Navigate to="/signIn" />;
}
