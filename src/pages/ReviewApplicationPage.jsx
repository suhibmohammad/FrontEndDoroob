import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { applicationsData } from '../data/jobs';

const statusConfig = {
  Pending: { dot: 'bg-yellow-500', text: 'text-yellow-500', label: 'Under Review', pulse: true },
  Accepted: { dot: 'bg-green-500', text: 'text-green-500', label: 'Accepted', pulse: false },
  Rejected: { dot: 'bg-red-500', text: 'text-red-500', label: 'Rejected', pulse: false },
};

export default function ReviewApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const app = applicationsData.find(a => a.appId === id) || applicationsData[0];
  const [withdrawn, setWithdrawn] = useState(false);

  const status = statusConfig[app.status] || statusConfig.Pending;

  return (
    <div className="bg-gray-50 antialiased font-sans">
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen font-sans" dir="ltr">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/applications')}
            className="flex items-center text-blue-800 font-bold hover:text-indigo-700 transition-all">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to My Applications
          </button>
        </div>

        {withdrawn && (
          <div className="mb-6 bg-orange-50 border border-orange-200 text-orange-800 rounded-xl px-6 py-4 font-semibold">
            ⚠️ Your application has been withdrawn.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">

            {/* Job Info */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 overflow-hidden shrink-0">
                    <img src={app.logo} alt={app.company} className="w-16 h-16 rounded-md object-contain" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 leading-tight">{app.title}</h1>
                    <p className="text-indigo-600 font-bold text-lg">{app.company}</p>
                  </div>
                </div>
                <span className="bg-indigo-50 text-blue-800 px-4 py-2 rounded-full text-sm font-bold">{app.jobType}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-sack-dollar text-blue-800"></i>
                  <div>
                    <p className="text-xs text-gray-400">Salary</p>
                    <p className="text-sm font-bold text-blue-800">${app.salary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-location-dot text-blue-800"></i>
                  <div>
                    <p className="text-xs text-gray-400">Location</p>
                    <p className="text-sm font-bold text-blue-800">{app.location} ({app.type})</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-briefcase text-blue-800"></i>
                  <div>
                    <p className="text-xs text-gray-400">Experience</p>
                    <p className="text-sm font-bold text-blue-800">{app.experience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-calendar text-blue-800"></i>
                  <div>
                    <p className="text-xs text-gray-400">Posted</p>
                    <p className="text-sm font-bold text-blue-800">{app.date}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Job Description</h3>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>{app.description}</p>
                <h4 className="font-bold text-blue-800 pt-2">Key Responsibilities:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {app.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* Right */}
          <aside className="sticky top-24 h-fit space-y-6">

            {/* Application Status */}
            <div className="bg-blue-800 text-white p-6 rounded-2xl shadow-xl border border-indigo-800 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-800 rounded-full opacity-20"></div>
              <h3 className="text-md font-black mb-6 text-white uppercase tracking-[0.2em] relative z-10">Application Details</h3>
              <div className="space-y-5 relative z-10">
                <div className="flex flex-col space-y-1">
                  <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-wider">Submission Date</span>
                  <div className="flex items-center text-sm font-bold">
                    <span>{app.submittedDate}</span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 pt-4 border-t border-indigo-900">
                  <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-wider">Current Status</span>
                  <div className="flex items-center">
                    <div className={`w-2.5 h-2.5 rounded-full ${status.dot} mr-3 ${status.pulse ? 'animate-pulse' : ''}`}></div>
                    <span className={`text-sm font-black ${status.text} uppercase tracking-wide`}>{status.label}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Download CV */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="space-y-3">
                <button className="w-full py-3 bg-indigo-50 text-blue-800 rounded-xl font-bold text-xs hover:bg-indigo-100 transition-all">
                  Download Submitted CV
                </button>
              </div>
            </div>

            {/* Withdraw */}
            {!withdrawn && app.status === 'Pending' && (
              <div className="p-6 my-10 bg-red-50 border border-red-100 rounded-2xl">
                <h4 className="text-red-800 font-black text-sm mb-2">Need to cancel?</h4>
                <p className="text-red-600 text-xs mb-4 leading-relaxed">
                  Slightly reconsidering? You can withdraw your application before it enters the interview stage.
                </p>
                <button
                  onClick={() => setWithdrawn(true)}
                  className="w-full py-3 bg-white border border-red-200 text-red-600 rounded-xl font-black text-sm hover:bg-red-600 hover:text-white transition-all shadow-sm">
                  Withdraw Application
                </button>
              </div>
            )}

          </aside>
        </div>
      </div>
    </div>
  );
}
