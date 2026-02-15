import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRepairs } from "../hooks/useRepairs";
import { STATUSES } from "../constants/statuses";
import Layout from "../components/Layout";
import React from "react";

export default function RepairDetails() {
  const { id } = useParams();
  const { getRepairById, updateRepair, getHistory } = useRepairs();

  const [repair, setRepair] = useState(null);
  const [status, setStatus] = useState("");
  const [estimated, setEstimated] = useState("");
  const [history, setHistory] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await getRepairById(id);
    if (data) {
      setRepair(data);
      setStatus(data.status);
      setEstimated(data.estimated_completion || "");
    }

    const { data: historyData } = await getHistory(id);
    if (historyData) setHistory(historyData);
  };

  const handleSave = async () => {
    await updateRepair(id, status, estimated);
    await load();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!repair) return null;

  return (
    <Layout>
      <div className="max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">
            Repair {repair.public_id}
          </h2>
          <p className="text-xs text-zinc-500">
            Last updated:{" "}
            {new Date(repair.updated_at).toLocaleString()}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <p><strong>Customer:</strong> {repair.customer_name}</p>
          <p><strong>Email:</strong> {repair.customer_email}</p>
          <p><strong>Device:</strong> {repair.device}</p>
          <p><strong>Issue:</strong> {repair.issue}</p>
        </div>

        <div className="space-y-3">
          <label className="text-xs text-zinc-400">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm"
          >
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <label className="text-xs text-zinc-400">
            Estimated completion date
          </label>

          <input
            type="date"
            value={estimated}
            onChange={(e) => setEstimated(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm"
          />

          <button
            onClick={handleSave}
            className="w-full bg-white text-black py-2 rounded-lg text-sm"
          >
            Save
          </button>

          {saved && (
            <p className="text-xs text-green-400">
              ✓ Updated successfully
            </p>
          )}
        </div>

        <div className="border-t border-zinc-800 pt-4">
          <h3 className="text-sm font-semibold mb-3">
            History
          </h3>

          {history.length === 0 && (
            <p className="text-xs text-zinc-500">
              No changes yet
            </p>
          )}

          {history.map((item) => (
            <div
              key={item.id}
              className="text-xs text-zinc-400 mb-2"
            >
              {item.status} —{" "}
              {new Date(item.created_at).toLocaleString()}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}