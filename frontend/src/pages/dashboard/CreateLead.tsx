import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useLeadStore,
} from "../../store/leadStore.ts";

const CreateLead = () => {
  const navigate = useNavigate();

  const { createLead } =
    useLeadStore();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      status: "New",
      source: "Website",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await createLead(formData);

    navigate("/dashboard");
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-5">
        Create Lead
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <select
          name="status"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Lost</option>
        </select>

        <select
          name="source"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        >
          <option>Website</option>
          <option>Instagram</option>
          <option>Referral</option>
        </select>

        <button className="bg-black text-white px-5 py-3 rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateLead;