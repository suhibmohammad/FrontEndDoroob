import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { getCompanyById } from '../Api/companyService';
import { getJobsByCompany, createJob } from '../Api/jobService';
import CompanySidebar from '../components/CompanySidebar';

export default function CompanyDashboard() {
  const { id } = useParams(); // استلام الـ id من الـ Route الديناميكي :id
  const navigate = useNavigate(); 
  
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); 

  const [jobData, setJobData] = useState({ 
    title: '', 
    description: '', 
    salary: 0, 
    location: '', 
    typeJop: 'FullTime', // مطابقة لـ Swagger الباكند
    experieceLevel: 'Senior', // مطابقة لـ Swagger الباكند
    skills: '' 
  });

  // --- دالة جلب البيانات ---
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      if (!id) return; // حماية في حال كان الـ id غير معرف

      const [companyRes, jobsData] = await Promise.all([
        getCompanyById(id),
        getJobsByCompany(id, page, pageSize)
      ]);

      setCompany(companyRes);
      // معالجة شكل البيانات المستلمة لضمان عمل الـ Map
      const jobsList = jobsData?.data || jobsData?.items || (Array.isArray(jobsData) ? jobsData : []);
      setJobs(jobsList);
    } catch (err) { 
      console.error("Dashboard Load Error:", err); 
    } finally { 
      setLoading(false); // إيقاف التحميل دائماً لضمان عدم تعليق الشاشة
    }
  }, [id, page, pageSize]);

  useEffect(() => { if (id) fetchData(); }, [fetchData]);

  // --- إنشاء وظيفة جديدة ---
  const handleCreateJob = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title: String(jobData.title),
      description: String(jobData.description),
      salary: Number(jobData.salary),
      location: String(jobData.location),
      typeJop: String(jobData.typeJop),
      experieceLevel: String(jobData.experieceLevel), 
      companyId: Number(id),
      skills: jobData.skills.split(',').map(s => s.trim()).filter(s => s !== "")
    };

    try {
      const response = await createJob(payload);
      if (response) {
        // تحديث القائمة فوراً بعد الإضافة
        const newJob = response.data || response;
        setJobs(prev => [newJob, ...prev]);
        setIsModalOpen(false);
        setJobData({ 
            title: '', description: '', salary: 0, location: '', 
            typeJop: 'FullTime', experieceLevel: 'Senior', skills: '' 
        });
        alert("تم نشر الوظيفة بنجاح!");
      }
    } catch (err) {
      console.error("Creation Error:", err);
      alert("فشل في إنشاء الوظيفة، تأكد من البيانات.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- واجهة التحميل ---
  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50 font-black text-indigo-600 animate-pulse uppercase tracking-widest text-xs">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      Loading Your Dashboard...
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <CompanySidebar companyId={id} companyLogo={company?.logoUrl} companyName={company?.name} />

      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-6xl mx-auto">
          
          <header className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">
                Company <span className="text-indigo-600">Hub</span>
              </h1>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest italic">{company?.name} Management Console</p>
            </div>
            
            <div className="flex gap-3">
              {/* زر الانتقال لصفحة إدارة الوظائف (تعديل وحذف) */}
              <button 
                onClick={() => navigate(`/company-jobs/${id}`)} 
                className="bg-indigo-50 text-indigo-600 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-indigo-600 hover:text-white shadow-sm"
              >
                Manage All Jobs
              </button>

              <button 
                onClick={() => navigate('/profile')} 
                className="bg-white border border-slate-200 text-slate-600 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-slate-50 shadow-sm"
              >
                ← User View
              </button>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-slate-900 hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95"
              >
                + Post New Job
              </button>
            </div>
          </header>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Current Listings ({jobs.length})</h2>
                <div className="flex gap-2">
                    <button 
                        disabled={page === 1}
                        onClick={() => setPage(prev => prev - 1)}
                        className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[9px] font-black uppercase disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm"
                    >Prev</button>
                    <button 
                        onClick={() => setPage(prev => prev + 1)}
                        className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[9px] font-black uppercase hover:bg-slate-50 transition-all shadow-sm"
                    >Next</button>
                </div>
            </div>

            <div className="grid gap-4">
              {jobs.length > 0 ? (
                jobs.map(job => (
                    <motion.div 
                     key={job.id}
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center justify-between group hover:border-indigo-500 transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-slate-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black italic uppercase text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            {job.title?.substring(0,2).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                            <div className="flex gap-3 mt-1">
                                <span className="text-[8px] font-black text-slate-400 uppercase">{job.typeJop}</span>
                                <span className="text-[8px] font-black text-indigo-500 uppercase underline">{job.location}</span>
                            </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-slate-900 tracking-tighter">${job.salary}</p>
                        <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">{job.experieceLevel}</p>
                      </div>
                    </motion.div>
                ))
              ) : (
                <div className="py-24 text-center bg-white rounded-[4rem] border-2 border-dashed border-slate-100">
                  <p className="text-slate-300 font-black uppercase tracking-widest text-[10px] italic">No active vacancies posted yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* نافذة إضافة وظيفة جديدة */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="bg-white rounded-[3.5rem] w-full max-w-xl p-10 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-2xl font-black uppercase italic mb-8 italic">Post New <span className="text-indigo-600">Opportunity</span></h2>
              <form onSubmit={handleCreateJob} className="space-y-4">
                <input required placeholder="Job Title" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-indigo-500 font-bold text-sm" 
                  value={jobData.title} onChange={e => setJobData({...jobData, title: e.target.value})} />
                
                <textarea required placeholder="Job Description" rows="3" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-indigo-500 font-bold text-sm" 
                  value={jobData.description} onChange={e => setJobData({...jobData, description: e.target.value})} />
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase text-slate-400 ml-2">Salary</label>
                      <input required type="number" className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none focus:ring-2 ring-indigo-500" 
                        value={jobData.salary} onChange={e => setJobData({...jobData, salary: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase text-slate-400 ml-2">Location</label>
                      <input required className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none focus:ring-2 ring-indigo-500" 
                        value={jobData.location} onChange={e => setJobData({...jobData, location: e.target.value})} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase text-slate-400 ml-2">Job Type</label>
                      <select className="w-full p-4 bg-slate-50 rounded-xl font-black uppercase text-[9px]" 
                        value={jobData.typeJop} onChange={e => setJobData({...jobData, typeJop: e.target.value})}>
                          <option value="FullTime">Full Time</option>
                          <option value="PartTime">Part Time</option>
                          <option value="Internship">Internship</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase text-slate-400 ml-2">Level</label>
                      <select className="w-full p-4 bg-slate-50 rounded-xl font-black uppercase text-[9px]" 
                        value={jobData.experieceLevel} onChange={e => setJobData({...jobData, experieceLevel: e.target.value})}>
                          <option value="Senior">Senior</option>
                          <option value="MidLevel">Mid Level</option>
                          <option value="Junior">Junior</option>
                      </select>
                    </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[8px] font-black uppercase text-slate-400 ml-2">Required Skills (Comma separated)</label>
                  <input required placeholder="React, .NET Core, SQL..." className="w-full p-4 bg-slate-50 rounded-xl font-bold italic outline-none focus:ring-2 ring-indigo-500 text-sm" 
                    value={jobData.skills} onChange={e => setJobData({...jobData, skills: e.target.value})} />
                </div>
                
                <button disabled={isSubmitting} className="w-full bg-slate-900 text-white p-6 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all shadow-xl active:scale-95 mt-4 disabled:opacity-50">
                    {isSubmitting ? 'SYCHRONIZING...' : 'CONFIRM & PUBLISH'}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full text-slate-400 font-bold uppercase text-[9px] mt-2 tracking-widest hover:text-red-400 transition-colors">Abort Posting</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}