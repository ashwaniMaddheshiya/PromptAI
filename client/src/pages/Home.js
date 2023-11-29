import React from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

import TypingAnimate from "../components/TypingAnimate";
import About from "../components/About";
import { useSelector } from "react-redux";

import { selectToken } from "../reducers/authReducer";

const Home = () => {
  const token = useSelector(selectToken);

  return (
    <div className="flex flex-col items-center">
      <TypingAnimate />
      <div className="text-center mt-8 max-w-2xl mx-auto">
        <p className="font-bold">
          Enjoy unlimited access to the prompts of ChatGPT, Google Bard, and
          more, all at no cost to you.
        </p>
        <div className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full">
            {token ? (
              <Link to="/prompt">
                Explore Prompts{" "}
                <FaArrowCircleRight className="inline ml-2 mb-1" />
              </Link>
            ) : (
              <Link to="/login">
                Get Started <FaArrowCircleRight className="inline ml-2 mb-1" />
              </Link>
            )}
          </button>
        </div>
      </div>
      <hr className="max-w-6xl mx-auto my-8" />
      <About />
    </div>
  );
};

export default Home;
