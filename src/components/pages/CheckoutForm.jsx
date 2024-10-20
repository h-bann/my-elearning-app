import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { selectBasketItems } from "../../redux/basketSlice";
import { url } from "../../config";
import axios from "axios";
import { getFromLocal } from "../../storage";

const stripePromise = loadStripe(
  "pk_test_51Q31JvJwEWdwwvQlwkokBazJBi5jYoBWLr4K2dxlkbYfaSZvOxP4DlAXZ0nbbfkvNyf7rCs3e4sWlY29Jx8bvUDf00RSmLaebu"
);

const CheckoutForm = () => {
  const basketItems = useSelector(selectBasketItems);
  const courseIds = basketItems.map((item) => item.id);

  const fetchClientSecret = useCallback(async () => {
    // creates checkout session
    const response = await axios.post(
      `${url}/payment/createCheckoutSession`,
      { courseIds: courseIds },
      {
        headers: { token: getFromLocal("token") },
      }
    );
    console.log(response);
    return response.data.clientSecret;
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;
