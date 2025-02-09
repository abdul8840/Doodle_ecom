import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Menu, MenuItem, IconButton, Badge, Drawer } from "@mui/material";
import { BsSearch, BsHeart, BsCart, BsList } from "react-icons/bs";
import { getUserCart } from "../../features/user/userSlice";

const Header = () => {
  const authState = useSelector((state) => state?.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [total, setTotal] = useState(null);

  const dispatch = useDispatch();

  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const productState = useSelector((state) => state?.product?.product);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    dispatch(getUserCart(config2));
  }, []);

  const [productOpt, setProductOpt] = useState([]);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotal(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  return (
    <>
      {/* Top Header */}
      <header className="hidden lg:block bg-gray-900 text-white py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <p className="text-sm sm:text-base">Free Shipping Over Rs.100</p>
          <p className="text-sm sm:text-base">
            Hotline: <a href="tel:+918264954234" className="text-white">+91 8264954234</a>
          </p>
        </div>
      </header>

      {/* Sticky Main Header */}
      <header className="bg-white shadow-md py-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo and Hamburger Menu (for small devices) */}
          <div className="flex items-center gap-4">
            <IconButton
              className="lg:hidden"
              onClick={toggleDrawer(true)}
              aria-label="menu"
            >
              <BsList className="text-gray-700 text-xl" />
            </IconButton>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              <Link to="/">Doodle Ecom</Link>
            </h2>
          </div>

          {/* Search Bar (hidden on small devices) */}
          <div className="hidden lg:block relative w-1/3">
            <input
              type="text"
              placeholder="Search for Products..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <BsSearch className="absolute right-3 top-3 text-gray-500" />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Wishlist Icon */}
            <IconButton component={Link} to="/wishlist">
              <Badge badgeContent={0} color="secondary">
                <BsHeart className="text-gray-700 text-xl hover:text-red-500 transition-colors" />
              </Badge>
            </IconButton>

            {/* Cart Icon with Count and Total */}
            <IconButton component={Link} to="/cart" className="relative group">
              <Badge badgeContent={cartState?.length || 0} color="secondary">
                <BsCart className="text-gray-700 text-xl hover:text-blue-500 transition-colors" />
              </Badge>
              {/* <div className="absolute -bottom-2 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-full transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                Rs. {!cartState?.length ? 0 : total ? total : 0}
              </div> */}
            </IconButton>

            {/* User Avatar (inside the drawer for small screens) */}
            {authState?.user ? (
              <>
                <IconButton onClick={handleMenuOpen} className="hidden lg:block">
                  <Avatar className="hover:shadow-lg transition-shadow">
                    {authState.user.firstname.charAt(0)}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem disabled>
                    {authState.user.firstname} ({authState.user.email})
                  </MenuItem>
                  <MenuItem component={Link} to="/my-profile">
                    My Account
                  </MenuItem>
                  <MenuItem component={Link} to="/my-orders">
                    My Orders
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <NavLink to="/sign-in" className="text-gray-700 hover:text-blue-500 transition-colors">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Menu (for large devices) */}
      <nav className="hidden lg:block bg-gray-800 py-2 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-6 text-white">
            <NavLink to="/" className="hover:underline">
              Home
            </NavLink>
            <NavLink to="/our-store" className="hover:underline">
              Our Store
            </NavLink>
            <NavLink to="/blogs" className="hover:underline">
              Blogs
            </NavLink>
            <NavLink to="/contact" className="hover:underline">
              Contact
            </NavLink>
            <NavLink to="/categories" className="hover:underline">
              Categories
            </NavLink>
          </ul>
        </div>
      </nav>

      {/* Drawer for Small Devices */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div className="w-64 p-4">
          <div className="py-5">
            <div className="flex justify-between flex-col gap-1 border-b pb-1">
              <p className="text-md sm:text-base">Free Shipping Over Rs.100</p>
              <p className="text-md sm:text-base">
                Hotline: <a href="tel:+918264954234" className="text-black">+91 8264954234</a>
              </p>
            </div>
          </div>
          {/* User Avatar and Menu (only for small screens inside the drawer) */}
          {authState?.user && (
            <div className="mb-4 flex items-center gap-4 border-b pb-1">
              <Avatar>{authState.user.firstname.charAt(0)}</Avatar>
              <div>
                <p className="font-bold">{authState.user.firstname}</p>
                <p>{authState.user.email}</p>
              </div>
            </div>
          )}
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <ul className="space-y-2">
            <NavLink to="/" className="block hover:underline">
              Home
            </NavLink>
            <NavLink to="/our-store" className="block hover:underline">
              Our Store
            </NavLink>
            <NavLink to="/blogs" className="block hover:underline">
              Blogs
            </NavLink>
            <NavLink to="/contact" className="block hover:underline">
              Contact
            </NavLink>
            <NavLink to="/categories" className="block hover:underline">
              Categories
            </NavLink>
            {/* Add additional logic for logged-in users to show profile and orders inside the drawer */}
            {authState?.user && (
              <>
                <NavLink to="/my-profile" className="block hover:underline">
                  My Account
                </NavLink>
                <NavLink to="/my-orders" className="block hover:underline">
                  My Orders
                </NavLink>
                <NavLink onClick={handleLogout} className="block hover:underline">
                  Logout
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </Drawer>
    </>
  );
};

export default Header;