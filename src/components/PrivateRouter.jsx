import { Outlet, Navigate } from "react-router-dom";
const PrivateRouter = () => {
  const userAuthenticated = localStorage.getItem("token");
  console.log(userAuthenticated);

  if (!userAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRouter;
