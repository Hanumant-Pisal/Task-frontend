import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost, updatePost } from "../redux/postSlice";
import { FaComment, FaEllipsisV, FaHeart, FaShare } from "react-icons/fa";
import Modal from "react-modal";

Modal.setAppElement("#root");

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);

  const [editingPost, setEditingPost] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts: {error}</p>;

  const handleEditClick = (post) => {
    setEditingPost(post);
    setUpdatedTitle(post.title);
    setUpdatedDescription(post.description);
    setUpdatedImage(null);
    setIsEditModalOpen(true);
    setIsDropdownOpen(null);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("title", updatedTitle);
    formData.append("description", updatedDescription);
    if (updatedImage) {
      formData.append("image", updatedImage);
    }

    dispatch(
      updatePost({
        id: editingPost._id,
        updatedData: formData,
      })
    );
    setIsEditModalOpen(false);
  };

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId));
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4 mt-6 font-bold">All Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-zinc-800 shadow-lg p-4 rounded relative overflow-hidden"
          >
            <div className="absolute top-2 right-2">
              <button
                onClick={() =>
                  setIsDropdownOpen(isDropdownOpen === post._id ? null : post._id)
                }
                className="text-gray-400 hover:text-white text-2xl mt-2"
              >
                <FaEllipsisV />
              </button>

              {isDropdownOpen === post._id && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-700 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => handleEditClick(post)}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-zinc-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-zinc-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <h3 className="text-lg font-bold truncate">{post.title}</h3>
            <div className="flex justify-center bg-zinc-900 mt-4">
              {post.image && (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${post.image}?${Date.now()}`}
                  alt={post.title}
                  className="w-[200px] h-[300px] object-cover rounded"
                />
              )}
            </div>
            <div className="flex justify-around mt-4 text-white">
              <button className="flex items-center gap-1 hover:text-red-500">
                <FaHeart className="text-2xl" /> Like
              </button>
              <button className="flex items-center gap-1 hover:text-blue-500">
                <FaComment className="text-2xl" /> Comment
              </button>
              <button className="flex items-center gap-1 hover:text-green-500">
                <FaShare className="text-2xl" /> Share
              </button>
            </div>
            <p className="mt-2 line-clamp-3 break-words text-ellipsis overflow-hidden">
              {post.description}
            </p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-8"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">Edit Post</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            placeholder="Title"
            className="border p-2 w-full rounded bg-zinc-900 text-white"
            required
          />
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            placeholder="Description"
            className="border p-2 w-full rounded bg-zinc-900 text-white"
            rows="4"
            required
          />
          {editingPost?.image && (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${editingPost.image}`}
              alt="Current"
              className="w-[150px] h-[200px] object-cover rounded"
            />
          )}
          <input
            type="file"
            onChange={(e) => setUpdatedImage(e.target.files[0])}
            className="border p-2 w-full rounded bg-zinc-900 text-white"
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PostList;