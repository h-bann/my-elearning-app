import React, { useState } from "react";
import Input from "../genericComponents/Input";
import Label from "../genericComponents/Label";
import Button from "../genericComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectContactForm, setContactForm } from "../../redux/contactSlice";
import { formValidation } from "../../utils/Joi";
import { contactFormSchema } from "../../utils/Joi";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "../pages/contact.scss";

const Contact = () => {
  const dispatch = useDispatch();
  const contact = useSelector(selectContactForm);
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
    <div className="contact-form">
      <h3>Contact us</h3>
      <p>
        Please don't hesitate to get in touch with any queries, concerns or
        feedback by filling in the form below
      </p>
      <form className="" onInput={onInput} onSubmit={onSubmit}>
        <div className="">
          <Label htmlFor="name" text="Name" className="form-label" />
          <Input
            type="text"
            name="name"
            className="form-control "
            placeholder="Joe Bloggs"
          />
          {state.name && errors.name ? (
            <p className="form-text">{errors.name}</p>
          ) : undefined}
        </div>

        <div className="mb-3">
          <Label htmlFor="email" text="Email" className="form-label mt-3" />
          <Input
            type="text"
            name="email"
            className="form-control"
            placeholder="email@example.com"
          />
          {state.email && errors.email ? (
            <p className="form-text">{errors.email}</p>
          ) : undefined}
        </div>

        <div className="mb-3">
          <Label htmlFor="message" text="Message" className="form-label mt-3" />
          <textarea
            type="text"
            name="message"
            className="form-control"
            rows="3"
          ></textarea>
          {!state.message && errors.message ? (
            <p className="form-text">{errors.message}</p>
          ) : undefined}
        </div>
        {contact && <p>Message sent!</p>}
        <Button className={["btn-primary"]} type="submit" text="Submit" />
      </form>
    </div>
  );
};

export default Contact;
