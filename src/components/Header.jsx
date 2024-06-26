import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { AiFillShopping } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";

import "../styles/Header.css";
import { useSelector } from "react-redux";
import { clearWishlist, updateWishlist } from "../features/wishlist/wishlistSlice";
import axiosInstance from '../../serverUrl';


const Header = () => {
  const { total } = useSelector((state) => state.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [profileImage, setProfileImage] = useState('');


  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.cartItems);



    // Function to fetch the profile image
    const fetchProfileImage = async () => {
      try {
        // Get user ID from local storage
        const userId = localStorage.getItem('id');
        const accessToken = localStorage.getItem('accessToken');
  
        if (userId) {
          const response = await axiosInstance.get(`user/user-details/?id=${userId}`,{
            headers:{
              'Authorization':'JWT ' + accessToken
            }
          });

          // Extract profile image URL from response data
          const imageUrl = response.data.results[0].profile_picture;
  
          // Update state with profile image URL
          setProfileImage(imageUrl);
        }
      } catch (error) {

        setProfileImage('https://xsgames.co/randomusers/avatar.php?g=male')  

        console.error('Error fetching profile image:', error);
      }
    };
  




  useEffect(() => {
    setIsLoggedIn(loginState);
    fetchProfileImage();

    
  }, [loginState]);

  return (
    <>
     
      <div className="navbar bg-base-100 max-w-7xl mx-auto">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl font-black text-accent-content"
          >
            <AiFillShopping />
            Bruce Clothing & Shoes
          </Link>
        </div>
        <div className="flex-none">
          <Link
            to="/search"
            className="btn btn-ghost btn-circle text-accent-content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="cart-container">
      {cartItems.length > 0 && (
        <div className="header-badge">{cartItems.length}</div>
      )}
    </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg text-accent-content">
                  { cartItems.length > 0 && cartItems.length} Items
                </span>
                <span className="text-info text-accent-content">
                  Subtotal: ${total.toFixed(2)}
                </span>
                <div className="card-actions">
                  <Link
                    to="/cart"
                    className="btn bg-blue-600 btn-block text-white hover:bg-blue-500 text-base-content"
                  >
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {isLoggedIn && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
             
                  <img src={profileImage} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    to="/user-profile"
                    className="justify-between text-accent-content"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/order-history" className="text-accent-content">
                    Order history
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-accent-content">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-bottom-menu border-y border-gray-800">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
  
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn drawer-button">
              <HiMiniBars3BottomLeft className="text-4xl" />
            </label>
          </div>
          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
                    
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content mt-4">
            <label htmlFor="my-drawer" className="btn drawer-button">
            <FaWindowClose className="text-3xl ml-auto" />
            </label>
              {/* Sidebar content here */}
              <li className="text-xl">
                <NavLink className="text-accent-content" to="/">
                  Home
                </NavLink>
              </li>
              <li className="text-xl">
                <NavLink className="text-accent-content" to="/shop">
                  Shop
                </NavLink>
              </li>
              <li className="text-xl">
                <NavLink className="text-accent-content" to="/about-us">
                  About us
                </NavLink>
              </li>
              <li className="text-xl">
                <NavLink className="text-accent-content" to="/contact">
                  Contact
                </NavLink>
              </li>
              {!isLoggedIn && (
                <>
                  <li className="text-xl">
                    <NavLink className="text-accent-content" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="text-xl">
                    <NavLink className="text-accent-content" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="container text-xl navlinks-container">
          <NavLink className="text-accent-content" to="/">
            Home
          </NavLink>
          <NavLink className="text-accent-content" to="/shop">
            Shop
          </NavLink>
          <NavLink className="text-accent-content" to="/about-us">
            About us
          </NavLink>
          <NavLink className="text-accent-content" to="/contact">
            Contact
          </NavLink>
          {!isLoggedIn && (
            <>
              <NavLink className="text-accent-content" to="/login">
                Login
              </NavLink>
              <NavLink className="text-accent-content" to="/register">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
