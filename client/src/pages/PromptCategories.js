import React from "react";
import PromptCategory from "../components/PromptCategory";

const PromptCategories = () => {
  return (
    <>
      <div className="mx-16 mt-8">
        <div className="my-8 flex flex-col items-start max-w-3xl">
          <h1 className="text-4xl my-4 font-bold text-center">AI Prompts</h1>
          <p className="text-lg font-medium mb-4 text-gray-600">
            Elevate your creative process by exploring a collection of powerful
            AI-generated prompts. Whether you're a writer, designer, or
            developer, these prompts are designed to spark your imagination and
            fuel innovative ideas.
          </p>
        </div>

        <div>
          <div className="text-3xl font-medium my-4">Select Platform</div>
          <hr />
          <PromptCategory />
        </div>
      </div>
    </>
  );
};

export default PromptCategories;
