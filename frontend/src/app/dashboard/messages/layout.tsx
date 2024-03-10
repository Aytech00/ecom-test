import MessagesSidebar from "@/components/dashboard/messages/sidebar";

const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row h-screen">
      <MessagesSidebar />
      {children}
    </div>
  );
};

export default MessagesLayout;
