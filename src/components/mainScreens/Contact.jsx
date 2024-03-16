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
    const updatedState = { ...state, [e.target.id]: e.target.value };
    setState(updatedState);
  };

  useEffect(() => {
    formValidation(state, contactFormSchema, setErrors);
    console.log(errors);
  }, [state, setErrors]);

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
        <Input type="text" id="name" name="name" />
        {state.name && <p>{errors.name}</p>}

        <Label htmlFor="email" text="Email" />
        <Input type="text" id="email" name="email" />
        {state.email && <p>{errors.email}</p>}

        <Label htmlFor="message" text="Message" />
        <textarea type="text" name="message" id="message"></textarea>
        {!state.message && <p>{errors.message}</p>}

        <Button
          className="submitContactButton button"
          type="submit"
          text="Submit"
        />
      </form>
    </div>
  );
};

export default Contact;
