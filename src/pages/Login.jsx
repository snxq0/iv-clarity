import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import React from "react"

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await signIn(email, password);

    if (error) {
      setErrorMessage("Invalid credentials");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-xl font-semibold text-zinc-100">
            IV Clarity
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Repair Transparency
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs text-zinc-400 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-white"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-white"
              placeholder="••••••••"
            />
          </div>

          {errorMessage && (
            <div className="text-xs text-red-400">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            Sign In
          </button>
          
          <div className="mt-4 text-center space-y-2">
  <a
    href="/reset-password"
    className="text-xs text-zinc-400 hover:text-white block"
  >
    Forgot password?
  </a>

  <a
    href="/signup"
    className="text-xs text-zinc-400 hover:text-white block"
  >
    Create account
  </a>
</div>
        </form>

        
      </div>
    </div>
  );
}
