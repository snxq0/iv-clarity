import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepairs } from "../hooks/useRepairs";
import Layout from "../components/Layout";
import React from "react"

export default function Dashboard() {
  const { getRepairs } = useRepairs();
  const navigate = useNavigate();
  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    loadRepairs();
  }, []);

  const loadRepairs = async () => {
    const { data } = await getRepairs();
    if (data) setRepairs(data);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Repairs</h2>

        <button
          onClick={() => navigate("/dashboard/new")}
          className="bg-white text-black px-4 py-2 rounded-lg text-sm"
        >
          Create
        </button>
      </div>

      {repairs.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-400 mb-4">
            No repairs yet
          </p>

          <button
            onClick={() => navigate("/dashboard/new")}
            className="bg-white text-black px-4 py-2 rounded-lg text-sm"
          >
            Create first repair
          </button>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-800 text-zinc-400 border-b border-zinc-700">
              <tr>
                <th className="p-4 text-left">Public ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Device</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Updated</th>
                <th className="p-4"></th>
              </tr>
            </thead>

            <tbody>
              {repairs.map((repair) => (
                <tr
                  key={repair.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800 transition"
                >
                  <td className="p-4 font-mono text-xs text-zinc-400">
                    {repair.public_id}
                  </td>

                  <td className="p-4">
                    {repair.customer_name}
                  </td>

                  <td className="p-4 text-zinc-300">
                    {repair.device}
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-1 text-xs bg-zinc-800 border border-zinc-700 rounded-full">
                      {repair.status}
                    </span>
                  </td>

                  <td className="p-4 text-zinc-500">
                    {new Date(
                      repair.updated_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/repair/${repair.id}`)
                      }
                      className="text-xs text-white underline"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
