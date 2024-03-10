"use client";

import { useState, useEffect } from "react";
import { getContacts, validateLogin } from "@/utils/api";

import Link from "next/link";
import { useParams } from "next/navigation";

const MessagesSidebar = () => {
  const params = useParams();

  const [user, setUser] = useState<userData | null>();
  const [users, setUsers] = useState<userData[] | null>();

  useEffect(() => {
    getUserData();
    getUsersData();
  }, [user]);

  const getUserData = async () => {
    try {
      const response = await validateLogin();
      setUser(response);
    } catch (error) {
      setUser(null);
    }
  };

  const getUsersData = async () => {
    if (!user) return;
    try {
      let response = await getContacts(user._id);
      setUsers(response);
    } catch (error) {
      setUsers(null);
    }
  };

  return (
    <div className="w-1/4 bg-gray-200 border-r border-gray-300 py-4 px-6 hidden lg:block">
      <div className="flex flex-col space-y-2">
        {users ? (
          <>
            {users.length > 0
              ? users?.map((user: userData, index: number) => (
                  <Link
                    key={index}
                    href={`/dashboard/messages/${user._id}`}
                    className={`py-2 px-3 ${
                      user._id == params.id
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600"
                    } rounded-md font-medium transition hover:bg-primary hover:text-white`}
                  >
                    {user.name}
                  </Link>
                ))
              : "No contacts found"}
          </>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
};

export default MessagesSidebar;
