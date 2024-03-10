"use client";
import React, { useState } from "react";
import Image from "next/image";
import Input from "../ui/input";
import Button from "../ui/button";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/utils/api";
import { toast } from "react-toastify";

interface userEmailType {
  email: string;
}
const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      return;
    }
    console.log(email);

    try {
      const userEmail: userEmailType = {
        email: email,
      };
      setIsLoading(true);
      const res = await resetPassword(userEmail);

      console.log(res);

      if (res.success === true) {
        toast.success("Check your Email for instructions to proceed...")
      
      }
    } catch (error) {
      toast.error((error as any).res?.data?.error);
    }

    setIsLoading(false);

    // router.push("/user/set-password")
  };
  return (
    <div className="my-20">
      <div className="container">
        <div className="max-w-[450px] w-full mx-auto">
          {/* Logo */}
          <Image
            src="/logo.png"
            width={130}
            height={57}
            alt=""
            className="mx-auto mb-5"
          />

          <div className="bg-white p-5 rounded-md w-full">
            <h1 className="text-2xl font-medium mb-2 text-center">
              Reset password
            </h1>
            <p className="text-center">Enter your email below to proceed</p>

            <form className="space-y-5 mt-7" onSubmit={handleSubmit}>
              <div>
                <Input
                  type="text"
                  placeholder="Enter your email"
                  label="Email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>

              <Button
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Reset
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
