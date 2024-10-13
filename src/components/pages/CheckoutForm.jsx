import React, { useState, useCallback, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { url } from "../../config";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51Q31JvJwEWdwwvQlwkokBazJBi5jYoBWLr4K2dxlkbYfaSZvOxP4DlAXZ0nbbfkvNyf7rCs3e4sWlY29Jx8bvUDf00RSmLaebu"
);

const CheckoutForm = () => {
  //   const [clientSecret, setClientSecret] = useState("");

  const fetchClientSecret = useCallback(async () => {
    // creates checkout session
    const response = await axios.post(`${url}/payment/createCheckoutSession`);
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
