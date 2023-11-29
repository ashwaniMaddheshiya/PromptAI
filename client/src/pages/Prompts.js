import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PromptCard from "../components/PromptCard";

const Prompts = () => {
  const [prompts, setPrompts] = useState();
  const [category, setCategory] = useState();
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        response = await axios.get(
          `/api/prompt/all/${categoryId}`
        );
        setPrompts(response.data.completePrompts);
      } catch (err) {
        toast.error("Unable to fetch data, Please try again");
        setPrompts([]); // Set prompts to an empty array if an error occurs
      }
    };

    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `/api/category/${categoryId}`
        );
        setCategory(response.data.response.category);
      } catch (error) {
        toast.error("Something went wrong, Please try again");
        setCategory(null); // Set category to null if an error occurs
      }
    };

    fetchCategory();
    fetchData();
  }, [categoryId]);

  return (
    <>
      <div className="mx-16 mt-8">
        {category && (
          <div className="my-8 flex flex-col items-start max-w-3xl">
            <h1 className="text-4xl my-4 font-bold text-center">
              {category} Prompts
            </h1>
            <p className="text-lg font-medium mb-4 text-gray-600">
              Elevate your creative process by exploring a collection of{" "}
              {category} prompts. Whether you're a writer, designer, or
              developer, these prompts are designed to spark your imagination
              and fuel innovative ideas.
            </p>
          </div>
        )}
        {prompts && prompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prompts.map((prompt) => (
              <PromptCard
                key={prompt.promptId} // Add a unique key for each PromptCard
                name={prompt.name}
                title={prompt.title}
                tags={prompt.tags}
                user={prompt.user}
                promptId={prompt.promptId}
                categoryId={categoryId}
              />
            ))}
          </div>
        ) : (
          <div className="text-3xl text-center">
            {prompts ? "No Prompts Found" : "Loading..."}
          </div>
        )}
      </div>
    </>
  );
};

export default Prompts;
