import { create } from "zustand";
import toast from "react-hot-toast";
import api from "../api/axios.ts";

import type {LeadState } from "../types/lead.types.ts";

export const useLeadStore = create<LeadState>((set, get) => ({
  leads: [],

  loading: false,

  pagination: {
    total: 0,
    page: 1,
    totalPages: 1,
  },

  getLeads: async (page = 1, filters = {}) => {
    try {
      set({ loading: true });

      const query = new URLSearchParams({
        page: String(page),

        ...(filters.status && {
          status: filters.status,
        }),

        ...(filters.source && {
          source: filters.source,
        }),

        ...(filters.search && {
          search: filters.search,
        }),

        ...(filters.sort && {
          sort: filters.sort,
        }),
      });

      const res = await api.get(`/?${query.toString()}`);

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
      await api.post("/", data);
      toast.success("Lead created successfully");
      get().getLeads();
    } catch (error) {
      console.log(error);
    }
  },

  deleteLead: async (id) => {
    try {
      await api.delete(`/${id}`);
      toast.success("Lead deleted successfully");
      get().getLeads();
    } catch (error) {
      console.log(error);
    }
  },
}));
