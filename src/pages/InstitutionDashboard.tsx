import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { DhartiLogo } from "../components/DhartiLogo";
import { useAuth } from "../context/AuthContext";

const cropMix = [
  { name: "Cereals", value: 38 },
  { name: "Pulses", value: 18 },
  { name: "Cash crops", value: 24 },
  { name: "Horticulture", value: 20 },
];

const COLORS = ["#059669", "#0ea5e9", "#f59e0b", "#8b5cf6"];

const yieldForecast = [
  { q: "Q1", est: 4.2, conf: 3.9 },
  { q: "Q2", est: 4.5, conf: 4.1 },
  { q: "Q3", est: 4.1, conf: 3.8 },
  { q: "Q4", est: 4.6, conf: 4.3 },
];

const districtPerf = [
  { d: "A", score: 82 },
  { d: "B", score: 76 },
  { d: "C", score: 71 },
  { d: "D", score: 88 },
  { d: "E", score: 65 },
];

export default function InstitutionDashboard() {
  const { logout, email } = useAuth();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const dark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors ${
        dark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <header
        className={`sticky top-0 z-10 border-b backdrop-blur ${
          dark ? "border-slate-800 bg-slate-950/90" : "border-slate-200 bg-white/90"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <DhartiLogo variant={dark ? "onDark" : "onLight"} showTagline={false} />
            <h1
              className={`mt-3 text-2xl font-bold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}
            >
              Institution command center
            </h1>
            <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}>
              Strategic analytics · Policy-ready exports · Decision-oriented KPIs
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className={`hidden text-sm sm:inline ${dark ? "text-slate-400" : "text-slate-500"}`}>
              {email}
            </span>
            <button
              type="button"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                dark
                  ? "border-slate-600 text-slate-200 hover:bg-slate-900"
                  : "border-slate-300 text-slate-800 hover:bg-slate-100"
              }`}
            >
              {dark ? "Light" : "Dark"} theme
            </button>
            <button
              type="button"
              onClick={() => logout()}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                dark ? "bg-emerald-600 text-white hover:bg-emerald-500" : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-4 py-8 lg:px-8">
        <section>
          <h2 className="text-xl font-bold">Aggregated data overview</h2>
          <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}>
            National roll-up · Program monitoring · Baseline vs. target
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Farmers onboarded", value: "48,320", delta: "+6.2% YoY" },
              { label: "Active districts", value: "214", delta: "Coverage 86%" },
              { label: "Yield estimate (avg.)", value: "4.3 t/ha", delta: "Model v3.2" },
              { label: "Alert clearance time", value: "36h", delta: "−12% vs. Q4" },
            ].map((k) => (
              <div
                key={k.label}
                className={`rounded-xl border p-5 shadow-sm ${
                  dark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
                }`}
              >
                <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>{k.label}</p>
                <p className="mt-2 text-3xl font-bold tabular-nums">{k.value}</p>
                <p className="mt-1 text-xs font-medium text-emerald-500">{k.delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div
              className={`rounded-xl border p-6 shadow-sm ${
                dark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
              }`}
            >
              <h3 className="font-semibold">Crop distribution</h3>
              <p className={`text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>
                Share of enrolled acreage by category
              </p>
              <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cropMix}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label
                    >
                      {cropMix.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div
              className={`rounded-xl border p-6 shadow-sm ${
                dark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
              }`}
            >
              <h3 className="font-semibold">Yield estimates</h3>
              <p className={`text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>
                Forecast vs. confidence band (scenario planning)
              </p>
              <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yieldForecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#334155" : "#e2e8f0"} />
                    <XAxis dataKey="q" tick={{ fill: dark ? "#94a3b8" : "#64748b", fontSize: 11 }} />
                    <YAxis tick={{ fill: dark ? "#94a3b8" : "#64748b", fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        background: dark ? "#0f172a" : "#fff",
                        border: dark ? "1px solid #334155" : "1px solid #e2e8f0",
                      }}
                    />
                    <Bar dataKey="est" fill="#059669" name="Estimate" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="conf" fill="#38bdf8" name="Confidence floor" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold">Risk & prediction models</h2>
          <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}>
            Yield forecasting · Climate risk zones · Disease outbreak probability
          </p>
          <div
            className={`mt-6 grid gap-4 rounded-xl border p-6 lg:grid-cols-3 ${
              dark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
            }`}
          >
            <div>
              <h3 className="font-semibold text-emerald-500">Yield forecasting</h3>
              <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>
                Ensemble model blends weather analog years with district-level agronomy parameters.
                Use for procurement planning and buffer stock decisions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sky-500">Climate risk zones</h3>
              <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>
                Heat-stress and water-deficit indices mapped to administrative boundaries. Prioritize
                extension budgets where composite risk &gt; 0.65.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-amber-500">Disease outbreak probability</h3>
              <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>
                Spatial priors from remote sensing + field reports. Suitable for early-warning briefs
                and district coordination calls.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold">Regional insights</h2>
          <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}>
            Map-based analytics · District-wise performance index
          </p>
          <div
            className={`mt-6 overflow-hidden rounded-xl border shadow-sm ${
              dark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
            }`}
          >
            <div
              className={`flex flex-col gap-2 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${
                dark ? "border-slate-800 bg-slate-950/50" : "border-slate-100 bg-slate-50"
              }`}
            >
              <span className="text-sm font-medium">Map preview · choropleth-ready layer</span>
              <span className="font-mono text-xs text-emerald-500">EPSG:4326 · WMS stub</span>
            </div>
            <div className="relative grid h-64 grid-cols-3 gap-px bg-slate-700/30 p-4 sm:grid-cols-5">
              {districtPerf.map((x) => (
                <div
                  key={x.d}
                  className="flex flex-col justify-end rounded-lg p-3 text-center"
                  style={{
                    background: `rgba(16, 185, 129, ${0.15 + (x.score / 100) * 0.55})`,
                    minHeight: "120px",
                  }}
                >
                  <span className="text-xs font-mono text-slate-500">D{x.d}</span>
                  <span className="mt-2 text-2xl font-bold tabular-nums">{x.score}</span>
                  <span className="text-[10px] uppercase tracking-wide text-slate-500">index</span>
                </div>
              ))}
            </div>
            <p className={`px-4 py-3 text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>
              Decision note: prioritize districts below 70 for on-ground verification and input
              subsidies.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold">Reports & export</h2>
          <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}>
            Download CSV / PDF · Policy-level summaries for leadership briefings
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className={`rounded-lg border px-5 py-3 text-sm font-semibold ${
                dark
                  ? "border-slate-600 bg-slate-900 text-white hover:bg-slate-800"
                  : "border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
              }`}
            >
              Download CSV (aggregated)
            </button>
            <button
              type="button"
              className={`rounded-lg border px-5 py-3 text-sm font-semibold ${
                dark
                  ? "border-slate-600 bg-slate-900 text-white hover:bg-slate-800"
                  : "border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
              }`}
            >
              Export PDF summary
            </button>
            <button
              type="button"
              className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              Generate policy brief (one-pager)
            </button>
          </div>
          <div
            className={`mt-6 rounded-xl border p-5 text-sm leading-relaxed ${
              dark ? "border-slate-800 bg-slate-900 text-slate-300" : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            <strong className={dark ? "text-white" : "text-slate-900"}>Executive snapshot:</strong>{" "}
            Onboarding velocity supports national coverage targets; yield outlook remains within
            confidence band but downside tail widens in water-stressed corridors. Recommend aligning
            irrigation grants with climate risk tier-1 districts before monsoon onset.
          </div>
        </section>

        <p className={`pb-8 text-center text-sm ${dark ? "text-slate-500" : "text-slate-500"}`}>
          <Link to="/login" className="font-medium text-emerald-600 underline hover:text-emerald-500">
            Switch account
          </Link>
        </p>
      </main>
    </div>
  );
}
