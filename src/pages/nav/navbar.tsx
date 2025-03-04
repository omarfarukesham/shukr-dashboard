import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "@/store/store";
import { useState } from 'react';
import { HomeIcon, OrderIcon, ProductIcon, UserIcon } from "@/assets/icons2";

const Navbar = () => {
  const isSidebarOpen = useSelector((state: RootState) => state.toggle.value);
  const role = localStorage.getItem('role');
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen">
      <nav className={`relative bg-primary text-white h-full transition-all duration-300 ${isSidebarOpen ? "w-54" : "w-20"}`}>
        <div className="p-4">
          {/* Logo */}
          <div className="flex justify-between items-center mt-2">
            <div className={`font-bold transition-all duration-500 ${isSidebarOpen ? "text-xl text-center" : "text-center text-lg ml-2 "}`}>
              <Link to="/">{isSidebarOpen ? "Shukr Admin" : "SA"}</Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="py-5">
            {role === "admin" && (
              <div>
                <Link 
                  to="/home" 
                  className={`flex items-center space-x-2 p-3 rounded-md 
                    ${isActiveRoute('/home') 
                      ? 'bg-secondary text-white' 
                      : 'hover:bg-secondary'}`}
                >
                  <HomeIcon />
                  {isSidebarOpen && <span className="text-base-1 px-1">Dashboard</span>}
                </Link>

                {/* Product with submenu */}
                <div>
                  <div 
                    onClick={() => toggleSubmenu('product')} 
                    className="flex items-center justify-between p-3 hover:bg-secondary rounded-md cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <ProductIcon />
                      {isSidebarOpen && <span className="text-base-1 px-1">Home Screen</span>}
                    </div>
                    {isSidebarOpen && (
                      <svg className={`w-4 h-4 transition-transform ${openSubmenu === 'product' ? 'rotate-180' : ''}`} 
                          fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Product Submenu */}
                  {openSubmenu === 'product' && isSidebarOpen && (
                    <div className="ml-8 space-y-2">
                      <Link to="/home-screen" className={`flex items-center p-2 rounded-md ${isActiveRoute('/home-screen') ? 'bg-secondary text-white' : 'hover:bg-secondary'}`}>
                        <span className="text-base-1">Home</span>
                      </Link>
                      <Link to="/daily-dua" className={`flex items-center p-2 rounded-md ${isActiveRoute('/daily-dua') ? 'bg-secondary text-white' : 'hover:bg-secondary'}`}>
                        <span className="text-base-1">Daily Dua</span>
                      </Link>
                      <Link to="/shukr-post" className={`flex items-center p-2 rounded-md ${isActiveRoute('/shukr-post') ? 'bg-secondary text-white' : 'hover:bg-secondary'}`}>
                        <span className="text-base-1">Shukr Post</span>
                      </Link>
                      <Link to="/shukr-ins" className={`flex items-center p-2 rounded-md ${isActiveRoute('/shukr-ins') ? 'bg-secondary text-white' : 'hover:bg-secondary'}`}>
                        <span className="text-base-1">Shukr Ins</span>
                      </Link>
                      <Link to="/jazakallah" className={`flex items-center p-2 rounded-md ${isActiveRoute('/shukr-ins') ? 'bg-secondary text-white' : 'hover:bg-secondary'}`}>
                        <span className="text-base-1">Jazakallah</span>
                      </Link>
                      <Link to="/nature-beauty" className={`flex items-center p-2 rounded-md ${isActiveRoute('/nature-beauty') ? 'bg-secondary text-white' : 'hover:bg-secondary'}`}>
                        <span className="text-base-1">Nature Beauty</span>
                      </Link>
                      <Link to="/positive-thinking" className={`flex items-center p-2 rounded-md ${isActiveRoute('/positive-thinking') ? 'bg-secondary text-white' : 'hover:bg-secondary'}`}>
                        <span className="text-base-1">Positive Thiniking</span>
                      </Link>
                      <Link to="/sticky-notes" className={`flex items-center p-2 rounded-md ${isActiveRoute('/sticky-notes') ? 'bg-secondary text-white' : 'hover:bg-secondary'}`}>
                        <span className="text-base-1">Sticky Notes</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Other existing links */}
                <Link 
                  to="/order" 
                  className={`flex items-center space-x-2 p-3 rounded-md 
                    ${isActiveRoute('/order') 
                      ? 'bg-secondary text-white' 
                      : 'hover:bg-secondary'}`}
                >
                  <OrderIcon className="w-6 h-6 text-white" />
                  {isSidebarOpen && <span className="text-base-1 px-1">Explore Screen</span>}
                </Link>
                
                <Link 
                  to="/user" 
                  className={`flex items-center space-x-2 p-3 rounded-md 
                    ${isActiveRoute('/user') 
                      ? 'bg-secondary text-white' 
                      : 'hover:bg-secondary'}`}
                >
                  <UserIcon className="w-6 h-6 text-white" />
                  {isSidebarOpen && <span className="text-base-1 px-1">App Users</span>}
                </Link>
              </div>
            )}
            {role === "user" && (
              <div>
                <Link 
                  to="/order" 
                  className={`flex items-center space-x-2 p-3 rounded-md 
                    ${isActiveRoute('/order') 
                      ? 'bg-secondary text-white' 
                      : 'hover:bg-secondary'}`}
                >
                  <OrderIcon className="w-6 h-6 text-white" />
                  {isSidebarOpen && <span className="text-base-1 px-1">Orders</span>}
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

