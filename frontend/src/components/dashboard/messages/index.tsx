import Image from "next/image";

const Messages = () => {
  return (
    <div className="lg:w-[75%] w-full flex items-center justify-center">
      <Image src="/message.png" alt="" width={200} height={200} />
    </div>
  );
};

export default Messages;
