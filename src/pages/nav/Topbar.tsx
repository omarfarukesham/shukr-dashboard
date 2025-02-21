import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store/store";
import { toggle } from "@/feature/toggle/toggleSlice";
import avatar from "../../assets/images/avatar.png";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Topbar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: RootState) => state.toggle.value);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const toggleSidebar = () => {
    dispatch(toggle());
  };

 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="w-full h-16 bg-primary md:bg-bg-color-2 text-white md:text-black flex items-center justify-between  pl-2 pr-4 shadow-md">
      <button
        className="p-2 hover:bg-gray-100 rounded-md"
        onClick={toggleSidebar}
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              isSidebarOpen
                ? "M4 6h16M4 12h16M4 18h16"
                : "M4 6h16M4 12h16M4 18h7"
            }
          />
        </svg>
      </button>

      <div className="flex items-center gap-5">
        <p>{role?.toLocaleUpperCase()}</p>
        <button className="p-1 bg-gray-3 rounded-full"  onClick={() => setShowLogoutModal(true)}>
          <img src={avatar} alt="User Avatar" className="w-6 h-6 rounded-full" />
        </button>    
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start pt-16 pr-5 justify-end z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-2 py-1 text-sm bg-secondary rounded hover:bg-primary text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-2 py-1 text-sm bg-primary text-white rounded hover:bg-danger"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;

