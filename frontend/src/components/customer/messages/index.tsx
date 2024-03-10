"use client";

import { useState, useEffect } from "react";
import { getContacts, validateLogin } from "@/utils/api";

import Link from "next/link";
import Loader from "@/components/loader";

const MessagesSidebar = () => {
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
      setUsers([]);
    }
  };

  return users ? (
    <div className="grid grid-cols-3 gap-5 bg-white p-5 rounded-md">
      {users &&
        users.length > 0 &&
        users?.map((user: userData, index: number) => (
          <Link
            key={index}
            href={`/profile/messages/${user._id}`}
            className={`bg-gray-100 p-3 rounded-md break-words`}
          >
            <span className="text-lg block mb-1">{user.name}</span>
            <span className="block text-gray-500">{user.email}</span>
          </Link>
        ))}

      {users.length == 0 && <p>No Chat Found</p>}
    </div>
  ) : (
    <Loader />
  );
};

export default MessagesSidebar;
