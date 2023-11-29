import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="mt-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Prompt AI Website. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
