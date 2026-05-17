import { Link } from "react-router-dom";

import type{ Lead } from "../types/lead.types.ts";

interface Props {
  lead: Lead;

  onDelete: (id: string) => void;
}

const LeadCard = ({
  lead,
  onDelete,
}: Props) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold">
        {lead.name}
      </h2>

      <p>{lead.email}</p>

      <p className="mt-2">
        Status:
        <span className="font-medium ml-1">
          {lead.status}
        </span>
      </p>

      <p>
        Source:
        <span className="font-medium ml-1">
          {lead.source}
        </span>
      </p>

      <div className="flex gap-2 mt-4">
        <Link
          to={`/lead/${lead._id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          View
        </Link>

        <Link
          to={`/edit-lead/${lead._id}`}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </Link>

        <button
          onClick={() =>
            onDelete(lead._id)
          }
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default LeadCard;