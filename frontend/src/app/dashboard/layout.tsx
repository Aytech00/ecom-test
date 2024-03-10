"use client";
import { useEffect, useState } from "react";

// Next imports
import { usePathname, useRouter } from "next/navigation";

// API
import { validateLogin } from "@/utils/api";
import Sidebar from "@/components/layout/dashboard/sidebar";

// Components
import Loader from "@/components/loader";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<userData | null>(null);

  useEffect(() => {
    getUserData();

    async function checkLogin() {
      try {
        
        if (
          user?.role == "customer" &&
          pathname &&
          (pathname.includes("/dashboard") || pathname == "/dashboard")
        ) {
          router.push("/");
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        router.push("/");
      }
    }

    user && checkLogin();
  });

  const getUserData = async () => {
    try {
      const response = await validateLogin();
      setUser(response);
    } catch (error) {
      setUser(null);
    }
  };

  return isLoggedIn ? (
    <div className="flex min-h-screen bg-gray-100">
      <div className="lg:w-64 w-14">
        <Sidebar />
      </div>
      <div
        className={`flex flex-col flex-grow ${
          !pathname?.includes("/messages") && "lg:p-6 p-2"
        }`}
      >
        {children}
      </div>

    </div>
  ) : (
    <Loader />
  );
};

export default AdminLayout;
