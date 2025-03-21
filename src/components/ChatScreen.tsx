import React, { useContext, useState } from "react";
import ChatBubble from "../components/ChatBubble";
import ModeSwitcher from "../components/ModeSwitcher";
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
    const [currentMode, setCurrentMode] = useState("bg-pink-200");

    return (
        <div className={`h-screen flex flex-col ${currentMode}`}>
            {/* Mode Switcher */}
            <ModeSwitcher onModeChange={setCurrentMode} />

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 mt-12 mb-24 space-y-4">
                {messages.map((msg) => {
                    // Handle timestamp conversion (Firebase format & normal timestamps)
                    const timestampDate = 
                        typeof msg.timestamp === "object" && "seconds" in msg.timestamp 
                            ? new Date(msg.timestamp * 1000) 
                            : new Date(msg.timestamp);

                    const formattedTime = timestampDate.toLocaleTimeString("en-US", { 
                        hour: "2-digit", minute: "2-digit", hour12: true 
                    });

                    const formattedDate = timestampDate.toLocaleDateString("en-US", {
                        year: "numeric", month: "short", day: "numeric"
                    });

                    return (
                        <div key={msg.id} className="space-y-1">
                            <ChatBubble
                                message={msg.content}
                                sender={msg.senderId}
                                isSender={msg.senderId === userId}
                                timestamp={formattedTime}
                                read={msg.read}
                            />
                            <div className="text-center text-gray-400 text-xs">{formattedDate}</div>
                        </div>
                    );
                })}
                {typingIndicator && <div className="text-gray-400 text-sm">Typing...</div>}
            </div>

            {/* Chat Input */}
            <ChatInput onSendMessage={sendMessage} />
        </div>
    );
};

export default ChatScreen;
