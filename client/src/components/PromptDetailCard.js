import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { MdContentCopy, MdVerified } from "react-icons/md";
import { IoShareOutline } from "react-icons/io5";
import { useParams, Link } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import ShareButton from "./ShareButton";
import { selectToken } from "../reducers/authReducer";
import Profile from "./Profile";

const PromptDetailCard = () => {
  const { promptId } = useParams();
  const token = useSelector(selectToken);
  const [promptDetail, setPromptDetail] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/prompt/${promptId}`);
        setPromptDetail(response.data.promptData);
      } catch (error) {
        toast.error("Something went wrong, Please try again");
      }
    };
    fetchData();
  }, [promptId]);

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const handleCopy = () => {
    if (!token) {
      toast.error("You must be login first!");
      return;
    }
    toast.success("Prompt Copied to clipboard");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {promptDetail ? (
        <div>
          <div className="text-3xl text-center my-8">{promptDetail.title}</div>
          <div className="flex flex-col items-center mb-2">
            <div className="w-2/3 rounded overflow-hidden shadow-lg border">
              <Link to="#" onClick={openProfile}>
                <div className="flex items-center p-3 gap-2">
                  <span>
                    <FaUserCircle size={20} />
                  </span>
                  <span className="flex items-center gap-2">
                    <span>{promptDetail.userId.name}</span>
                    <span>
                      {promptDetail.userId.isVerified && <MdVerified />}
                    </span>
                  </span>
                </div>
              </Link>
              <hr />
              <div className="flex items-center p-2 my-2 gap-2">
                <CopyToClipboard text={promptDetail.prompt} onCopy={handleCopy}>
                  <span className="rounded-full p-2 border cursor-pointer hover:bg-gray-400">
                    <MdContentCopy size={17} />
                  </span>
                </CopyToClipboard>
                {/* Share buttons */}
                <span
                  className="rounded-full p-2 border cursor-pointer hover:bg-gray-400"
                  onClick={openModal}
                >
                  <IoShareOutline size={17} />
                </span>
              </div>
              <hr className="border-gray-400" />

              <div className="px-6 py-4 min-h-[12rem] flex justify-center items-center bg-black">
                {!token && (
                  <div className="absolute z-10  flex items-center justify-center">
                    <Link to="/login">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Login to view
                      </button>
                    </Link>
                  </div>
                )}
                <p className={`text-white text-sm ${!token ? "blur" : ""}`}>
                  {promptDetail.prompt}
                </p>
              </div>
              <hr />
              <div className="px-4 pt-4 pb-2">
                {promptDetail.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {isProfileOpen && (
              <Profile
                userId={promptDetail.userId._id}
                onClose={closeProfile}
              />
            )}
          </div>

          {/* Share Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-20">
              <div className="bg-white p-4 rounded-md min-w-[20%] border">
                <ShareButton
                  url={window.location.href}
                  closeModal={closeModal}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center my-8">Loading...</div>
      )}
    </>
  );
};

export default PromptDetailCard;
