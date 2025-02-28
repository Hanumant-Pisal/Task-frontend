import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

const Dashboard = () => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    if (!token) {
      navigate("/signin"); 
    } else {
      setIsLoading(false); 
    }
  }, [token, navigate]);

  if (isLoading) {
    return <p className="text-center mt-8 text-gray-600">Loading...</p>; 
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Navbar />

      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16">
        
          <div className="flex-shrink-0">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2amYoC3Sbo7zXr6dYH5hDE2_QyzGPO7Jd1w&s"
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-green-500"
            />
          </div>

         
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white">{user?.name || "Hanumant"}</h2>
            <p className="text-gray-400 mt-2">{user?.email || "No Email Provided"}</p>
          </div>
        </div>
      </div>

     
      <div className="container mx-auto px-4 py-8">
      
        <div className="flex justify-center mb-10 ml-40">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition"
          >
            Create Post
          </button>
        </div>

       
        <div className="lg:col-span-3">
          <PostList />
        </div>
      </div>

      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
          
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close modal"
            >
              ✕
            </button>

          
            <PostForm onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;