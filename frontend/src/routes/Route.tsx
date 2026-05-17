import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/auth/Login.tsx";
import Register from "../pages/auth/Register.tsx";

import Dashboard from "../pages/dashboard/Dashboard.tsx";
import CreateLead from "../pages/dashboard/CreateLead.tsx";
import EditLead from "../pages/dashboard/EditLead.tsx";
import LeadDetails from "../pages/dashboard/LeadDetails.tsx";

import ProtectedRoute from "../components/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",

    children: [
      {
        element: <AuthLayout />,

        children: [
          {
            path: "register",
            element: <Register />,
          },

          {
            path: "login",
            element: <Login />,
          },
        ],
      },

      {
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),

        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },

          {
            path: "create-lead",
            element: <CreateLead />,
          },

          {
            path: "edit-lead/:id",
            element: <EditLead />,
          },

          {
            path: "lead/:id",
            element: <LeadDetails />,
          },
        ],
      },
    ],
  },
]);

export default router;
