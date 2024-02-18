import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { userData } = useSelector((state) => state.auth);
  return userData ? element : <Navigate to={"/login"} />;
};

export default PrivateRoute;
