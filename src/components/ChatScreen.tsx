import React, { useContext, useState } from "react";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import useChat from "../hooks/useChat";
import { AuthContext } from "../contexts/AuthContext";

const ChatScreen: React.FC = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user } = authContext;
    const userId = user?.uid;
    if (!userId) {
        return <div className="flex justify-center items-center h-screen text-white">Please log in to access chats.</div>;
    }

    const { messages, sendMessage, typingIndicator } = useChat(userId);
    const [replyMessage, setReplyMessage] = useState<string | null>(null);

    return (
        <div className="h-screen flex flex-col bg-pink-200">
            <div className="flex-1 overflow-y-auto p-4 mt-12 mb-24 space-y-4">
                {messages.map((msg) => {
                    const timestampDate =
                        typeof msg.timestamp === "object" && "seconds" in msg.timestamp
                            ? new Date(msg.timestamp * 1000)
                            : new Date(msg.timestamp);

                    const formattedTime = timestampDate.toLocaleTimeString("en-US", {
                        hour: "2-digit", minute: "2-digit", hour12: true
                    });

                    const senderName = msg.senderId.split("@")[0]; // Extract name before '@'

                    return (
                        <ChatBubble
                            key={msg.id}
                            message={msg.content}
                            sender={senderName} // Display only the name
                            isSender={msg.senderId === userId}
                            timestamp={formattedTime}
                            onReply={() => setReplyMessage(msg.content)}
                        />
                    );
                })}
                {typingIndicator && <div className="text-gray-400 text-sm">Typing...</div>}
            </div>
            <ChatInput onSendMessage={sendMessage} replyMessage={replyMessage} clearReply={() => setReplyMessage(null)} />
        </div>
    );
};

export default ChatScreen;
