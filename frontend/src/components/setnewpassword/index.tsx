"use client";

import React, { useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { handleSetPassword } from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface setPasswordDataType {
  newPassword: string;
  token: string;
}

const SetNewPassword = () => {
  const router = useRouter()
  const [password, setPassword] = useState<string>("");
  // const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const verificationToken = searchParams.get("jwt");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      return;
    }
    setIsLoading(true);
    console.log({
      password, verificationToken
    });

    try {
      const setPasswordPayload: setPasswordDataType = {
        newPassword: password,
        token: verificationToken as string,
      };
      const res = await handleSetPassword(setPasswordPayload);
if(res.success === true){
  toast.success('Password Successfully changed!')
  router.push('/login')
  
}
     
    } catch (error) {
     toast.error((error as any).response.data.error);
    }

    setIsLoading(false);
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
            <h1 className="text-2xl font-medium">Set a new password</h1>

            <form className="space-y-5 mt-7" onSubmit={handleSubmit}>
              <div>
                <Input
                  type="text"
                  placeholder="Enter a new password"
                  label="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              {/* <div>
                <Input
                  type="text"
                  placeholder="Confirm your password"
                  label="Confirm password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                />
              </div> */}

              <Button
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Set password
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
