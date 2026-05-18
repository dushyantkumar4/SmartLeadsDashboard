import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      
    </div>
  );
};

export default MainLayout;