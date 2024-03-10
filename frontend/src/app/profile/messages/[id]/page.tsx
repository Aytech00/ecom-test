"use client";
import { useParams, useSearchParams } from "next/navigation";

import Message from "@/components/customer/messages/message";

const MessagePage = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const message = decodeURI(searchParams.get("message") as string);

  return (
    <Message id={params.id as string} defaultMessage={message as string} />
  );
};

export default MessagePage;
