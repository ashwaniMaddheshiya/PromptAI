import React, { useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { LuSend } from "react-icons/lu";

const ChatDalleBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputMessage, type: "user" },
    ]);
    setInputMessage("");

    try {
      setLoading(true);

      const response = await axios.post("/api/chat/dall-e", {
        prompt: inputMessage,
      });

      const responseData = response.data;

      setMessages((prevMessages) => [
        ...prevMessages,
        { photo: responseData.photo, type: "assistant" },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[95%] mx-auto bg-[#343541] rounded-md overflow-hidden shadow-lg mt-4">
      <div className="py-4 px-1 h-96 overflow-y-auto scrollbar-hide">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.type === "assistant" && (
              <span>
                <SiOpenai className="text-2xl mr-2 text-[#159977]" />
              </span>
            )}
            {message.type === "assistant" && message.photo ? (
              <img
                src={`data:image/jpeg;base64,${message.photo}`}
                alt="DALL-E"
                style={{ maxWidth: "100%" }}
              />
            ) : (
              <span
                className={`flex px-4 py-2 rounded ${
                  message.type === "user"
                    ? "bg-gray-200"
                    : "bg-[#159977] text-white"
                }`}
              >
                {message.text}
              </span>
            )}
            {message.type === "user" && (
              <span className="border rounded-full h-fit w-fit ml-2">
                <FaUser className="text-2xl text-gray-400 rounded-full p-1" />
              </span>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-center mt-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-r-2 border-b-2 border-gray-200"></div>
          </div>
        )}
      </div>
      <div className="p-4 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 border rounded-l p-2 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white rounded-r px-4 py-2 hover:bg-blue-600 focus:outline-none"
        >
          <LuSend className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatDalleBox;
