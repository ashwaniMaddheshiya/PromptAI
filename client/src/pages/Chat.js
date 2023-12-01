import React from "react";
import AIChatCard from "../components/AIChatCard";
import { SiOpenai } from "react-icons/si";
import ChatGPTBox from "../components/ChatGPTBox";
import ChatDalleBox from "../components/ChatDalleBox";
import { toast } from "react-toastify";

const Chat = () => {
  toast.warning(
    "This is under process yet, more AI-bot will be added very soon"
  );
  return (
    <>
      <div className="my-4">
        <div className="text-center text-3xl font-medium">
          All chat-bot at one place
        </div>
        <div>
          <AIChatCard
            title="ChatGPT"
            logo={<SiOpenai className="text-2xl" />}
            aiBot="ChatGpt-3.5-turbo"
            chatElement={<ChatGPTBox />}
          />
          <AIChatCard
            title="Dall-E"
            logo={<SiOpenai className="text-2xl" />}
            aiBot="Dall-E-3"
            chatElement={<ChatDalleBox />}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
