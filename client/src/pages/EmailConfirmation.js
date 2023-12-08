import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

const EmailConfirmation = () => {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [confirming, setConfirming] = useState(true);


  const location = useLocation();
  const token = location.pathname.replace('/verifyemail/', '');

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/user/verify/email", { token });
      setVerified(true);
      setConfirming(false);
    } catch (err) {
      setError(true);
      setConfirming(false);
    }
  };

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-[50%] h-32 rounded-md overflow-hidden shadow-lg bg-white flex justify-center items-center">
        {confirming && (
          <div>
            <h2 className="text-2xl font-medium">Confirming Email...</h2>
          </div>
        )}
        {verified && (
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-4">Email Confirmed</h2>
            <Link to="/login">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl font-medium">Token Expired!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmation;
