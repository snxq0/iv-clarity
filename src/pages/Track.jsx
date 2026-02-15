import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRepairs } from "../hooks/useRepairs";
import React from "react";

export default function Track() {
  const { public_id } = useParams();
  const { getRepairByPublicId } = useRepairs();
  const [repair, setRepair] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data, error } =
      await getRepairByPublicId(public_id);

    if (error || !data) {
      setNotFound(true);
      return;
    }

    setRepair(data);
  };

  if (notFound)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
        Repair not found
      </div>
    );

  if (!repair) return null;

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center space-y-6">
        <h1 className="text-lg font-semibold">
          Repair Status
        </h1>

        <div>
          <p className="text-sm text-zinc-400 mb-2">
            Current Status
          </p>
          <p className="text-xl font-semibold text-white">
            {repair.status}
          </p>
        </div>

        {repair.estimated_completion && (
          <div>
            <p className="text-sm text-zinc-400 mb-2">
              Estimated completion
            </p>
            <p className="text-white">
              {repair.estimated_completion}
            </p>
          </div>
        )}

        <p className="text-xs text-zinc-500">
          Last updated:{" "}
          {new Date(repair.updated_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}