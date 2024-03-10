"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { validateLogin } from "@/utils/api";
import { toast } from "react-toastify";

const links = [
  {
    name: "Profile",
    url: "/profile",
  },
  {
    name: "Orders",
    url: "/profile/orders",
  },
  {
    name: "Messages",
    url: "/profile/messages",
  },
];

const CustomerSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<userData | null>(null);

  useEffect(() => {
    getUserData();
  });

  const getUserData = async () => {
    try {
      const response = await validateLogin();
      setUser(response);
    } catch (error) {
      setUser(null);
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    localStorage.removeItem("token");
    router.push("/");
    toast.success("Logging out...");
  };

  return (
    <div className="bg-white p-5 rounded-md">
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-semibold"> {user?.name}</h1>
        <p className="text-gray-500 font-medium">{user?.email}</p>
      </div>

      <ul className="mt-10 space-y-3">
        {links.map((item, index: number) => (
          <li key={index}>
            <Link
              href={item.url}
              className={`${
                item.url == pathname
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500"
              } p-3 rounded-md w-full block transition hover:bg-primary hover:text-white`}
            >
              {item.name}
            </Link>
          </li>
        ))}

        <li>
          <button
            type="submit"
            onClick={handleLogout}
            className={`bg-gray-100 text-gray-500 p-3 rounded-md w-full block transition hover:bg-primary hover:text-white text-left`}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CustomerSidebar;
