import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuthStore();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<"admin" | "sales" | "">("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await register(name, email, password, role);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-5">Register</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="w-full border p-3 rounded"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="role">
            Role
          </label>
          <select
            id="role"
            className="w-full border p-3 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "sales")}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="admin">Admin</option>
            <option value="sales">Sales</option>
          </select>
        </div>

        <button className="w-full bg-black text-white p-3 rounded">
          Submit
        </button>

        <p className="mt-4 text-center">
          Have account?
          <Link to="/login" className="text-blue-500 ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
