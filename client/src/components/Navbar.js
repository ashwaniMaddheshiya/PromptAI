import React, { useState } from "react";
import logo from "../logo.jpg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import {
  selectToken,
  clearToken,
  clearUserInfo,
  selectUserInfo,
} from "../reducers/authReducer";
import Profile from "./Profile";

const Navbar = () => {
  const token = useSelector(selectToken);
  const { userId } = useSelector(selectUserInfo);

  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const logoutHandler = () => {
    dispatch(clearUserInfo());
    dispatch(clearToken());
    closeMenu();
  };

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const openProfile = () => {
    setIsProfileOpen(true);
    closeMenu();
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between items-center mx-12">
          <div className="text-xl flex gap-2 font-medium">
            <img src={logo} alt="" className="h-8 rounded-full" />
            <Link to="/">PromptAI</Link>
          </div>
          <div className="hidden md:flex gap-8 font-medium justify-center items-center">
            <div>
              <Link to="/prompt">Prompts</Link>
            </div>
            <div>
              <Link to="/chat">AI-Chat</Link>
            </div>

            {token ? (
              <>
                <div>
                  <Link to="/prompt/new">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                      Add Prompt
                    </button>
                  </Link>
                </div>

                <div className="relative">
                  <div onClick={toggleMenu}>
                    <div className="border border-black rounded-full p-1 cursor-pointer">
                      <FaUser size={18} />
                    </div>
                  </div>
                  {isMenuOpen && (
                    <div className="absolute top-16 right-0 bg-white border border-gray-300 rounded-md p-2 w-full md:w-auto">
                      <button onClick={openProfile}>
                        <div>Profile</div>
                      </button>
                      <Link to="/" onClick={logoutHandler}>
                        <div>Logout</div>
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div>
                  <Link to="/login">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                      Login
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to="/signup">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                      SignUp
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <div onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>
            {isMenuOpen && (
              <div className="absolute top-16 right-2 bg-white border border-gray-300 rounded-md p-2 w-[98%] flex flex-col justify-evenly min-h-[14rem] font-medium">
                <Link
                  to="/prompt"
                  onClick={closeMenu}
                  className="hover:bg-slate-200"
                >
                  <div>Prompts</div>
                </Link>
                <Link
                  to="/chat"
                  onClick={closeMenu}
                  className="hover:bg-slate-200"
                >
                  <div>AI-Chat</div>
                </Link>
                {token && (
                  <>
                    <Link
                      to="/prompt/new"
                      onClick={closeMenu}
                      className="hover:bg-slate-200"
                    >
                      <div>Add Prompt</div>
                    </Link>
                    <Link to="#" className="hover:bg-slate-200">
                      <button onClick={openProfile}>
                        <div>Profile</div>
                      </button>
                    </Link>
                    <Link
                      to="/"
                      onClick={logoutHandler}
                      className="hover:bg-slate-200"
                    >
                      <button>Logout</button>
                    </Link>
                  </>
                )}
                {!token && (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="hover:bg-slate-200"
                    >
                      <div>Login</div>
                    </Link>
                    <Link
                      to="/signup"
                      onClick={closeMenu}
                      className="hover:bg-slate-200"
                    >
                      <div>SignUp</div>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {isProfileOpen && <Profile userId={userId} onClose={closeProfile} />}
    </div>
  );
};

export default Navbar;
