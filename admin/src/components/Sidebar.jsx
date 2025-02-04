import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Info, Settings, ChevronLeft, ChevronRight } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const authState = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`h-screen bg-gray-900 text-white p-4 transition-all duration-300 ${isExpanded ? "w-64" : "w-16"}`}>
        {/* Sidebar Toggle Button */}

        <div className="flex justify-between border-b pb-2">
          {isExpanded && <div className="">
            <p className="text-sm">Welcome Admin,</p>
            <h2 className="text-lg">{authState.user.firstname} {authState.user.lastname} </h2>
          </div>}
          <div className="flex justify-end">
            <button onClick={toggleSidebar} className="text-white">
              {isExpanded ? <ChevronLeft /> : <ChevronRight />}
            </button>
          </div>
        </div>


        {/* Sidebar Menu */}
        <ul className="mt-4 space-y-4">
          <li>
            <NavLink to="/" className="flex items-center space-x-4 p-2 hover:bg-gray-700 rounded">
              <Home />
              {isExpanded && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/home" className="flex items-center space-x-4 p-2 hover:bg-gray-700 rounded">
              <Info />
              {isExpanded && <span>Home</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="flex items-center space-x-4 p-2 hover:bg-gray-700 rounded">
              <Settings />
              {isExpanded && <span>Settings</span>}
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleLogout} className="flex items-center space-x-4 p-2 hover:bg-gray-700 rounded">
              <LogoutIcon />
              {isExpanded && <span>Logout</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
