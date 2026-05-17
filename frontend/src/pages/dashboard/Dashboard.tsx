import { useEffect } from "react";

import {
  useLeadStore,
} from "../../store/leadStore.ts";
import Loader from "../../components/Loader.tsx";
import EmptyState from "../../components/EmptyState.tsx";
import LeadCard from "../../components/LeadCard.tsx";
import Pagination from "../../components/Pagination.tsx";

const Dashboard = () => {
  const {
    leads,
    loading,
    getLeads,
    deleteLead,
    pagination,
  } = useLeadStore();

  useEffect(() => {
    getLeads(1);
  }, []);

  const handlePageChange = (
    page: number
  ) => {
    getLeads(page);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">
          Leads Dashboard
        </h1>
      </div>

      {leads.length === 0 ? (
        <EmptyState message="No Leads Found" />
      ) : (
        <>
          <div className="grid grid-cols-1  gap-4">
            {leads.map((lead) => (
              <LeadCard
                key={lead._id}
                lead={lead}
                onDelete={
                  deleteLead
                }
              />
            ))}
          </div>

          <Pagination
            currentPage={
              pagination.page
            }
            totalPages={
              pagination.totalPages
            }
            onPageChange={
              handlePageChange
            }
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;