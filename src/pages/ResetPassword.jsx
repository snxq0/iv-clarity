import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://iv-clarity.vercel.app/login"
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Reset link sent.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-xl w-full max-w-sm border border-zinc-800">
        <h1 className="text-white text-xl mb-6 text-center">
          Reset Password
        </h1>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-lg text-sm font-semibold"
          >
            Send reset link
          </button>
        </form>

        {message && (
          <p className="mt-4 text-xs text-zinc-400 text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}