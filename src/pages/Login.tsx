import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DhartiLogo } from "../components/DhartiLogo";
import { FarmBackgroundImage } from "../components/FarmBackgroundImage";
import { useAuth } from "../context/AuthContext";

const demos = [
  { label: "Farmer", email: "farmer@demo.com", role: "farmer" as const },
  { label: "Analyst", email: "analyst@demo.com", role: "analyst" as const },
  { label: "Institution", email: "institution@demo.com", role: "institution" as const },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const userRole = login(email, password);
    if (!userRole) {
      setError("Invalid email or password. Use a demo account below.");
      return;
    }
    navigate(`/${userRole}`);
  }

  function fillDemo(demoEmail: string) {
    setEmail(demoEmail);
    setPassword("demo123");
    setError("");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      <FarmBackgroundImage position="fixed" overlayClassName="bg-emerald-950/85" />

      <div className="relative z-10 flex min-h-screen flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col items-center">
            <DhartiLogo variant="onDark" className="justify-center" />
            <Link
              to="/"
              className="mt-6 text-sm font-medium text-emerald-100/90 underline-offset-2 hover:text-white hover:underline"
            >
              ← Back to home
            </Link>
          </div>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-8 shadow-xl">
            <h1 className="text-center text-2xl font-semibold tracking-tight text-slate-900">
              Sign in
            </h1>
            <p className="mt-2 text-center text-sm text-slate-600">
              Access your workspace
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  placeholder="name@organization.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="w-full rounded-md bg-emerald-700 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
              >
                Sign in
              </button>
            </form>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Demo accounts
              </p>
              <p className="mt-1 text-center text-xs text-slate-500">Password for all: demo123</p>
              <div className="mt-4 flex flex-col gap-2">
                {demos.map((d) => (
                  <button
                    key={d.email}
                    type="button"
                    onClick={() => fillDemo(d.email)}
                    className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm transition hover:border-emerald-300 hover:bg-emerald-50/50"
                  >
                    <span className="font-semibold text-slate-900">{d.label}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">{d.email}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
