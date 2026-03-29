import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import { DhartiLogo } from "../components/DhartiLogo";
import { useAuth } from "../context/AuthContext";

const healthSeries = [
  { week: "W1", ndvi: 0.62, stress: 12 },
  { week: "W2", ndvi: 0.64, stress: 11 },
  { week: "W3", ndvi: 0.61, stress: 14 },
  { week: "W4", ndvi: 0.58, stress: 18 },
  { week: "W5", ndvi: 0.59, stress: 17 },
  { week: "W6", ndvi: 0.57, stress: 19 },
];

const climateRain = [
  { m: "Jan", mm: 18 },
  { m: "Feb", mm: 22 },
  { m: "Mar", mm: 35 },
  { m: "Apr", mm: 48 },
  { m: "May", mm: 62 },
  { m: "Jun", mm: 88 },
];

const climateTemp = [
  { m: "Jan", c: 18 },
  { m: "Feb", c: 20 },
  { m: "Mar", c: 24 },
  { m: "Apr", c: 28 },
  { m: "May", c: 31 },
  { m: "Jun", c: 32 },
];

const reports = [
  { farmer: "ID-10432", crop: "Wheat", region: "North", status: "Flagged", severity: "High" },
  { farmer: "ID-09112", crop: "Rice", region: "East", status: "Reviewed", severity: "Medium" },
  { farmer: "ID-12001", crop: "Cotton", region: "West", status: "Open", severity: "Low" },
  { farmer: "ID-07765", crop: "Soy", region: "North", status: "Escalated", severity: "High" },
];

function HeatmapGrid() {
  const cells = useMemo(() => {
    const rows = 6;
    const cols = 10;
    const out: { v: number; key: string }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v = 0.15 + ((r + c) % 5) * 0.12 + (r * c) % 7 * 0.02;
        out.push({ v: Math.min(1, v), key: `${r}-${c}` });
      }
    }
    return out;
  }, []);

  return (
    <div className="grid grid-cols-10 gap-1 rounded-lg bg-slate-900 p-2">
      {cells.map((cell) => (
        <div
          key={cell.key}
          className="aspect-square rounded-sm"
          style={{
            backgroundColor: `rgba(34, 197, 94, ${0.2 + cell.v * 0.75})`,
            border: "1px solid rgba(15,23,42,0.6)",
          }}
          title={`Outbreak index: ${(cell.v * 100).toFixed(0)}%`}
        />
      ))}
    </div>
  );
}

const nav = [
  { id: "overview", label: "Overview" },
  { id: "health", label: "Crop health analytics" },
  { id: "disease", label: "Disease spread" },
  { id: "climate", label: "Climate data" },
  { id: "reports", label: "Farmer reports" },
];

export default function AnalystDashboard() {
  const { logout, email } = useAuth();
  const [region, setRegion] = useState("All regions");
  const [crop, setCrop] = useState("All crops");
  const [range, setRange] = useState("Last 90 days");
  const [section, setSection] = useState("overview");

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-200 lg:flex">
        <div className="border-b border-slate-800 px-4 py-5">
          <DhartiLogo variant="onDark" showTagline={false} />
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-500">
            Analyst console
          </p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSection(item.id)}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                section === item.id
                  ? "bg-emerald-600/20 text-emerald-300 ring-1 ring-emerald-500/40"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-slate-800 p-3">
          <button
            type="button"
            onClick={() => logout()}
            className="w-full rounded-lg border border-slate-700 py-2 text-sm text-slate-300 hover:bg-slate-900"
          >
            Log out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div className="flex items-start gap-3">
              <div className="lg:hidden">
                <DhartiLogo variant="onLight" showTagline={false} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Analyst workspace</h1>
                <p className="text-sm text-slate-600">
                  Predictive analytics · Satellite imagery · AI inference pipeline
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="hidden text-xs text-slate-500 sm:inline">{email}</span>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium"
              >
                <option>All regions</option>
                <option>North</option>
                <option>East</option>
                <option>West</option>
                <option>South</option>
              </select>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium"
              >
                <option>All crops</option>
                <option>Wheat</option>
                <option>Rice</option>
                <option>Cotton</option>
              </select>
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium"
              >
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Year to date</option>
              </select>
            </div>
          </div>
          <div className="border-t border-slate-100 px-4 pb-3 lg:hidden">
            <label className="sr-only" htmlFor="analyst-section">
              Section
            </label>
            <select
              id="analyst-section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium"
            >
              {nav.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </header>

        <main className="flex-1 space-y-8 px-4 py-6 lg:px-8">
          {(section === "overview" || section === "health") && (
            <section>
              <h2 className="text-lg font-bold text-slate-900">Crop health analytics</h2>
              <p className="text-sm text-slate-600">
                NDVI / vegetation index time series · Data modeling on aggregated tiles (
                {region}, {crop}, {range})
              </p>
              <div className="mt-4 grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800">NDVI trend</h3>
                  <p className="text-xs text-slate-500">Normalized Difference Vegetation Index</p>
                  <div className="mt-4 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={healthSeries}>
                        <defs>
                          <linearGradient id="ndvi" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                        <YAxis domain={[0.5, 0.7]} tick={{ fontSize: 11 }} />
                        <Tooltip
                          contentStyle={{ fontSize: 12 }}
                          formatter={(v: number) => [v.toFixed(2), "NDVI"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="ndvi"
                          stroke="#059669"
                          fillOpacity={1}
                          fill="url(#ndvi)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800">Crop stress index</h3>
                  <p className="text-xs text-slate-500">Derived from multispectral stack</p>
                  <div className="mt-4 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={healthSeries}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="stress"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </section>
          )}

          {(section === "overview" || section === "disease") && (
            <section>
              <h2 className="text-lg font-bold text-slate-900">Disease spread monitoring</h2>
              <p className="text-sm text-slate-600">
                Heatmap · Region-wise outbreak tracking · Spatial clustering
              </p>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-900 p-4 shadow-sm">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-emerald-400">Raster overlay · 500m grid</span>
                  <span className="text-xs text-slate-400">Legend: low → high incidence</span>
                </div>
                <HeatmapGrid />
              </div>
            </section>
          )}

          {(section === "overview" || section === "climate") && (
            <section>
              <h2 className="text-lg font-bold text-slate-900">Climate data integration</h2>
              <p className="text-sm text-slate-600">Rainfall patterns · Temperature trends</p>
              <div className="mt-4 grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-semibold">Rainfall (mm)</h3>
                  <div className="mt-4 h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={climateRain}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="m" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Bar dataKey="mm" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-semibold">Temperature (°C)</h3>
                  <div className="mt-4 h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={climateTemp}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="m" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="c" stroke="#ef4444" strokeWidth={2} dot />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </section>
          )}

          {(section === "overview" || section === "reports") && (
            <section className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="text-lg font-bold text-slate-900">Farmer reports</h2>
                <p className="text-sm text-slate-600">Operational triage · Severity scoring</p>
                <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-4 py-3">Farmer</th>
                        <th className="px-4 py-3">Crop</th>
                        <th className="px-4 py-3">Region</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Severity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {reports.map((r) => (
                        <tr key={r.farmer} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-mono text-xs">{r.farmer}</td>
                          <td className="px-4 py-3">{r.crop}</td>
                          <td className="px-4 py-3">{r.region}</td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium">
                              {r.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={
                                r.severity === "High"
                                  ? "text-red-600"
                                  : r.severity === "Medium"
                                    ? "text-amber-600"
                                    : "text-emerald-600"
                              }
                            >
                              {r.severity}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Insights panel</h2>
                <p className="text-sm text-slate-600">AI-generated summaries · Model confidence</p>
                <ul className="mt-4 space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-slate-800">
                  <li className="rounded-lg bg-white/80 p-3 shadow-sm">
                    <strong className="text-emerald-900">High probability</strong> of pest outbreak in{" "}
                    <span className="font-mono">Region North</span> within 10–14 days (ensemble score
                    0.81).
                  </li>
                  <li className="rounded-lg bg-white/80 p-3 shadow-sm">
                    <strong className="text-emerald-900">Crop stress</strong> increasing by{" "}
                    <span className="font-mono">18%</span> vs prior window—aligns with NDVI downtick.
                  </li>
                  <li className="rounded-lg bg-white/80 p-3 shadow-sm">
                    Recommend <strong>satellite revisit</strong> cadence ↑ for tiles T12–T18 (data
                    modeling gap detected).
                  </li>
                </ul>
              </div>
            </section>
          )}

          <p className="text-center text-xs text-slate-500">
            <Link to="/login" className="font-medium text-emerald-700 underline">
              Switch account
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}
