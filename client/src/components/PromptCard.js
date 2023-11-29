import React,{useState} from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Profile from "./Profile";

const PromptCard = (props) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };
  return (
    <>
      <div className="max-w-xs rounded overflow-hidden shadow-md bg-gradient-to-b from-blue-100 via-blue-300 to-blue-500">
        <Link to="#" onClick={openProfile}>
          <div className="flex items-center p-3 gap-2">
            <span>
              <FaUserCircle size={20} />
            </span>
            <span>{props.name}</span>
          </div>
        </Link>
        <hr className="border-gray-400" />

        <Link to={`/prompt/${props.categoryId}/${props.promptId}`}>
          <div className="px-6 py-4 min-h-[14rem] flex justify-center items-center">
            <p className="font-medium text-gray-700 text-4xl">{props.title}</p>
          </div>
        </Link>

        <hr className="border-gray-600" />
        <div className="px-4 pt-4 pb-2">
          {props.tags.map((tag, index) => (
            <span
              key={index} // Provide a unique key for each tag
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>

         {isProfileOpen && <Profile userId={props.user} onClose={closeProfile}/>}
      </div>
    </>
  );
};

export default PromptCard;
