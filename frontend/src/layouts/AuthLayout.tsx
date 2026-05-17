import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AuthLayout = () => {
  return (
   <div className="min-h-screen bg-gray-100">
      <Navbar />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
    </div>
  );
};

export default AuthLayout;