import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";

const PromptCategory = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get("/api/category/all");
        setCategory(response.data.category);
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong, Please try again");
      }
    };

    fetchCategory();
  }, []);

  return (
    <div className="flex items-center justify-around flex-wrap">
      {category.map((prompt) => (
        <Link to={`/prompt/${prompt._id}`}>
          <div className="w-80 my-4 mx-4 rounded overflow-hidden shadow-lg px-6 py-8 border flex justify-between items-center">
            <div>
              <div className="text-2xl font-medium">{prompt.category}</div>
              <div>Prompts</div>
            </div>
            <div>
              <FaChevronRight size={20} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PromptCategory;
