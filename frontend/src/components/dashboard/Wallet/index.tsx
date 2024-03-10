"use client";

import Button from "@/components/ui/button";
import React, { useState } from "react";
import { get } from "@/utils/apiClient";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import Modal from "@/components/modal";
import Input from "@/components/ui/input";
import Loader from "@/components/loader";
import { requestPayout } from "@/utils/api";

export default function Wallet() {
  const [modalIsActive, setModalIsActive] = useState<boolean>(false);
  const [isPaymentMethod, setIsPaymentMethod] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const getUserData = () => {
    const res = get("/users/login");

    return res;
  };

  const { data, isError, error, isLoading:userIsLoading } = useQuery("userData", getUserData);

  if (userIsLoading) {
   return <Loader />
  }

  if (isError) {
    toast.error("Something went wrong");
  }


  const handleOpenmodal = () => {
    setModalIsActive(true);
  };

  const handleClosemodal = () => {
    setModalIsActive(false);
  };

  const handleSubmitPayout = async (e:React.FormEvent<HTMLFormElement>)=> {
e.preventDefault()
if(!isPaymentMethod){
  toast.error("Please specify your preffered mode of payment...")
  return
}

setIsLoading(true)
try{
   const res = await requestPayout("/payouts", {
    paymentMethod: isPaymentMethod
   } )

   console.log(res);
   toast.success(`${res.success}`)
   
}catch(error){
  setIsLoading(false)
   toast.error((error as any).response.data.error);
 
  
}
setIsLoading(false)

  }

  return (
    <>
      {modalIsActive && (
        <Modal onClick={handleClosemodal}>
          <div className="    md:px-0 min-w-[370px]">
            <form onSubmit={handleSubmitPayout} className="px-4 ">
              <div className="mb-6">
                <h1 className="text-3xl text-white font-semibold">Request a Payout</h1>
              </div>
              <div className="mb-10">
                <label htmlFor="" className="text-white text-lg mb-3 block">
                  Please enter your payment method
                </label>
                <input
                  value={isPaymentMethod}
                  onChange={(e) => setIsPaymentMethod(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 "
                />
              </div>

              <div>
                <Button isLoading={isLoading} type="submit" className="w-full">
                  Submit
                </Button>
              </div>
            </form>''
          </div>
        </Modal>
      )}
      <div className="py-20">
        <div className=" flex flex-col md:flex-row gap-4 justify-center md:items-center">
          <div className="  rounded-md bg-white w-full md:w-[50%] p-5">
            <div className="flex items-center mb-3">
              <span className="text-4xl mr-1">
                <CgProfile />
              </span>
              <h3 className="font-semibold text-2xl ">Welcome</h3>
            </div>
            <p className="mb-2 font-medium">{data?.name}</p>
            <p className=" font-medium">{data?.email}</p>
          </div>

          <div className="bg-white rounded-md w-full md:w-[50%] py-4 px-5">
            <div className="">
              {" "}
              <h3 className="font-medium mb-2 text-[16px] ">
                {" "}
                {data?.date}
              </h3>
            </div>
            <h3 className=" font-medium mb-3 text-lg">
               Total Sales: ${data?.balance}
            </h3>
            {/* <div className="">
              {" "}
              <h3 className="font-semibold mb-2 text-xl">Pending: $0</h3>
            </div> */}

            <Button disabled={isLoading} isLoading={isLoading} onClick={handleOpenmodal}>Request Payment</Button>
          </div>
        </div>
      </div>
    </>
  );
}
