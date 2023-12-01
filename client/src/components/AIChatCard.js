import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";

const AIChatCard = (props) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="my-8">
      <div
        className="w-full md:w-[80%] mx-auto shadow-md rounded-md bg-slate-700 cursor-pointer"
        onClick={handleChatClick}
      >
        <div className="p-4 md:p-8 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <div>{props.logo}</div>
            <div className="text-lg md:text-2xl">{props.aiBot}</div>
          </div>
          <div className="hidden md:block">
            <FaChevronRight />
          </div>
        </div>
      </div>

      {isChatOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {/* Your chat pop-up content goes here */}
          <div className="bg-white p-3 rounded-md relative w-full md:w-[50%]">
            <div className="text-[#159977] font-medium text-xl">
              {props.title}
            </div>
            <IoClose
              className="absolute top-2 right-2  cursor-pointer"
              size={20}
              onClick={handleChatClick}
            />
            {props.chatElement}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatCard;
