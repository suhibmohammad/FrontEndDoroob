import React from 'react';
import { motion } from 'framer-motion';
 import LeftSidebar from '../components/LeftSidebar';
import CompanySidebar from '../components/CompanySidebar';

export default function CompanyDashboard() {
  const stats = [
    { label: 'Active Jobs', value: '12', icon: 'fa-briefcase', color: 'text-indigo-600' },
    { label: 'Total Applicants', value: '148', icon: 'fa-users', color: 'text-emerald-600' },
    { label: 'Pending Reviews', value: '24', icon: 'fa-clock', color: 'text-amber-600' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* الـ Sidebar ثابت على اليسار */}
      <CompanySidebar />

      <main className="flex-1 p-8 md:p-12">
        {/* الترحيب */}
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
            Company <span className="text-indigo-600">Dashboard</span>
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">
            Manage your recruitment process
          </p>
        </header>

        {/* كروت الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6"
            >
              <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl ${stat.color}`}>
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* قسم الوظائف الأخيرة (جدول أو قائمة) */}
        <section className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-8">
              <h2 className="font-black uppercase italic tracking-tighter text-xl">Recent Job Postings</h2>
              <button className="bg-slate-900 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
                + Post New Job
              </button>
           </div>
           
           {/* هنا بتحط الجدول (Table) أو الـ List تاعت الوظائف */}
           <div className="text-center py-20 text-slate-300 italic font-medium">
              No jobs posted yet. Start hiring today!
           </div>
        </section>
      </main>
    </div>
  );
}