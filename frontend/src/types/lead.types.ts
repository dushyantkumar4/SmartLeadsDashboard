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