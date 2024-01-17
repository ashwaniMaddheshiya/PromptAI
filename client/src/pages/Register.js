import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { selectToken } from "../reducers/authReducer";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async (data) => {
    let response;
    setIsLoading(true)
    try {
      response = await axios.post("/api/user/register", data);
    } catch (err) {
      toast.error(err.response.data.error);
    }

    setIsLoading(false)

    if (response) {
      toast.success("Confirmation link sent to your mail");
      reset();

      // navigate(`/confirm/${response.data.token}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <header className="text-2xl my-4">Sign Up to your account</header>
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <form>
          <div className="my-3">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              for="name"
            >
              Name
            </label>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be atleast 3 characters",
                },
              }}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Bob Alice"
                  {...field}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
              )}
            />
            {errors.name && (
              <p className="text-sm text-red-500 -mt-2">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="my-3">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              for="email"
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
          </div>

          <div className="my-3">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password should be atlease 8 characters",
                },
              }}
              render={({ field }) => (
                <input
                  type="password"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="*******"
                  {...field}
                />
              )}
            />
            {errors.password && (
              <p className="text-sm text-red-500 -mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit(onFormSubmit)}
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
      <div>
        Already have an account?
        <span className="text-sm  text-blue-800 hover:underline">
          {" "}
          <Link to="/login">Sign In</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
