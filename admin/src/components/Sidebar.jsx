import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Info, Settings, ChevronLeft, ChevronRight } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CategoryIcon from '@mui/icons-material/Category';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ListIcon from '@mui/icons-material/List';
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isProductCatalogOpen, setIsProductCatalogOpen] = useState(false);

  const authState = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleProductCatalog = () => {
    setIsProductCatalogOpen(!isProductCatalogOpen);
  };

  const activeClass = "bg-blue-500 text-white"; // Active menu item styling
  const defaultClass = "hover:bg-gray-100 text-black"; // Default menu styling

  return (
    <div className="flex">
      <div className={`h-screen bg-gray-50 shadow-lg text-black p-4 transition-all duration-300 ${isExpanded ? "w-64" : "w-24"}`}>
        <div className="flex justify-between border-b pb-2">
          {isExpanded && (
            <div>
              <p className="text-sm">Welcome Admin,</p>
              <h2 className="text-lg">{authState.user.firstname} {authState.user.lastname}</h2>
            </div>
          )}
          <button onClick={toggleSidebar} className="text-black">
            {isExpanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        <ul className="mt-4 space-y-4">
          <li>
            <NavLink to="/" className={({ isActive }) => `flex items-center space-x-4 p-2 rounded ${isActive ? activeClass : defaultClass}`}>
              <Home />
              {isExpanded && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-users" className={({ isActive }) => `flex items-center space-x-4 p-2 rounded ${isActive ? activeClass : defaultClass}`}>
              <PeopleAltIcon />
              {isExpanded && <span>All Users</span>}
            </NavLink>
          </li>
          
          {/* Product Catalog with Collapsible Submenu */}
          <li>
            <button onClick={toggleProductCatalog} className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded w-full text-left">
              <StorefrontIcon />
              {isExpanded && <span>Product Catalog</span>}
            </button>
            {isProductCatalogOpen && (
              <ul className="ml-6 space-y-2 mt-2">
                <li>
                  <NavLink to="/product" className={({ isActive }) => `flex items-center space-x-4 p-2 rounded ${isActive ? activeClass : defaultClass}`}>
                    <ListIcon />
                    {isExpanded && <span>Product List</span>}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/product-category" className={({ isActive }) => `flex items-center space-x-4 p-2 rounded ${isActive ? activeClass : defaultClass}`}>
                    <CategoryIcon />
                    {isExpanded && <span>Category List</span>}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/get-brand" className={({ isActive }) => `flex items-center space-x-4 p-2 rounded ${isActive ? activeClass : defaultClass}`}>
                    <StorefrontIcon />
                    {isExpanded && <span>Brand List</span>}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/color" className={({ isActive }) => `flex items-center space-x-4 p-2 rounded ${isActive ? activeClass : defaultClass}`}>
                    <ColorLensIcon />
                    {isExpanded && <span>Color List</span>}
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          
          <li>
            <NavLink to="/orders" className={({ isActive }) => `flex items-center space-x-4 p-2 rounded ${isActive ? activeClass : defaultClass}`}>
              <Info />
              {isExpanded && <span>Orders</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/home" className={({ isActive }) => `flex items-center space-x-4 p-2 rounded ${isActive ? activeClass : defaultClass}`}>
              <Info />
              {isExpanded && <span>Home</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => `flex items-center space-x-4 p-2 rounded ${isActive ? activeClass : defaultClass}`}>
              <Settings />
              {isExpanded && <span>Settings</span>}
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleLogout} className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded">
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
