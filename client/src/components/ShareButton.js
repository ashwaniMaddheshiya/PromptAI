import React from "react";
import {
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp, FaTwitter, FaLinkedin, FaReddit } from "react-icons/fa";

const ShareButton = ({ url, closeModal }) => {
  return (
    <div className="flex flex-col gap-2 ">
      <p className="text-lg font-medium">Share this prompt:</p>
      <EmailShareButton url={url}>
        <div className="bg-white hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-between items-center cursor-pointer">
          Email <MdOutlineEmail />
        </div>
      </EmailShareButton>

      <WhatsappShareButton url={url}>
        <div className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-between items-center cursor-pointer">
          Whatsapp
          <FaWhatsapp />
        </div>
      </WhatsappShareButton>

      <TwitterShareButton url={url}>
        <div className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-between items-center cursor-pointer">
          Twitter
          <FaTwitter />
        </div>
      </TwitterShareButton>

      <LinkedinShareButton url={url}>
        <div className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-between items-center cursor-pointer">
          LinkedIn
          <FaLinkedin />
        </div>
      </LinkedinShareButton>

      <RedditShareButton url={url}>
        <div className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-between items-center cursor-pointer">
          Reddit
          <FaReddit />
        </div>
      </RedditShareButton>

      <button
        onClick={closeModal}
        className="bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-3 rounded"
      >
        Close
      </button>
    </div>
  );
};

export default ShareButton;
