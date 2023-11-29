import React from "react";
import pagenotfound from '../pagenotfound.jpg'

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          404
        </h1>
        <p className="text-lg md:text-2xl font-medium text-gray-600 mb-8">
          Page Not Found
        </p>
        <p className="text-base md:text-lg text-gray-600">
          Oops! The page you are looking for might be in another galaxy.
        </p>
        <img
          src={pagenotfound} // Add your custom 404 image URL
          alt="Page Not Found"
          className="mt-8 max-w-full mx-auto h-60"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
