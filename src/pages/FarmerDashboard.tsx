import { useState } from "react";
import { Link } from "react-router-dom";
import { DhartiLogo } from "../components/DhartiLogo";
import { FarmBackgroundImage } from "../components/FarmBackgroundImage";
import { useAuth } from "../context/AuthContext";

const initialTasks = [
  { id: "1", label: "Walk the north field after lunch", done: false },
  { id: "2", label: "Check water in the small tank", done: true },
  { id: "3", label: "Buy organic spray from the co-op", done: false },
];

type AlertLevel = "urgent" | "warning" | "normal";

const alerts: { level: AlertLevel; text: string }[] = [
  { level: "urgent", text: "Heavy rain expected tomorrow—cover young plants if you can." },
  { level: "warning", text: "A few leaves looked dry in last week’s photo—watch watering." },
  { level: "normal", text: "Soil moisture looks fine for this week." },
];

const cardClass =
  "rounded-lg border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm";

export default function FarmerDashboard() {
  const { logout, email } = useAuth();
  const [tasks, setTasks] = useState(initialTasks);
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState<{ from: "you" | "dharti"; text: string }[]>([
    { from: "dharti", text: "Hi! Tell me what you see on your crop, or ask a short question." },
  ]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [diseaseResult, setDiseaseResult] = useState<"none" | "shown">("none");

  function toggleTask(id: string) {
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  }

  function sendChat(e: React.FormEvent) {
    e.preventDefault();
    const t = chat.trim();
    if (!t) return;
    setMessages((m) => [...m, { from: "you", text: t }]);
    setChat("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "dharti",
          text: "Thanks. From what you said, keep the field airy and check leaves in 2 days. If spots spread, send a clear photo.",
        },
      ]);
    }, 400);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    setFileName(f?.name ?? null);
    setDiseaseResult("none");
  }

  function analyzeImage() {
    if (!fileName) return;
    setDiseaseResult("shown");
  }

  const alertStyles: Record<AlertLevel, string> = {
    urgent: "border-l-4 border-l-red-600 bg-red-50 text-red-950",
    warning: "border-l-4 border-l-amber-500 bg-amber-50 text-amber-950",
    normal: "border-l-4 border-l-emerald-600 bg-emerald-50 text-emerald-950",
  };

  const alertBadge: Record<AlertLevel, string> = {
    urgent: "Urgent",
    warning: "Warning",
    normal: "Normal",
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-slate-900">
      <FarmBackgroundImage position="fixed" overlayClassName="bg-emerald-950/82" />

      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 lg:max-w-5xl">
          <Link to="/" className="rounded-md outline-none ring-emerald-600/30 focus-visible:ring-2">
            <DhartiLogo variant="onLight" showTagline={false} />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[220px] truncate text-xs text-slate-600 sm:inline">
              {email}
            </span>
            <button
              type="button"
              onClick={() => logout()}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl space-y-8 px-4 py-10 lg:max-w-5xl lg:space-y-10 lg:py-12">
        <section aria-labelledby="tasks-heading">
          <h2 id="tasks-heading" className="text-sm font-semibold uppercase tracking-wide text-white">
            Today’s tasks
          </h2>
          <ul className="mt-4 space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className={`flex items-start gap-3 ${cardClass} p-4`}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                  aria-label={task.label}
                />
                <span
                  className={`text-sm leading-relaxed ${
                    task.done ? "text-slate-400 line-through" : "text-slate-900"
                  }`}
                >
                  {task.label}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="chat-heading" className={`${cardClass} p-6 lg:p-8`}>
          <h2 id="chat-heading" className="text-lg font-semibold text-slate-900">
            Ask DHARTI
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Describe what you see. Responses are written in plain language.
          </p>
          <div className="mt-4 max-h-52 space-y-2 overflow-y-auto rounded-md border border-slate-200 bg-slate-50 p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`rounded-md px-3 py-2 text-sm ${
                  m.from === "you"
                    ? "ml-6 bg-emerald-700 text-white"
                    : "mr-6 border border-slate-200 bg-white text-slate-800"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <form onSubmit={sendChat} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={chat}
              onChange={(e) => setChat(e.target.value)}
              className="min-h-10 flex-1 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              placeholder="Example: brown spots on wheat leaves"
            />
            <button
              type="submit"
              className="rounded-md bg-emerald-700 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              Send
            </button>
          </form>
        </section>

        <section aria-labelledby="alerts-heading">
          <h2 id="alerts-heading" className="text-sm font-semibold uppercase tracking-wide text-white">
            Alerts
          </h2>
          <div className="mt-4 space-y-2">
            {alerts.map((a, i) => (
              <div
                key={i}
                className={`rounded-md border border-slate-200/80 p-4 text-sm ${alertStyles[a.level]}`}
              >
                <span className="text-xs font-semibold uppercase tracking-wide opacity-90">
                  {alertBadge[a.level]}
                </span>
                <p className="mt-2 font-medium leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="disease-heading" className={`${cardClass} p-6 lg:p-8`}>
          <h2 id="disease-heading" className="text-lg font-semibold text-slate-900">
            Disease check
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Upload a clear image of the affected area. Guidance is summarized below the photo.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-stretch">
            <label className="flex min-h-[140px] flex-1 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm font-medium text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50/50">
              <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
              <span className="text-slate-900">Choose image</span>
              <span className="mt-1 text-xs font-normal text-slate-500">PNG or JPG</span>
            </label>
            <div className="flex flex-1 flex-col justify-center sm:pl-2">
              {fileName ? (
                <p className="text-sm text-slate-800">
                  <span className="text-slate-500">Selected:</span>{" "}
                  <span className="font-medium">{fileName}</span>
                </p>
              ) : (
                <p className="text-sm text-slate-500">No file selected.</p>
              )}
              <button
                type="button"
                onClick={analyzeImage}
                disabled={!fileName}
                className="mt-4 w-full rounded-md bg-emerald-700 py-2.5 text-sm font-semibold text-white shadow-sm transition enabled:hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:min-w-[160px]"
              >
                Analyze image
              </button>
            </div>
          </div>
          {diseaseResult === "shown" && (
            <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Your crop may have a disease</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-800">
                The pattern looks like leaf rust—common when nights are damp.
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-900">Recommended action within 2 days</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                Use the fungicide your supplier recommends for rust on your crop type. Apply when wind
                is low and use appropriate protective equipment.
              </p>
            </div>
          )}
        </section>

        <p className="pb-8 text-center text-xs text-slate-300">
          Need a different role?{" "}
          <Link to="/login" className="font-semibold text-emerald-300 underline-offset-2 hover:text-white hover:underline">
            Switch account
          </Link>
        </p>
      </main>
    </div>
  );
}
