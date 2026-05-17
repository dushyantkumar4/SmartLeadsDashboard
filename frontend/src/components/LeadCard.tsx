import { useNavigate } from "react-router-dom";
import type { Lead } from "../types/lead.types.ts";
import { useAuthStore } from "../store/authStore.ts";

interface Props {
  lead: Lead;

  onDelete: (id: string) => void;
}

const LeadCard = ({ lead, onDelete }: Props) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const isOwner = user
    ? (lead as { createdBy?: string }).createdBy === user._id
    : false;

  const isAdmin = user?.role === "admin";

  const canManage = isOwner || isAdmin;
  return (
    <div className="bg-white p-3 rounded-lg shadow flex justify-around items-center">
      <h2 className="font-medium">{lead.name}</h2>

      <p>{lead.email}</p>

      <p className="mt-2">
        Status:
        <span className="font-medium ml-1">{lead.status}</span>
      </p>

      <p>
        Source:
        <span className="font-medium ml-1">{lead.source}</span>
      </p>

      <div className="flex gap-2 items-center">
        <button
          onClick={() => navigate(`/lead/${lead._id}`)}
          disabled={!canManage}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          View
        </button>

        <button
          onClick={() => navigate(`/edit/${lead._id}`)}
          disabled={!canManage}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(lead._id)}
          disabled={!canManage}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default LeadCard;
