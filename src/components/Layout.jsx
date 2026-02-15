import { useAuth } from "../hooks/useAuth";
import React from "react"

export default function Layout({ children }) {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              IV Clarity
            </h1>
            <p className="text-xs text-zinc-400">
              Repair Transparency
            </p>
          </div>

          <button
            onClick={signOut}
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
