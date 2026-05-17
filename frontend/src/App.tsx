import { RouterProvider } from "react-router-dom";
import router from "./routes/Route.tsx";

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App