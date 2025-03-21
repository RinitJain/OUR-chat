import React from "react";

interface ChatBubbleProps {
    sender: string;
    message: string;
    timestamp: string;
    isSender: boolean;
    read?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ sender, message, timestamp, isSender, read }) => {
    return (
        <div className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}>
            {/* Sender Name */}
            <span className="text-xs text-gray-400">{isSender ? "You" : sender}</span>

            {/* Message Bubble */}
            <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow-md text-white ${
                    isSender ? "bg-blue-500" : "bg-gray-700"
                }`}
            >
                {message}
            </div>

            {/* Timestamp & Read Receipt */}
            <div className="text-xs text-gray-400 mt-1">
                {timestamp} {isSender && read ? "✔✔" : ""}
            </div>
        </div>
    );
};

export default ChatBubble;
