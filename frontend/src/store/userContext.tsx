"use client"


import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<any>(null);

interface authProps {
  children: React.ReactNode;
}

interface userData {
  email: string;
  name: string;
  role: string;
  balance: number;
  _id: string
}

export const UserContextProvider = ({ children }: authProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<userData | null>(null);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
   userData,
    setUserData,
  };
  

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuthContx = () => {
  return useContext(UserContext);
};
