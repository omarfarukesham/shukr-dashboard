import { Outlet } from "react-router";
import { Suspense } from "react";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import Topbar from "./pages/nav/Topbar";
import Navbar from "./pages/nav/navbar";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (location.pathname === '/' && !token) {
      navigate('/login');
    }
  }, [token, navigate, location]);

  if (location.pathname !== '/login' && !token) {
    return null
  }

  return (
    <>
      <Toaster position="top-center"/>
      {location.pathname === '/login' ? (
        <Outlet />
      ) : (
        <div className="h-screen flex overflow-hidden">
        <Navbar />
        <div className="flex-1 flex flex-col w-full md:w-[calc(100%-250px)]">
          <div className="sticky top-0 z-50">
            <Topbar />
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-1">
            <div className="p-4">
              <Suspense fallback={<LoadingSpinner text="Loading your content" className={undefined} />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

