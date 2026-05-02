"use client";

import { useState, FormEvent } from "react";

export default function LoginClient() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body?.message || "Login failed");
        setLoading(false);
        return;
      }

      // success: reload to let server render protected content
      window.location.reload();
    } catch {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F1EC]">
      <div className="w-full max-w-md rounded-2xl border border-[#E6D6C5] bg-white p-8 shadow-sm">
        <h2 className="font-playfair text-2xl text-[#1F3F5B]">Admin Login</h2>
        <p className="mt-1 text-sm text-[#8A8A8A]">Enter your admin credentials to view logs.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1F3F5B]">Username</label>
            <input required value={username} onChange={(e) => setUsername(e.target.value)} className="mt-2 w-full rounded-md border border-[#E6D6C5] px-3 py-2 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F3F5B]">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-md border border-[#E6D6C5] px-3 py-2 outline-none" />
          </div>

          {error ? <p className="text-sm text-[#8A1F1F]">{error}</p> : null}

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="rounded-full bg-[#1F3F5B] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
