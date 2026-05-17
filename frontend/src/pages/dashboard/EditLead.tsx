import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../../api/axios";

import Loader from "../../components/Loader";

const EditLead = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      status: "New",
      source: "Website",
    });

  const getLead = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/${id}`
      );

      setFormData(
        res.data.data
      );

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

    try {
      await api.patch(
        `/${id}`,
        formData
      );

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
      <h1 className="text-2xl font-bold mb-5">
        Edit Lead
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-3 rounded"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option>New</option>

          <option>
            Contacted
          </option>

          <option>
            Qualified
          </option>

          <option>Lost</option>
        </select>

        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option>
            Website
          </option>

          <option>
            Instagram
          </option>

          <option>
            Referral
          </option>
        </select>

        <button className="bg-black text-white px-5 py-3 rounded">
          Update Lead
        </button>
      </form>
    </div>
  );
};

export default EditLead;