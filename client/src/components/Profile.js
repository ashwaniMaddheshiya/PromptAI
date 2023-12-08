import React, { useEffect, useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import user from "../user.jpg";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = ({ userId, onClose }) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        setUserData(response.data.user);
      } catch (err) {
        toast.error("Unable to fetch user detail");
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="fixed z-10 top-0 left-0 h-screen w-screen flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative z-10">
        <div className="bg-white border border-gray-300 rounded-md p-4 max-w-xs w-full md:max-w-sm lg:max-w-md xl:max-w-lg">
          {userData ? (
            <div className="flex flex-col items-center">
              <img
                src={user}
                alt="Profile"
                className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-32 xl:w-32 rounded-full mb-2"
              />
              <div className=" mb-1 flex items-center gap-2">
                <span className="text-3xl font-medium">{userData.name}</span>
                <span className="text-xl">
                  {userData.isVerified && <MdVerified />}
                </span>
              </div>
              <div className="text-sm text-gray-700 font-medium mb-2 flex items-center gap-2">
                <span>
                  <FaBriefcase />
                </span>
                Frontend Developer
              </div>

              <div className="text-xl font-medium mb-1">{userData.email}</div>
            </div>
          ) : (
            <div className="text-center font-medium text-2xl"> Loading...</div>
          )}

          {/* Close button */}
          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
