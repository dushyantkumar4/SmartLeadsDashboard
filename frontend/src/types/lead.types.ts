export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
}

export interface PaginationData {
  total: number;
  page: number;
  totalPages: number;
}

interface Filters {
  status?: string;

  source?: string;

  search?: string;

  sort?: string;
}

export interface LeadState {
  leads: Lead[];

  loading: boolean;

  pagination: PaginationData;

  getLeads: (
    page?: number,
    filters?: Filters
  ) => Promise<void>;

  createLead: (
    data: Partial<Lead>
  ) => Promise<void>;

  deleteLead: (
    id: string
  ) => Promise<void>;
}