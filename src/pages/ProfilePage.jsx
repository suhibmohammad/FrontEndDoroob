import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import RightPanel from '../components/RightPanel';
import Footer from '../components/Footer';

const initialPosts = [
  {
    id: 1,
    user: 'عبد الرحمن بكر',
    date: '30 مارس 2026',
    text: 'سعيد جداً بمشاركتكم تطورات مشروعي الأخير! تم بناء هذه الواجهة باستخدام #TailwindCSS لتحقيق أقصى درجات المرونة والسرعة في التصميم. ما رأيكم في التناسق اللوني؟ 🚀💻',
    image: null,
    likes: 124,
    comments: 18,
    liked: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    user: 'عبد الرحمن بكر',
    date: '30 مارس 2026',
    text: 'سعيد جداً بمشاركتكم تطورات مشروعي الأخير! تم بناء هذه الواجهة باستخدام #TailwindCSS',
    image: null,
    likes: 89,
    comments: 7,
    liked: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    user: 'Abdalrahman baker',
    date: '30 مارس 2026',
    text: 'abood baker this is my name and my age is 20 years old and my major is software engineering',
    image: '/pexels-benjamin-adjei-abayie-2158492422-36659831.jpg',
    likes: 124,
    comments: 18,
    liked: false,
    avatar: '/Abood.png',
  },
];

const skills = ['C# / .NET', 'EF Core', 'SQL Server', 'Tailwind CSS', 'LINQ'];

export default function ProfilePage() {
  const [posts, setPosts] = useState(initialPosts);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [skillsList, setSkillsList] = useState(skills);

  const toggleLike = (id) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkillsList(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
      setShowAddSkill(false);
    }
  };

  return (
    <div className="bg-gray-100 overflow-x-hidden pt-16">
      <Navbar />
      <div className="grid grid-cols-1 gap-5 mx-5 md:grid-cols-3 my-5 lg:grid-cols-12">

        {/* Main Profile Column */}
        <div className="col-span-9 bg-white border rounded-md m-2 gap-4 p-4 shadow-lg shadow-gray-500 mx-auto w-full">

          {/* Profile Card */}
          <div className="w-full rounded-2xl border-2 border-gray-500 shadow-gray-600 overflow-hidden group">
            {/* Cover */}
            <div className="h-32 w-full bg-indigo-950 relative">
              <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </div>

            {/* Avatar */}
            <div className="relative flex justify-center -mt-12">
              <img src="/Abood.png" alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover transition-transform group-hover:scale-105 duration-300" />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center items-center text-center px-6 py-4">
              <h2 className="text-xl font-extrabold text-indigo-950 tracking-tight">Abdalrahman Baker</h2>
              <p className="text-indigo-600 font-semibold text-sm">.Net Developer</p>

              {/* Stats */}
              <div className="flex border-t border-gray-50 bg-gray-50 w-full my-8">
                <div className="flex-1 text-center py-4 border-r border-gray-100">
                  <span className="block text-xl font-bold text-indigo-950">{posts.length + 121}</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Posts</span>
                </div>
                <div className="flex-1 text-center py-4">
                  <span className="block text-xl font-bold text-indigo-950">850</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Friends</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col lg:flex-row justify-around items-center w-full my-5">
                <p className="text-gray-600 font-semibold text-xl">contact info :</p>
                <a href="mailto:aboodbaker044@gmail.com" className="text-indigo-500 text-lg">aboodbaker044@gmail.com</a>
                <p className="text-indigo-500 text-lg">0781458386</p>
                <p className="text-indigo-500 text-lg">Amman</p>
              </div>

              <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique maiores libero doloribus odit?
                Soluta porro hic quod sequi quidem modi nulla quae animi, deleniti laborum recusandae similique repudiandae quaerat consequuntur.
                Ipsam, eius! Saepe dolore molestias corporis debitis commodi optio deserunt similique laborum veritatis accusantium porro minima architecto.
              </p>
            </div>

            {/* Skills */}
            <div className="px-6 py-4 w-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold uppercase tracking-widest text-gray-400">Top Skills</h3>
                <button onClick={() => setShowAddSkill(!showAddSkill)} className="text-indigo-950 hover:text-indigo-600 transition-colors">
                  <i className="fa-solid fa-circle-plus text-xl"></i>
                </button>
              </div>
              {showAddSkill && (
                <div className="flex gap-2 mb-3">
                  <input type="text" placeholder="Add skill..." value={newSkill} onChange={e => setNewSkill(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-indigo-200 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                  <button onClick={addSkill} className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition">Add</button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill, i) => (
                  <span key={i} className="px-7 py-3 bg-indigo-50 text-indigo-700 text-[11px] font-bold rounded-full border border-indigo-100 hover:bg-indigo-100 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <hr className="my-5" />

            {/* Posts */}
            {posts.map(post => (
              <div key={post.id} className="w-full lg:w-4/5 max-w-lg mx-auto bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden mb-4">
                <div className="flex items-center px-4 py-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-100 shrink-0">
                    <img className="h-full w-full object-cover" src={post.avatar} alt="User Profile" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-bold text-gray-900 leading-tight">{post.user}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-0.5">
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <button className="ml-auto text-indigo-950 hover:text-white hover:bg-indigo-950 text-xl p-1.5 rounded-full transition">
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <div className="px-4 pb-3">
                  <p className="text-gray-800 text-sm leading-relaxed">{post.text}</p>
                </div>
                {post.image && (
                  <div className="bg-gray-100">
                    <img className="w-full h-auto object-cover max-h-[500px]" src={post.image} alt="Post" />
                  </div>
                )}
                <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span className="bg-blue-500 text-white p-1 rounded-full">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                    </span>
                    <span className="pl-1">{post.likes} Like</span>
                  </div>
                  <div><span className="hover:underline cursor-pointer">{post.comments} تعليق</span></div>
                </div>
                <div className="flex items-center px-2 py-1">
                  <button onClick={() => toggleLike(post.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 hover:bg-gray-100 py-2 rounded-lg transition font-medium text-sm ${post.liked ? 'text-blue-800' : 'text-gray-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{post.liked ? 'Liked' : 'Like'}</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 hover:bg-gray-100 py-2 rounded-lg text-gray-600 transition font-medium text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Comment</span>
                  </button>
                </div>
              </div>
            ))}

            <div className="p-4">
              <a href="#" className="block w-1/2 mx-auto text-center bg-indigo-950 text-white py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-indigo-900 hover:shadow-indigo-200 transition-all active:scale-[0.98]">
                View Full Profile
              </a>
            </div>
          </div>

        </div>

        <RightPanel />
      </div>
      <Footer />
    </div>
  );
}
