import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLeadStore } from "../../store/leadStore.ts";
import Loader from "../../components/Loader.tsx";
import EmptyState from "../../components/EmptyState.tsx";
import LeadCard from "../../components/LeadCard.tsx";
import Pagination from "../../components/Pagination.tsx";

const Dashboard = () => {
  const { leads, loading, getLeads, deleteLead, pagination } = useLeadStore();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("");

  const [source, setSource] = useState<string>("");

  const [search, setSearch] = useState<string>("");

  const [sort, setSort] = useState<string>("latest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    getLeads(currentPage, {
      status,
      source,
      search: debouncedSearch,
      sort,
    });
  }, [currentPage, status, source, debouncedSearch, sort]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Leads Dashboard</h1>
        <button
          className="border px-4 py-1.5 rounded-lg"
          onClick={() => navigate("/create")}
        >
          Create New Lead
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-3 rounded"
        >
          <option value=""className="dark:text-white dark:bg-black">All Status</option>

          <option value="new"className="dark:text-white dark:bg-black">New</option>

          <option value="contacted"className="dark:text-white dark:bg-black">Contacted</option>

          <option value="qualified"className="dark:text-white dark:bg-black">Qualified</option>

          <option value="lost"className="dark:text-white dark:bg-black">Lost</option>
        </select>

        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border p-3 rounded"
        >
          <option value="" className="dark:text-white dark:bg-black">All Sources</option>

          <option value="website" className="dark:text-white dark:bg-black">Website</option>

          <option value="instagram" className="dark:text-white dark:bg-black">Instagram</option>

          <option value="referral" className="dark:text-white dark:bg-black">Referral</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-3 rounded"
        >
          <option value="latest" className="dark:text-white dark:bg-black">Latest</option>

          <option value="oldest" className="dark:text-white dark:bg-black">Oldest</option>
        </select>
      </div>

      {leads.length === 0 ? (
        <EmptyState message="No Leads Found" />
      ) : (
        <>
          <div className="grid grid-cols-1  gap-4">
            {leads.map((lead) => (
              <LeadCard key={lead._id} lead={lead} onDelete={deleteLead} />
            ))}
          </div>

          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
