import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/postSlice";

const PostForm = () => {
  const [formData, setFormData] = useState({ title: "", description: "", image: null });
  const [imagePreview, setImagePreview] = useState(null); 
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.post); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file)); 
    } else {
      alert("Please upload a valid image file (jpg, png, etc.).");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);

    dispatch(createPost(formDataToSend)).then(() => {
      
      setFormData({ title: "", description: "", image: null });
      setImagePreview(null); 
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-zinc-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
      
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        
        <textarea
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          rows="4"
        />

      
        <label className="flex flex-col items-center gap-2 bg-zinc-800 text-white p-3 rounded-lg border border-gray-300 cursor-pointer hover:bg-zinc-700 transition">
          <span className="text-gray-400">📁 Upload Image</span>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*" 
            required
          />
        </label>

       
        {imagePreview && (
          <div className="flex justify-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-48 h-48 object-cover rounded-lg"
            />
          </div>
        )}

      
        <button
          type="submit"
          disabled={loading} 
          className="bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition disabled:bg-blue-300"
        >
          {loading ? "Submitting..." : "Create Post"}
        </button>

       
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default PostForm;