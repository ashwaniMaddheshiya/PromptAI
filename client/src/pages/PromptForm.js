import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { selectUserInfo } from "../reducers/authReducer";

const PromptForm = () => {
  const user = useSelector(selectUserInfo);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await axios.get(
        "/api/category/all"
      );
      setCategory(response.data.category);
    };

    fetchCategory();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onFormSubmit = async (data) => {
    let response;

    try {
      response = await axios.post("/api/prompt/new", {
        ...data,
        ...user,
      });
    } catch (err) {
      toast.error(err.response.data.error);
    }

    if (response) {
      toast.success("Prompt Added!");
      reset();
    }
  };

  return (
    <div className="container mx-auto my-8">
      <header className="text-2xl text-center my-8 font-medium">
        Create New Prompt
      </header>
      <div className="lg:w-2/3 md:w-3/4 sm:w-full mx-auto">
        <form>
          <div className="my-3">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <select
                  {...field}
                  className={`block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline ${
                    errors.category ? "border-red-500" : ""
                  }`}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {category.map((opt) => (
                    <option value={opt._id}>{opt.category}</option>
                  ))}
                  {/* Add more options as needed */}
                </select>
              )}
            />
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div className="my-3">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Generate a workout"
                  {...field}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.title ? "border-red-500" : ""
                  }`}
                />
              )}
            />
            {errors.title && (
              <p className="text-sm text-red-500 -mt-2">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="my-3">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="prompt"
            >
              Prompt
            </label>
            <Controller
              name="prompt"
              control={control}
              defaultValue=""
              rules={{ required: "Prompt is required" }}
              render={({ field }) => (
                <textarea
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.prompt ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your prompt here..."
                  rows={10}
                  {...field}
                />
              )}
            />
            {errors.prompt && (
              <p className="text-sm text-red-500 -mt-2">
                {errors.prompt.message}
              </p>
            )}
          </div>

          <div className="my-3">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="tags"
            >
              Tags
            </label>
            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              rules={{ required: "Tags are required" }}
              render={({ field }) => (
                <TagsInput
                  {...field}
                  inputProps={{ placeholder: "Add tags" }}
                />
              )}
            />
            {errors.tags && (
              <p className="text-sm text-red-500">{errors.tags.message}</p>
            )}
          </div>

          <div className="flex items-center justify-center mt-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit(onFormSubmit)}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptForm;
