import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.ts";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuthStore();

  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await login(email, password);

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
        <h2 className="text-2xl font-bold mb-5">Login</h2>

        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="email">Eamil:</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded mb-4"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded mb-4"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="w-full bg-black text-white p-3 rounded">
          Login
        </button>

        <p className="mt-4 text-center">
          No account?
          <Link to="/register" className="text-blue-500 ml-1">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
