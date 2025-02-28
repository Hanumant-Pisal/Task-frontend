import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-zinc-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-end items-center">
        

       
        <div className="relative flex items-center space-x-4">
          {user ? (
            <>
              <span className="hidden md:block font-semibold">{user.name}</span>

              
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2amYoC3Sbo7zXr6dYH5hDE2_QyzGPO7Jd1w&s" 
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </button>

            
              {dropdownOpen && (
    <div ref={dropdownRef} className="absolute right-0 mt-42 w-64 bg-zinc-800 text-white shadow-lg rounded-lg py-2 transition-all duration-300 ease-in-out transform origin-top-right scale-100">
      <p className="px-4 py-2 border-b text-center font-semibold bg-zinc-800 rounded-t-lg break-words">{user.email}</p>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition-colors duration-300 rounded-b-lg"
      >
        Logout
      </button>
    </div>
  )}

            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
