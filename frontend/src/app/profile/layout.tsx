"use client";
import { useEffect, useState } from "react";

// Next imports
import { useRouter } from "next/navigation";

// API
import { validateLogin } from "@/utils/api";

import CustomerSidebar from "@/components/customer/sidebar";
import Loader from "@/components/loader";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<userData | null>(null);

  useEffect(() => {
    getUserData();

    async function checkLogin() {
      try {
        const response = await validateLogin();

        setIsLoggedIn(true);
      } catch (error) {
        router.push("/login");
        setIsLoggedIn(false);
      }
    }

    !user && checkLogin();
  }, []);

  const getUserData = async () => {
    try {
      const response = await validateLogin();
      setUser(response);
    } catch (error) {
      setUser(null);
    }
  };
  return isLoggedIn ? (
    <div className="container mt-10">
      <div className="lg:flex gap-10">
        <div className="lg:w-[30%]">
          <CustomerSidebar />
        </div>

        <div className="lg:w-[70%]">{children}</div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default ProfileLayout;
