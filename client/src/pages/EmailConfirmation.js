import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EmailConfirmation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/confirm/${token}`
        );
        const { success, redirectUrl } = response.data;

        if (success) {
          toast.success("Email Confirmed");
          setIsLoading(false);
          if (redirectUrl) {
            navigate(redirectUrl);
          }
        } else {
          toast.error("Error Confirming email, Please try again");
          setIsLoading(false);
        }
      } catch (err) {
        toast.error("Something went wrong, Please try again");
        setIsLoading(false);
      }
    };

    confirmEmail();
  }, [token, navigate]);

  return (
    <>
      {isLoading && (
        <div className="w-1/2 border shadow-md bg-white h-32 flex justify-center items-center rounded-md mx-auto my-8">
          <p className="text-3xl font-medium">Confirming Email...Please Wait</p>
        </div>
      )}
      {!isLoading && (
        <div className="w-1/2 border shadow-md bg-white h-32 flex justify-center items-center rounded-md mx-auto my-8">
          <p className="text-3xl font-medium">
            Email Confirmed. Redirecting...
          </p>
        </div>
      )}
    </>
  );
};

export default EmailConfirmation;
