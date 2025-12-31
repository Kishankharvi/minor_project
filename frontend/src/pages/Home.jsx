"use client"
// import {coderoomlogo} from "../assets"
// import {editot} from "../assets"
import { Link } from "react-router-dom"
import coderoomlogo from "../assets/coderoomlogo.png"
import editot from "../assets/editot.png"
export default function Home() {
  return (
    <div className="bg-[#0a0a0b] min-h-screen text-white relative overflow-hidden">

      {/* HEADER */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-12">
          
          {/* LOGO LEFT */}
          <div className="flex items-center gap-2">
            <img 
              src={coderoomlogo}
              alt="CodeRoom" 
              className="h-10 w-auto" 
            />
            <span className="text-xl font-bold tracking-wide">CodeRoom</span>
          </div>

          {/* Nav Desktop */}
          <div className="hidden lg:flex gap-x-10 text-gray-300 font-semibold">
            <Link to="/" className="hover:text-indigo-400">Home</Link>
            <Link to="/dashboard" className="hover:text-indigo-400">Dashboard</Link>
            <Link to="/join-room" className="hover:text-indigo-400">Join Room</Link>
          </div>

          {/* Login Button */}
          <div className="hidden lg:flex">
            <Link 
              to="/" 
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold">
              Login →
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            command="show-modal"
            commandfor="mobile-menu"
            className="lg:hidden p-2.5 rounded-lg text-gray-200 bg-white/5 hover:bg-white/10"
          >
            ☰
          </button>
        </nav>

        {/* Mobile Menu Dialog */}
        <el-dialog>
          <dialog id="mobile-menu" className="backdrop:bg-black/60 lg:hidden">
            <div tabIndex={0} className="fixed inset-0 flex justify-end">

              <el-dialog-panel className="bg-[#101113] w-72 p-6 h-full shadow-xl border-l border-white/5">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-xl">Menu</span>
                  <button command="close" commandfor="mobile-menu" className="text-gray-300 text-xl">✕</button>
                </div>

                <nav className="flex flex-col gap-5 text-gray-300 text-lg font-medium">
                  <Link to="/" command="close" commandfor="mobile-menu" className="hover:text-indigo-400">Home</Link>
                  <Link to="/dashboard" command="close" commandfor="mobile-menu" className="hover:text-indigo-400">Dashboard</Link>
                  <Link to="/join-room" command="close" commandfor="mobile-menu" className="hover:text-indigo-400">Join Room</Link>

                  <Link 
                    to="/" 
                    command="close"
                    commandfor="mobile-menu"
                    className="mt-4 px-4 py-2 text-center bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-500">
                    Login
                  </Link>
                </nav>
              </el-dialog-panel>

            </div>
          </dialog>
        </el-dialog>

      </header>

      {/* HERO SECTION */}
      <section className="pt-36 text-center px-6 sm:px-10">
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
          Real-Time Collaborative Coding Rooms
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">
          Create coding rooms, pair program, collaborate live, chat and build together in a shared code workspace.  
          Perfect for hackathons, teaching, interviews & real dev workflow.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link 
            to="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-semibold shadow-md">
            Go to Dashboard
          </Link>

          <Link 
            to="/join-room"
            className="font-semibold px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10">
            Join Room →
          </Link>
        </div>
      </section>

      {/* EDITOR IMAGE PREVIEW */}
      <div className="mt-24 flex justify-center pb-20">
        <img 
          src={editot}
          alt="Code Editor Screenshot" 
          className="rounded-xl w-[80%] max-w-4xl shadow-2xl border border-white/10"
        />
      </div>

    </div>
  )
}
