import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import api from "../../api/axios";

import Loader from "../../components/Loader";

const EditLead = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "New",
    source: "Website",
  });

  const getLead = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/${id}`);

      setFormData(res.data.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  useEffect(() => {
    getLead();
  }, []);

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

    try {
      await api.patch(`/${id}`, formData);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-5">Edit Lead</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-3 rounded"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-3 rounded"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        <div>
          <label htmlFor="source" className="block text-sm font-medium mb-1">
            Source
          </label>
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="website">Website</option>
            <option value="instagram">Instagram</option>
            <option value="referral">Referral</option>
          </select>
        </div>

        <button className="bg-black text-white px-5 py-3 rounded">
          Update Lead
        </button>
      </form>
    </div>
  );
};

export default EditLead;
