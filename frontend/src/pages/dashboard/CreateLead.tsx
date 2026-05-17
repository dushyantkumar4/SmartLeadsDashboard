import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLeadStore } from "../../store/leadStore.ts";

const CreateLead = () => {
  const navigate = useNavigate();

  const { createLead } = useLeadStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "New",
    source: "Website",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    await createLead(formData);

    navigate("/dashboard");
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-lg shadow place-self-center w-full">
      <h1 className="text-2xl font-bold mb-5">Create Lead</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="block font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            className="w-full border p-3 rounded"
            onChange={handleChange}
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Lost</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="source" className="block font-medium">
            Source
          </label>
          <select
            id="source"
            name="source"
            value={formData.source}
            className="w-full border p-3 rounded"
            onChange={handleChange}
          >
            <option>Website</option>
            <option>Instagram</option>
            <option>Referral</option>
          </select>
        </div>

        <button className="bg-black text-white px-5 py-3 rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateLead;
