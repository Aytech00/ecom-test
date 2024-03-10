"use client";

import React, { FormEvent, useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import { contactSupport } from "@/utils/api";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [name, setName] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !message) {
      toast.error("Please fill empty fields");
      return;
    }
    setIsLoading(true);
    try {
      const res = await contactSupport("/contacts", {
        name: name,
       
        message: message,
      });

    

      if (res.success === true) {
        toast.success(
          "Your equiry/complaint has been received, we will review and respons soon!"
        );
      }
    } catch (error) {
      setIsLoading(false);
    	toast.error((error as any).response.data.error);
    }

    setIsLoading(false);
    setName("");
  
    setMessage("");
  };

  return (
    <div className="container py-10 md:py-14 md:w-[60%]">
      <h2 className="font-semibold text-4xl mb-5">Contact Us</h2>
      <p>
        If you have any issue with your order or seller, please fill the form
        below to reach out to our support team.
      </p>

      <form className="space-y-5 mt-7" onSubmit={handleSubmit}>
        <div>
          <Input
            type="text"
            placeholder="Enter your full name"
            label="Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>

        {/* <div>
          <Input
            type="text"
            placeholder="Enter your registered email"
            label="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div> */}

        <div>
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="w-full h-[170px] border border-gray-300 focus:ring-2 ring-primary  rounded-md py-4 px-4"
            placeholder="Type your message"
          ></textarea>
        </div>

        <div className="">
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            className="w-full"
          >
            Send message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
