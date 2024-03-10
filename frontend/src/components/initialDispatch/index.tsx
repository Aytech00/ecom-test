"use client";

import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { get } from "@/utils/apiClient";
import { useAuthContx } from "@/store/userContext";

interface dispatchProps {
  children: React.ReactNode;
}

export default function InitialDispatch({ children }: dispatchProps) {
  const { setIsLoggedIn, setUserData } = useAuthContx();

  const getLoggedInUser = () => {
    const res = get("/users/login");

    return res;
  };

  const { data, isError } = useQuery("loggedInUser", getLoggedInUser);

  useEffect(() => {
    if (!data) return;
    const { name, email, role, balance, _id } = data;

    setUserData({
      name,
      role,
      email,
      balance,
      _id,
    });
  }, [data]);

  return <div>{children}</div>;
}
