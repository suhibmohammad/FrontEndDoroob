import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ResetPassword() {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // منطق التحديث
    alert("Password Updated Successfully!");
    navigate('/login');
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-6">
            <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Reset Password</h2>
          <p className="mt-3 text-sm text-gray-500">Please enter your new password.</p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full h-14 px-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 outline-none transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm New Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full h-14 px-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 outline-none transition-all"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full py-3 px-4 font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg">
            Update Password
          </button>
        </form>

        <div className="text-center mt-6 border-t pt-4">
          <Link to="/login" className="text-sm font-semibold text-indigo-600 italic">Cancel and return to Login</Link>
        </div>
      </div>
    </main>
  );
}