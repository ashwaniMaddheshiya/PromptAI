import React from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async (data) => {
    try {
      const response = await axios.post("/api/user/checkEmail", data);
      if (response.data.success) {
        toast.success("Update the password by the link sent to your email");
      } else {
        toast.error("Something went wrong, Please try again");
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <header className="text-2xl my-4">Reset Password</header>
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <form>
          <div className="my-3">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                  message: "Invalid email address (use only lowercase letters)",
                },
              }}
              render={({ field }) => (
                <input
                  type="email"
                  placeholder="abcd@gmail.com"
                  {...field}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-500 -mt-2">
                {errors.email.message}
              </p>
            )}

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit(onFormSubmit)}
              >
                Submit
              </button>
              <Link
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                to="/login"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
