"use client";
import { useState, useEffect, useRef } from "react";

// Next imports
import Image from "next/image";

// API
import { getMessages, getUser, validateLogin } from "@/utils/api";

// Socket
import * as io from "socket.io-client";
const socket = io.connect(process.env.NEXT_PUBLIC_API_URL as string);

// Icons
import { BsCheckAll } from "react-icons/bs";

// Components
import Loader from "@/components/loader";
import { toast } from "react-toastify";

const Message = ({
  id,
  defaultMessage,
}: {
  id: string;
  defaultMessage: string;
}) => {
  const [user, setUser] = useState<userData | null>(null);
  const [receiver, setReceiver] = useState<userData | null>(null);
  const [messages, setMessages] = useState<messageData[]>([]);
  const [message, setMessage] = useState<string>(defaultMessage);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    getUserData();

    if (user?._id) {
      // Join the chat room
      socket.emit("join", user._id, id);

      // Listen for received messages
      socket.on("receive_message", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      setIsLoaded(true);
    }

    if (!isLoaded) {
      getOldMessages();
      getReceiverData();
    }

    return () => {
      // Clean up event listeners
      socket.off("receive_message");
    };
  }, [user]);

  async function getOldMessages() {
    try {
      const response = await getMessages(user?._id as string, id);

      setMessages(response);
    } catch (error) {
      toast.error((error as any).response.data.error); // Handle error response
    }
  }

  const getUserData = async () => {
    try {
      const response = await validateLogin();
      setUser(response);
    } catch (error) {
      setUser(null);
    }
  };

  const getReceiverData = async () => {
    if (!id) return;

    try {
      const response = await getUser(id);
      setReceiver(response);
    } catch (error) {
      setReceiver(null);
    }
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message !== "") {
      const obj: messageData = {
        sender: user?._id || "",
        receiver: id,
        content: message,
        seen: false,
        date: Date.now,
      };
      socket.emit("send_message", obj);
      setMessage("");
    }
  };

  return isLoaded ? (
    <div className="flex-1 flex flex-col bg-white">
      <div className="bg-gray-900 text-white py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src={receiver?.role == "seller" ? "/support.png" : "/man.png"}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
              width={64}
              height={64}
            />
            <div>
              <p className="font-bold">{receiver?.name}</p>
              <p className="text-sm">{receiver?.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 min-h-[500px] max-h-[500px]">
        <div className="flex flex-col space-y-4">
          {messages.map((item: messageData, index: number) =>
            item.receiver == user?._id ? (
              <div className="flex items-center space-x-2" key={index}>
                {messages[index - 1]?.receiver != item.receiver && (
                  <Image
                    src={
                      receiver?.role == "seller" ? "/support.png" : "/man.png"
                    }
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                    width={64}
                    height={64}
                  />
                )}

                <div
                  className={`bg-gray-200 p-2 rounded-lg ${
                    messages[index - 1]?.receiver == item.receiver &&
                    "ml-[48px]"
                  }`}
                >
                  <p>{item.content}</p>

                  <div className="flex justify-end mt-1">
                    <span className="text-[12px] text-gray-500 mr-1">
                      {new Date(item.date as string).toLocaleString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </span>
                    <BsCheckAll
                      className={`text-lg ${
                        item.seen ? "text-primary" : "text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex items-center justify-end space-x-2"
                key={index}
              >
                <div
                  className={`bg-primary text-white p-2 rounded-lg ${
                    messages[index - 1]?.receiver == item.receiver &&
                    "mr-[48px]"
                  }`}
                >
                  <p>{item.content}</p>

                  <div className="flex justify-end mt-1">
                    <span className="text-[12px] text-gray-500 mr-1">
                      {new Date(item.date as string).toLocaleString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>

                {messages[index - 1]?.receiver != item.receiver && (
                  <Image
                    src={
                      receiver?.role == "seller" ? "/man.png" : "/support.png"
                    }
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                    width={64}
                    height={64}
                  />
                )}
              </div>
            )
          )}
        </div>
        <div ref={lastMessageRef} />
      </div>
      <div className="bg-gray-200 py-4 px-6">
        <form
          className="flex items-center space-x-4"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-white rounded-full py-2 px-4"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Message;
