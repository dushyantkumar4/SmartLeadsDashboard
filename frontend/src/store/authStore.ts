import { create } from "zustand";
import api from "../api/axios";
import type { AuthResponse } from "../types/auth.types.ts";


interface AuthState {
  user: AuthResponse["user"] | null;
  token: string | null;

  login: (email: string, password: string) => Promise<void>;

  register: (
    name: string,
    email: string,
    password: string,
    role: string,
  ) => Promise<void>;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  

  login: async (email, password) => {
    const res = await api.post<AuthResponse>("/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    set({
      user: res.data.user,
      token: res.data.token,
    });
  },

  register: async (name, email, password, role) => {
    const res = await api.post<AuthResponse>("/register", {
      name,
      email,
      password,
      role,
    });

    localStorage.setItem("token", res.data.token);

    set({
      user: res.data.user,
      token: res.data.token,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
    });
    window.location.href = "/login";
  },
}));
