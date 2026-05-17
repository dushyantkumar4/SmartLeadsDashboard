import { create } from "zustand";
import toast from "react-hot-toast";
import api from "../api/axios.ts";

import type { Lead, PaginationData } from "../types/lead.types.ts";

interface LeadState {
  leads: Lead[];

  loading: boolean;

  pagination: PaginationData;

  getLeads: (page?: number) => Promise<void>;

  createLead: (data: Partial<Lead>) => Promise<void>;

  deleteLead: (id: string) => Promise<void>;
}

export const useLeadStore = create<LeadState>((set, get) => ({
  leads: [],

  loading: false,

  pagination: {
    total: 0,
    page: 1,
    totalPages: 1,
  },

  getLeads: async (page = 1) => {
    try {
      set({ loading: true });

      const res = await api.get(`/lead/?page=${page}`);

      set({
        leads: res.data.data,

        pagination: res.data.pagination,

        loading: false,
      });
    } catch (error) {
      set({ loading: false });

      console.log(error);
    }
  },

  createLead: async (data) => {
    try {
      await api.post("/lead", data);
      toast.success("Lead created successfully");
      get().getLeads();
    } catch (error) {
      console.log(error);
    }
  },

  deleteLead: async (id) => {
    try {
      await api.delete(`/lead/${id}`);
      toast.success("Lead deleted successfully");
      get().getLeads();
    } catch (error) {
      console.log(error);
    }
  },
}));
