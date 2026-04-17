import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import RightPanel from '../components/RightPanel';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const initialPosts = [
  {
    id: 1,
    user: 'Abdalrahman baker',
    date: '1/4/2026',
    text: 'abood baker this is my name and my age is 20 years old and my major is software engineering',
    image: '/pexels-benjamin-adjei-abayie-2158492422-36659831.jpg',
    likes: 124,
    comments: 18,
    liked: false,
  },
  {
    id: 2,
    user: 'Abdalrahman baker',
    date: '1/4/2026',
    text: 'Excited to share my latest project built with TailwindCSS! What do you think about the color scheme? 🚀💻',
    image: null,
    likes: 87,
    comments: 12,
    liked: false,
  },
];

export default function HomePage() {
  const [posts, setPosts] = useState(initialPosts);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [postImagePreview, setPostImagePreview] = useState(null);

  const toggleLike = (id) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => setPostImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPostImage(null);
    setPostImagePreview(null);
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!postText.trim() && !postImage) return;
    const newPost = {
      id: Date.now(),
      user: 'Abdalrahman baker',
      date: new Date().toLocaleDateString(),
      text: postText,
      image: postImagePreview,
      likes: 0,
      comments: 0,
      liked: false,
    };
    setPosts(prev => [newPost, ...prev]);
    setPostText('');
    setPostImage(null);
    setPostImagePreview(null);
    setShowPostModal(false);
  };

  return (
    <div className="bg-gray-100 overflow-x-hidden pt-16">
      <Navbar />
      <div className="grid grid-cols-1 gap-5 mx-5 md:grid-cols-3 my-5 lg:grid-cols-12">
        <Sidebar />

        {/* Middle Column */}
        <div className="col-span-6 bg-white border rounded-md m-2 gap-4 p-4 shadow-lg shadow-gray-500 mx-auto w-full">
          <div className="flex flex-col justify-center items-center gap-3">

            {/* Create Post Bar */}
            <div className="flex flex-col w-[95%] mx-auto my-2 p-5">
              <div className="flex items-center space-x-4 gap-2">
                <div className="flex-shrink-0">
                  <Link to="/profile">
                    <img className="w-11 h-11 rounded-full object-cover" src="/Abood.png" alt="User" />
                  </Link>
                </div>
                <button
                  onClick={() => setShowPostModal(true)}
                  className="bg-blue-800 text-white px-6 py-3 w-full rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95">
                  <i className="fa-solid fa-plus mr-2"></i> Create New Post
                </button>
              </div>
            </div>

            {/* Post Modal */}
            {showPostModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
                <div className="min-h-full flex items-start justify-center p-4 py-10">
                  <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                      <h2 className="text-xl font-bold text-blue-800">Create Post</h2>
                      <button onClick={() => setShowPostModal(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <i className="fa-solid fa-xmark text-2xl"></i>
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <img src="/Abood.png" alt="Profile" className="w-12 h-12 rounded-full border-2 border-indigo-950 object-cover" />
                        <div>
                          <p className="font-bold text-blue-800 leading-none mb-1">Abdalrahman Baker</p>
                          <span className="text-xs text-gray-500 italic">.Net Developer</span>
                        </div>
                      </div>
                      <form onSubmit={handlePost} className="space-y-4">
                        <textarea
                          placeholder="What's on your mind, Abood?"
                          value={postText}
                          onChange={e => setPostText(e.target.value)}
                          className="w-full h-24 text-lg border-none focus:ring-0 resize-none outline-none placeholder-gray-400"
                        />
                        {!postImagePreview ? (
                          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-indigo-50 transition-all">
                            <i className="fa-solid fa-cloud-arrow-up text-3xl text-blue-800 mb-2"></i>
                            <p className="text-sm text-gray-500">Add a photo to your post</p>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                          </label>
                        ) : (
                          <div className="relative rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
                            <img src={postImagePreview} alt="preview" className="w-full h-auto block shadow-inner" />
                            <button type="button" onClick={removeImage}
                              className="absolute top-2 right-2 bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black transition-all">
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          </div>
                        )}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <button type="submit"
                            className="bg-blue-800 text-white px-10 py-2 mx-auto w-full rounded-full font-bold shadow-md hover:bg-indigo-900 transition-all">
                            Post
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Posts Feed */}
            {posts.map(post => (
              <div key={post.id} className="w-full bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="flex items-center px-4 py-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-100 shrink-0">
                    <Link to="/profile">
                      <img className="w-full h-full object-cover" src="/Abood.png" alt="User" />
                    </Link>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-bold text-gray-900 leading-tight">{post.user}</h3>
                    <div className="flex items-center text-left text-xs text-gray-500 mt-0.5">
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <button className="ml-auto text-indigo-950 hover:text-white hover:bg-indigo-950 text-lg p-2 rounded-full transition">
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                {/* Text */}
                <div className="px-4 pb-3">
                  <p className="text-gray-800 text-sm leading-relaxed">{post.text}</p>
                </div>
                {/* Image */}
                {post.image && (
                  <div className="bg-gray-100">
                    <img className="w-full h-auto block" src={post.image} alt="Post" />
                  </div>
                )}
                {/* Counts */}
                <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span className="bg-indigo-900 text-white p-1 rounded-full">
                      <i className="fa-regular fa-thumbs-up"></i>
                    </span>
                    <span className="pl-1">{post.likes} Like</span>
                  </div>
                  <div><span className="hover:underline cursor-pointer">{post.comments} comments</span></div>
                </div>
                {/* Actions */}
                <div className="flex items-center px-2 py-1">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 hover:bg-gray-100 py-2 rounded-lg transition font-medium text-sm ${post.liked ? 'text-blue-800' : 'text-gray-600'}`}>
                    <i className={`fa-${post.liked ? 'solid' : 'regular'} fa-thumbs-up`}></i>
                    <span>{post.liked ? 'Liked' : 'Like'}</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 hover:bg-gray-100 py-2 rounded-lg text-gray-600 transition font-medium text-sm">
                    <i className="fa-regular fa-comment"></i>
                    <span>Comment</span>
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>

        <RightPanel />
      </div>
      <Footer />
    </div>
  );
}
