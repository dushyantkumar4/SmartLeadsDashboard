import { create } from "zustand";
import api from "../api/axios";
import type{ Lead } from "../types/lead.types.ts";

interface LeadState {
  leads: Lead[];
  loading: boolean;

  getLeads: () => Promise<void>;

  createLead: (
    data: Partial<Lead>
  ) => Promise<void>;

  deleteLead: (
    id: string
  ) => Promise<void>;
}

export const useLeadStore = create<LeadState>(
  (set, get) => ({
    leads: [],
    loading: false,

    getLeads: async () => {
      set({ loading: true });

      const res = await api.get("/");

      set({
        leads: res.data.data,
        loading: false,
      });
    },

    createLead: async (data) => {
      await api.post("/lead", data);

      get().getLeads();
    },

    deleteLead: async (id) => {
      await api.delete(`/${id}`);

      get().getLeads();
    },
  })
);