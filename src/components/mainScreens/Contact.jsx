import React, { useState, useEffect } from "react";
import Input from "../genericComponents/Input";
import Label from "../genericComponents/Label";
import Button from "../genericComponents/Button";
import { useDispatch } from "react-redux";
import { setContactForm } from "../../redux/contactSlice";
import { formValidation } from "../../utils/Joi";
import { contactFormSchema } from "../../utils/Joi";

const Contact = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const [errors, setErrors] = useState("");

  const onInput = (e) => {
    const updatedState = { ...state, [e.target.name]: e.target.value };
    formValidation(updatedState, contactFormSchema, setErrors);
    setState(updatedState);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setContactForm(state));
    e.target.reset();
  };

  return (
    <div className="contactFormContainer">
      <h5>This is a form to contact us with</h5>
      <form className="contactForm" onInput={onInput} onSubmit={onSubmit}>
        <Label htmlFor="name" text="Name" />
        <Input type="text" name="name" />
        {state.name && errors.name ? <p>{errors.name}</p> : undefined}

        <Label htmlFor="email" text="Email" />
        <Input type="text" name="email" />
        {state.email && errors.email ? <p>{errors.email}</p> : undefined}

        <Label htmlFor="message" text="Message" />
        <textarea type="text" name="message"></textarea>
        {!state.message && errors.message ? <p>{errors.message}</p> : undefined}

        <Button
          className="btn btn-outline-primary"
          type="submit"
          text="Submit"
        />
      </form>
    </div>
  );
};

export default Contact;
