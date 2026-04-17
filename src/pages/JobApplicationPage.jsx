import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsData } from '../data/jobs';

export default function JobApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobsData.find(j => j.id === parseInt(id)) || jobsData[0];

  const [showModal, setShowModal] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [saved, setSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) setCvFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cvFile) return;
    setShowModal(false);
    setSubmitted(true);
    setCvFile(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setCvFile(null);
  };

  return (
    <div className="bg-gray-50 antialiased font-sans">
      <div className="max-w-7xl mx-auto py-10 px-4">

        <button onClick={() => navigate('/jobs')}
          className="inline-flex items-center text-blue-800 font-semibold mb-6 hover:text-indigo-700 transition">
          <i className="fa-solid fa-arrow-left mr-2"></i> Back to Jobs
        </button>

        {submitted && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-xl px-6 py-4 font-semibold">
            ✅ Your application has been submitted successfully!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">

            {/* Job Info */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 overflow-hidden shrink-0">
                    <img src={job.logo} alt={job.company} className="w-16 h-16 rounded-md object-contain" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 leading-tight">{job.title}</h1>
                    <p className="text-blue-800 font-bold text-lg">{job.company}</p>
                  </div>
                </div>
                <span className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold">{job.jobType}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-sack-dollar text-blue-800"></i>
                  <div>
                    <p className="text-xs text-gray-400">Salary</p>
                    <p className="text-sm font-bold text-blue-800">${job.salary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-location-dot text-blue-800"></i>
                  <div>
                    <p className="text-xs text-gray-400">Location</p>
                    <p className="text-sm font-bold text-blue-800">{job.location} ({job.type})</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-briefcase text-blue-800"></i>
                  <div>
                    <p className="text-xs text-gray-400">Experience</p>
                    <p className="text-sm font-bold text-blue-800">{job.experience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-calendar text-blue-800"></i>
                  <div>
                    <p className="text-xs text-gray-400">Posted</p>
                    <p className="text-sm font-bold text-blue-800">{job.date}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-indigo-950 mb-4">Job Description</h3>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>{job.description}</p>
                <h4 className="font-bold text-indigo-950 pt-2">Key Responsibilities:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            </div>

          </div>

          {/* Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-blue-800 rounded-[2rem] p-8 text-white sticky top-10 shadow-xl shadow-indigo-100">
              <h3 className="text-xl font-bold mb-6">Ready to apply?</h3>
              <p className="text-white text-sm mb-8 leading-relaxed">
                Submit your application. Make sure your profile is updated!
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => !submitted && setShowModal(true)}
                  disabled={submitted}
                  className={`w-full font-bold py-3 rounded-lg transition-all ${submitted ? 'bg-green-400 text-white cursor-default' : 'bg-white text-blue-800 hover:bg-gray-100'}`}>
                  {submitted ? '✅ Applied!' : 'Apply Now'}
                </button>
                <button
                  onClick={() => setSaved(!saved)}
                  className={`w-full border font-bold py-4 rounded-2xl transition ${saved ? 'bg-white text-green-700 border-green-200' : 'bg-white text-blue-800 border-blue-800 hover:bg-gray-200'}`}>
                  <i className={`fa-${saved ? 'solid' : 'regular'} fa-bookmark mr-2`}></i>
                  {saved ? 'Saved ✓' : 'Save for Later'}
                </button>
              </div>
              <div className="mt-10 pt-8 border-t border-indigo-900">
                <h4 className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-4">About {job.company}</h4>
                <div className="flex items-center gap-3">
                  <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg bg-white p-1" />
                  <div>
                    <p className="text-sm font-bold">{job.company} Inc.</p>
                    <a href="#" className="text-xs text-indigo-400 hover:underline">View Company Profile</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Apply Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-gray-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          dir="ltr">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-indigo-600 p-5 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold">Submit Your Application</h3>
              <button onClick={closeModal} className="text-white hover:text-gray-200 p-1 rounded-full hover:bg-indigo-700 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-3 uppercase tracking-wider">Required: Upload CV (PDF)</label>
                <label htmlFor="file-upload"
                  className="relative group mt-1 flex flex-col items-center justify-center px-6 pt-6 pb-7 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all">
                  {!cvFile ? (
                    <div className="text-center space-y-2">
                      <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-indigo-500 transition-colors"
                        stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-sm font-medium text-indigo-600">Click or drag to upload</p>
                      <p className="text-xs text-gray-500">PDF file only (Max 10MB)</p>
                    </div>
                  ) : (
                    <div className="text-center space-y-2 w-full p-2 bg-indigo-50 rounded-lg border border-indigo-200">
                      <i className="fa-solid fa-file-pdf text-4xl text-indigo-600"></i>
                      <p className="text-sm font-bold text-gray-900 break-words">{cvFile.name}</p>
                      <p className="text-xs text-gray-600">{(cvFile.size / 1024).toFixed(1)} KB</p>
                      <span className="text-xs text-indigo-700 font-semibold">(Click again to change)</span>
                    </div>
                  )}
                  <input id="file-upload" type="file" accept=".pdf" className="sr-only" onChange={handleFileChange} />
                </label>
              </div>
              <button type="submit" disabled={!cvFile}
                className={`w-full font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg ${cvFile ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                Confirm & Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
