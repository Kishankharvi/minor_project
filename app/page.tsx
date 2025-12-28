import Link from "next/link"
import { Code2, Users, Terminal, GraduationCap, ChevronRight } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e2e8f0] font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">CodeRoom</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#mentoring" className="hover:text-white transition-colors">
              Mentoring
            </a>
            <a href="#execution" className="hover:text-white transition-colors">
              Execution
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="http://localhost:5173"
              className="text-sm font-semibold text-white px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-full transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95"
            >
              Enter Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.1),transparent)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Now with 1:1 Mentoring
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Code Together. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Mentor Better.
              </span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
              The professional collaborative IDE for engineering teams and mentors. Real-time synchronization,
              integrated terminal, and advanced mentoring tools in one seamless workspace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="http://localhost:5173"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all active:scale-95 group"
              >
                Get Started for Free
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-[#0a0a0b]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6 text-blue-400" />,
                title: "Real-time Sync",
                desc: "Sub-millisecond latency code updates with collaborative cursor tracking.",
              },
              {
                icon: <GraduationCap className="w-6 h-6 text-purple-400" />,
                title: "Mentoring Tools",
                desc: "Privileged mentor controls, structured feedback, and access management.",
              },
              {
                icon: <Terminal className="w-6 h-6 text-emerald-400" />,
                title: "Cloud Execution",
                desc: "Run code in 10+ languages with full terminal input/output support.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 bg-white/[0.02] border border-white/10 rounded-3xl hover:border-blue-500/50 hover:bg-white/[0.04] transition-all"
              >
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl font-bold text-white">Ready to elevate your code sessions?</h2>
          <div className="flex justify-center gap-4">
            <Link
              href="http://localhost:5173"
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all"
            >
              Start Coding Now
            </Link>
          </div>
          <p className="text-slate-500 text-sm italic">Developed with professional engineering teams in mind.</p>
        </div>
      </footer>
    </div>
  )
}
