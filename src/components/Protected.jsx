import { Navigate, Outlet } from "react-router-dom";

const Protected = ({ children }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  
    return children ? children : <Outlet />;
}

export default Protected;
