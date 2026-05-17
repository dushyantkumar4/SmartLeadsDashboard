import { useEffect } from "react";
import { useLeadStore } from "../../store/leadStore";

const Dashboard = () => {
  const {
    leads,
    getLeads,
    deleteLead,
  } = useLeadStore();

  useEffect(() => {
    getLeads();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-5">
        Leads
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leads.map((lead) => (
          <div
            key={lead._id}
            className="border rounded-lg p-4 shadow"
          >
            <h2 className="font-bold">
              {lead.name}
            </h2>

            <p>{lead.email}</p>

            <p>{lead.status}</p>

            <p>{lead.source}</p>

            <button
              onClick={() =>
                deleteLead(lead._id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded mt-3"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;