import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
    <div className="max-w-xl bg-white dark:bg-black p-6 rounded-lg shadow place-self-center w-full">
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-2xl font-bold">Create Lead</h1>
        <Link
          to="/dashboard"
          className="inline-block mt-6 bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded"
        >
          Back
        </Link>
      </div>

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
            required
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
            required
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
            <option value="new" className="dark:text-white dark:bg-black">New</option>
            <option value="contacted" className="dark:text-white dark:bg-black">Contacted</option>
            <option value="qualified" className="dark:text-white dark:bg-black">Qualified</option>
            <option value="lost" className="dark:text-white dark:bg-black">Lost</option>
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
            <option value="website" className="dark:text-white dark:bg-black">Website</option>
            <option value="instagram" className="dark:text-white dark:bg-black">Instagram</option>
            <option value="referral" className="dark:text-white dark:bg-black">Referral</option>
          </select>
        </div>

        <button className="bg-black text-white dark:bg-white dark:text-black px-5 py-3 rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateLead;
