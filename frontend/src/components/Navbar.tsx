import { useAuthStore } from "../store/authStore.ts";
import { useNavigate } from "react-router-dom";
import { commonStore } from "../store/commonStore.ts";

const Navbar = () => {
  const theme = commonStore((state) => state.theme);
  const toggleTheme = commonStore((state) => state.toggleTheme);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-center py-3 px-5 shadow-lg rounded-md">
        {/* Name  */}
        <div className="hover:text-shadow-lg hover:text-shadow-purple-600 font-semibold cursor-pointer text-lg">
          Lead Management
        </div>
        {/* nav Links */}

        <div className="flex gap-10 items-center">
          <button className="text-lg font-semibold cursor-pointer" onClick={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"}
          </button>
          {user ? (
            <button
              onClick={logout}
              className="text-lg font-semibold text-red-500 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-lg font-semibold cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
