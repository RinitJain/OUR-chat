import React from "react";
import { CornerUpLeft } from "lucide-react";

type ChatBubbleProps = {
    message: string;
    sender: string;
    isSender: boolean;
    timestamp: string;
    onReply: () => void;
    replyTo?: string | null;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({
    message,
    sender,
    isSender,
    timestamp,
    onReply,
    replyTo,
}) => {
    return (
        <div className={`flex items-center ${isSender ? "justify-end" : "justify-start"}`}>
            {/* Reply Button for Sender (LEFT) */}
            {isSender && (
                <button onClick={onReply} className="mr-2 text-gray-400 hover:text-gray-600">
                    <CornerUpLeft size={16} />
                </button>
            )}

            <div
                className={`p-3 rounded-lg max-w-xs shadow-md 
                ${isSender ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}`}
            >
                {/* Display Replied Message */}
                {replyTo && (
                    <div className="text-gray-300 text-xs border-l-4 border-gray-400 pl-2 mb-1">
                        {replyTo}
                    </div>
                )}

                <p>{message}</p>

                {/* Timestamp */}
                <div className="text-xs mt-1 text-gray-200">{timestamp}</div>
            </div>

            {/* Reply Button for Receiver (RIGHT) */}
            {!isSender && (
                <button onClick={onReply} className="ml-2 text-gray-400 hover:text-gray-600">
                    <CornerUpLeft size={16} />
                </button>
            )}
        </div>
    );
};

export default ChatBubble;
