"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { verifyUser } from "@/utils/api";
import { toast } from "react-toastify";

interface tokenType {
  token: string;
}

export default function Verify() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const token = searchParams.get("jwt");
  console.log(token);

  const verifyToken = async () => {
    try {
      const tokenData: tokenType = {
        token: token  as string,
      };

      const res = await verifyUser(tokenData);
      console.log(res);

      if (res.success === true) {
         toast.success(" Account Successfully Verified!");
        router.push("/login");
      }
    } catch (error) {
      toast.error((error as any).response.data.error);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center px-8 sm:px-8 md:px-4 lg:px-0  h-[75vh]  ">
        <div className=" border  shadow-lg px-5 rounded-md w-full sm:w-full md:w-[40%] lg:w-[40%] py-14">
          {/* <div>
            <AiOutlineMail />
          </div> */}
          <Image
            src="/logo.png"
            width={130}
            height={57}
            alt=""
            className="mx-auto mb-5"
          />
          <div className="text-center mb-10">
            <h5 className=" text-2xl sm:text-2xl md:text-2xl lg:text-3xl text-black font-main font-bold mb-5">
              Verify Email
            </h5>
            <p className="text-black text-sm font-ubuntu leading-loose">
              Please Verify your email by clicking on the link below...
            </p>
          </div>
          <div className="text-center">
            <button
              onClick={verifyToken}
              className="border-0 text-slate-50 bg-primary font-semibold  px-12 rounded-md py-2 "
            >
              Click here
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
