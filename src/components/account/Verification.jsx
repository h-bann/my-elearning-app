import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { url } from "../../config";

const Verification = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    console.log(token);
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${url}/verification/verify-email?token=${token}`
        );
        console.log(response);

        setMessage(response.data.message);
      } catch (error) {
        setMessage("Verification Failed");
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [searchParams]);

  return (
    <>
      <div>
        <h2>Email verification</h2>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default Verification;
