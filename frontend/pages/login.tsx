import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { login } = useAuth();

  interface LoginResponse {
    user: { id: number; role: string };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:4000/login",
        formData
      );

      if (response.status === 200) {
        const { id: userId, role } = response.data.user;
        login(userId, role);
        setSuccess("Logged in successfully!");
        setFormData({ email: "", password: "" });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gray-100 py-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Log In
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Log in to access your account.
          </p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6 text-gray-800">
              <label htmlFor="email" className="block font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6 text-gray-800">
              <label htmlFor="password" className="block font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
              >
                Log In
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-indigo-600 font-medium hover:underline cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
