import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore.ts";

const LandingPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl text-center mt-5">Smart Leads Dashboard</h1>
      <div className="flex gap-5 items-center justify-center">
        <Link
          to="/dashboard"
          className="inline-block mt-6 bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded"
        >
          Explore More
        </Link>
        {user ? (
          ""
        ) : (
          <Link
            to="/login"
            className="inline-block mt-6 bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
