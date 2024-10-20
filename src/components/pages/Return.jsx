import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { url } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { retrieveJSONFromLocal, getFromLocal } from "../../storage";
import toast, { Toaster } from "react-hot-toast";

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
      console.log(response);
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
    const basketItems = retrieveJSONFromLocal("basketItems");
    basketItems.forEach(async (item) => {
      try {
        const { data: enrolledCourse } = await axios.patch(
          `${url}/courses/enrolled`,
          {
            course_title: item.course_title,
            course_id: item.id,
            image: item.image,
          },
          {
            headers: { token: getFromLocal("token") },
          }
        );
        console.log(enrolledCourse);
        if (enrolledCourse.code === 0) {
          toast.error(`Already enrolled on ${item.course_title}`);
        }
        if (enrolledCourse.code === 1) {
          toast.success(`Enrolled onto ${item.course_title}`);
          // navigate("/my-learning");
        }
      } catch (error) {
        console.error(error);
      }
    });

    return (
      <>
        <section id="success">
          <p>
            We appreciate your business! A confirmation email will be sent to
            {customerEmail}. If you have any questions, please email
            <a href="mailto:orders@example.com">orders@example.com</a>.
          </p>
        </section>
      </>
    );
  }
  return null;
};

export default Return;
