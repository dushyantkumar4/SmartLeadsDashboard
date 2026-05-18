import { RouterProvider } from "react-router-dom";
import router from "./routes/Route.tsx";
import { Toaster } from "react-hot-toast";
import { commonStore } from "./store/commonStore.ts";

const App = () => {
  const theme = commonStore((state) => state.theme);
  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white">
        <Toaster />
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
