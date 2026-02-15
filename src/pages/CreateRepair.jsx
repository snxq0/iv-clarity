import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepairs } from "../hooks/useRepairs";
import { generatePublicId } from "../lib/generatePublicId";
import Layout from "../components/Layout";
import React from "react"

export default function CreateRepair() {
  const navigate = useNavigate();
  const { createRepair } = useRepairs();

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    device: "",
    issue: "",
  });

  const [link, setLink] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const public_id = generatePublicId();

    const { error } = await createRepair({
      ...form,
      public_id,
      status: "Received",
    });

    if (!error) {
      setLink(
        `${window.location.origin}/track/${public_id}`
      );
    }
  };

  return (
    <Layout>
      <div className="max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-6">
          Create Repair
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="customer_name"
            placeholder="Customer Name"
            onChange={handleChange}
            required
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-white"
          />

          <input
            name="customer_email"
            type="email"
            placeholder="Customer Email"
            onChange={handleChange}
            required
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-white"
          />

          <input
            name="device"
            placeholder="Device"
            onChange={handleChange}
            required
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-white"
          />

          <textarea
            name="issue"
            placeholder="Issue Description"
            onChange={handleChange}
            required
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-white"
          />

          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-lg text-sm hover:opacity-90 transition"
          >
            Create
          </button>
        </form>

        {link && (
          <div className="mt-6 p-4 bg-zinc-800 border border-zinc-700 rounded-lg text-sm">
            <p className="text-zinc-400 mb-2">
              Public tracking link:
            </p>

            <a
              href={link}
              target="_blank"
              className="text-white underline break-all"
            >
              {link}
            </a>

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 w-full bg-white text-black py-2 rounded-lg text-sm"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
