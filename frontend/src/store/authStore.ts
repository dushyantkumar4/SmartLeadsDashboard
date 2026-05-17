import { create } from "zustand";

import api from "../api/axios";

import toast from "react-hot-toast";

import type {
  AuthResponse,
  User,
} from "../types/auth.types.ts";

interface AuthState {
  user: User | null;

  token: string | null;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  register: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;

  logout: () => void;
}

export const useAuthStore =
  create<AuthState>((set) => ({
    user: JSON.parse(
      localStorage.getItem("user") ||
        "null"
    ),

    token:
      localStorage.getItem(
        "token"
      ),

    login: async (
      email,
      password
    ) => {
      try {
        const res =
          await api.post<AuthResponse>(
            "/login",
            {
              email,
              password,
            }
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        set({
          user: res.data.user,
          token:
            res.data.token,
        });

        toast.success(
          "Login successful"
        );
      } catch (error: unknown) {
        const message =
          typeof error === "object" &&
          error !== null
            ? (error as {
                response?: {
                  data?: {
                    message?: string;
                  };
                };
              }).response?.data?.message
            : undefined;

        toast.error(
          message ||
            "Login failed"
        );
      }
    },

    register: async (
      name,
      email,
      password,
      role
    ) => {
      try {
        const res =
          await api.post<AuthResponse>(
            "/register",
            {
              name,
              email,
              password,
              role,
            }
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        set({
          user: res.data.user,
          token:
            res.data.token,
        });

        toast.success(
          "Register successful"
        );
      } catch (error: unknown) {
        const message =
          typeof error === "object" &&
          error !== null
            ? (error as {
                response?: {
                  data?: {
                    message?: string;
                  };
                };
              }).response?.data?.message
            : undefined;

        toast.error(
          message ||
            "Register failed"
        );
      }
    },

    logout: () => {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      set({
        user: null,
        token: null,
      });

      toast.success(
        "Logout successful"
      );
    },
  }));