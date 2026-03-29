import { Link } from "react-router-dom";
import { DhartiLogo } from "../components/DhartiLogo";
import { FarmBackgroundImage } from "../components/FarmBackgroundImage";

function IconLeaf() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21c-4.5-3.5-8-7-8-12a8 8 0 0116 0c0 5-3.5 8.5-8 12z"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      />
    </svg>
  );
}

function IconCloud() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15a4.5 4.5 0 004.5 4.5h.75a6 6 0 0011.318-3.318A4.5 4.5 0 0018.75 9h-.75a4.5 4.5 0 00-4.5-4.5H9a4.5 4.5 0 00-4.5 4.5v.75z"
      />
    </svg>
  );
}

const features = [
  {
    title: "Crop health check",
    text: "Clear, plain-language guidance on how your crop looks and what to watch next.",
    icon: IconLeaf,
  },
  {
    title: "Pest and disease support",
    text: "Structured steps you can act on—timing, safety, and when to escalate.",
    icon: IconShield,
  },
  {
    title: "Weather awareness",
    text: "Rain and temperature context summarized for field decisions, not raw charts.",
    icon: IconCloud,
  },
];

const steps = [
  {
    n: "01",
    title: "Share a photo or describe the issue",
    desc: "From your phone or desktop—whatever is easiest in the field.",
  },
  {
    n: "02",
    title: "DHARTI reviews your input",
    desc: "Your case is organized into a short checklist of observations and actions.",
  },
  {
    n: "03",
    title: "Receive a concise action plan",
    desc: "Spray, irrigation, or agronomy steps—written to be followed the same day.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative min-h-[88vh] overflow-hidden">
        <FarmBackgroundImage
          position="absolute"
          overlayClassName="bg-emerald-900/75"
        />

        <header className="relative z-20 border-b border-white/10 bg-white/10 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link to="/" className="rounded-md outline-none ring-white/40 focus-visible:ring-2">
              <DhartiLogo variant="onDark" showTagline={false} />
            </Link>
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50"
              >
                Sign in
              </Link>
            </div>
          </div>
        </header>

        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-24 pt-12 text-center sm:px-6 sm:pt-16 lg:px-8">
          <div className="flex justify-center">
            <DhartiLogo variant="onDark" className="scale-[1.15] sm:scale-125" textClassName="text-3xl sm:text-4xl" />
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-emerald-50/95 sm:text-xl">
            Helping farmers take better decisions. Know your crop, protect your harvest.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/login"
              className="inline-flex min-h-11 min-w-[160px] items-center justify-center rounded-md bg-emerald-600 px-8 text-sm font-semibold text-white shadow-sm ring-1 ring-emerald-500/30 transition hover:bg-emerald-700"
            >
              Get started
            </Link>
            <a
              href="#capabilities"
              className="inline-flex min-h-11 min-w-[160px] items-center justify-center rounded-md border border-white/40 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              View capabilities
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      <main id="capabilities">
        <section className="border-b border-slate-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Operational support for the field
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                Built for clarity and speed—aligned with how growers and advisors actually work.
              </p>
            </div>
            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {features.map((f) => (
                <article
                  key={f.title}
                  className="flex flex-col rounded-lg border border-slate-200 bg-slate-50/50 p-8 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 text-emerald-800">
                    <f.icon />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{f.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{f.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="scroll-mt-20 bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              A straightforward flow from observation to response.
            </p>
            <ol className="mt-12 space-y-0 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white shadow-sm">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-6 px-6 py-8 sm:gap-10 sm:px-8">
                  <span className="font-mono text-sm font-semibold text-emerald-700">{s.n}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-2 text-slate-600">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <footer className="border-t border-slate-800 bg-slate-900 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl justify-center">
            <DhartiLogo variant="onDark" />
          </div>
        </footer>
      </main>
    </div>
  );
}
