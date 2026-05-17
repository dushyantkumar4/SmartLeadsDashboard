import { useEffect, useState } from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import api from "../../api/axios.ts";

import type { Lead } from "../../types/lead.types.ts";

import Loader from "../../components/Loader.tsx";

const LeadDetails = () => {
  const { id } = useParams();

  const [lead, setLead] =
    useState<Lead | null>(null);

  const [loading, setLoading] =
    useState(false);

  const getLead = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/${id}`
      );

      setLead(res.data.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  useEffect(() => {
    getLead();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!lead) {
    return (
      <div>
        Lead Not Found
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl place-self-center w-full">

      <h1 className="text-3xl font-bold mb-6">
        Lead Details
      </h1>

      <div className="space-y-4">
        <div>
          <p className="font-semibold">
            Name
          </p>

          <p>{lead.name}</p>
        </div>

        <div>
          <p className="font-semibold">
            Email
          </p>

          <p>{lead.email}</p>
        </div>

        <div>
          <p className="font-semibold">
            Status
          </p>

          <p>{lead.status}</p>
        </div>

        <div>
          <p className="font-semibold">
            Source
          </p>

          <p>{lead.source}</p>
        </div>

        <div>
          <p className="font-semibold">
            Created At
          </p>

          <p>
            {new Date(
              lead.createdAt
            ).toLocaleDateString()}
          </p>
        </div>
      </div>

      <Link
        to="/dashboard"
        className="inline-block mt-6 bg-black text-white px-5 py-2 rounded"
      >
        Back
      </Link>
    </div>
  );
};

export default LeadDetails;