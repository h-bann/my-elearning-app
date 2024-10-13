import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { url } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Return = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const fetchSessionStatus = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get("session_id");

      const response = await axios.get(
        `${url}/payment/sessionStatus?session_id=${sessionId}`
      );

      if (response.data) {
        setStatus(response.data.status);
        setCustomerEmail(response.data.customer_email);
      }
    };

    fetchSessionStatus();
  }, []);

  if (status === "open") {
    navigate("/checkout");
  }

  if (status === "complete") {
    return (
      <>
        <section id="success">
          <p>
            We appreciate your business! A confirmation email will be sent to{" "}
            {customerEmail}. If you have any questions, please email{" "}
            <a href="mailto:orders@example.com">orders@example.com</a>.
          </p>
        </section>
      </>
    );
  }
  return null;
};

export default Return;
