"use client";
import { useEffect, useState } from "react";

// API
import { validateLogin } from "@/utils/api";

// React Push Notification
import addNotification from "react-push-notification";

// Socket
import * as io from "socket.io-client";
const socket = io.connect(process.env.NEXT_PUBLIC_API_URL as string);

const ReceiveNotification = () => {
	const [user, setUser] = useState<userData | null>(null);

	useEffect(() => {
		getUserData();
	}, []);

	// Listen for received messages
	socket.on("receive_notification", (data) => {
		if (data.receiverId == user?._id) {
			addNotification({
				title: data.sender as string,
				message: data.content,
				theme: "darkblue",
				native: true, // when using native, your OS will handle theming.
			});
		}
	});

	const getUserData = async () => {
		try {
			const response = await validateLogin();
			setUser(response);
		} catch (error) {
			setUser(null);
		}
	};

	return <></>;
};

export default ReceiveNotification;
