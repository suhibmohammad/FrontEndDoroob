import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="z-50 flex items-center justify-between py-4 px-6 md:px-16 lg:px-24 xl:px-32 bg-white text-blue-800 fixed top-0 w-full shadow-sm">
        <Link to="/">
          <img src="/5.png" alt="Doroop Logo" className="w-20" />
        </Link>

        <div className="hidden md:flex items-center gap-8 transition duration-500 text-blue-800">
          <Link to="/home" className="flex flex-col justify-center items-center gap-1 text-lg">
            <i className="fa-solid fa-house text-blue-800"></i>
            <p className="text-indigo-950">Home</p>
          </Link>
          <Link to="/jobs" className="flex flex-col justify-center items-center gap-1 text-lg">
            <i className="fa-solid fa-briefcase text-blue-800"></i>
            <p className="text-indigo-950">Jobs</p>
          </Link>
          <Link to="/applications" className="flex flex-col justify-center items-center gap-1 text-lg">
            <i className="fa-solid fa-user-tie text-blue-800"></i>
            <p className="text-indigo-950">Applications</p>
          </Link>
          <Link to="/saved" className="flex flex-col justify-center items-center gap-1 text-lg">
            <i className="fa-solid fa-bookmark text-blue-800"></i>
            <p className="text-indigo-950">Saved Jobs</p>
          </Link>
        </div>

        <div className="hidden md:block space-x-3">
          <Link to="/signup" className="px-3 lg:px-6 py-2 bg-blue-800 hover:bg-blue-700 transition text-white rounded-md">
            Get Started
          </Link>
          <Link to="/login" className="hover:bg-slate-100 transition px-3 lg:px-6 py-2 border border-blue-800 rounded-md">
            Login
          </Link>
        </div>

        <button onClick={() => setMobileOpen(true)} className="md:hidden active:scale-90 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[100] bg-white/60 text-blue-800 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Link to="/home" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link to="/jobs" onClick={() => setMobileOpen(false)}>Jobs</Link>
        <Link to="/applications" onClick={() => setMobileOpen(false)}>My Application</Link>
        <Link to="/saved" onClick={() => setMobileOpen(false)}>Saved</Link>
        <Link to="/create-company" onClick={() => setMobileOpen(false)}>Create Company</Link>
        <button onClick={() => setMobileOpen(false)}
          className="active:ring-2 active:ring-white aspect-square size-10 p-1 items-center justify-center hover:bg-slate-200 transition text-black rounded-md flex">
          <i className="fa-solid fa-x text-blue-800"></i>
        </button>
      </div>
    </>
  );
}
