import { Navigate, Outlet } from "react-router-dom";
import Header2 from "./Header2";

const EmpProtected = ({ children, classnam }) => {
    if (!localStorage.getItem("token2")) {
      return <Navigate to="/sales/login" />;
    }

  if (classnam) {
    return (
      <div className={classnam}>
        <Header2 />
        {children ? children : <Outlet />}
      </div>
    );
  }
};

export default EmpProtected;
