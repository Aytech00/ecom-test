"use client";
import { useParams } from "next/navigation";

import Message from "@/components/dashboard/messages/message";

const MessagePage = () => {
  const params = useParams();
  return <Message id={params.id as string} />;
};

export default MessagePage;
