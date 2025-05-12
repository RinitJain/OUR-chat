import React from "react";
import { CornerUpLeft, Star, StarOff } from "lucide-react";

type ChatBubbleProps = {
    message: string;
    sender: string;
    isSender: boolean;
    timestamp: string;
    onReply: () => void;
    onToggleStar: () => void;
    starred: boolean;
    replyTo?: string | null;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({
    message,
    sender,
    isSender,
    timestamp,
    onReply,
    onToggleStar,
    starred,
    replyTo,
}) => {
    return (
        <div className={`flex items-center ${isSender ? "justify-end" : "justify-start"}`}>
            {/* Left-side controls for sender */}
            {isSender && (
                <div className="flex items-center space-x-1 mr-2">
                    <button onClick={onReply} className="text-gray-400 hover:text-gray-600">
                        <CornerUpLeft size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent the click event from bubbling up
                            e.preventDefault();  // Prevents default behavior (scroll)
                            onToggleStar();
                        }}
                        className="text-yellow-400 hover:text-yellow-600"
                    >
                        {starred ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
                    </button>

                </div>
            )}

            <div
                className={`p-3 rounded-lg max-w-xs shadow-md relative
                ${isSender ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}`}
            >


                {/* Replied message block */}
                {replyTo && (
                    <div className="text-gray-300 text-xs border-l-4 border-gray-400 pl-2 mb-1">
                        {replyTo}
                    </div>
                )}

                <p>{message}</p>

                <div className="text-xs mt-1 text-gray-200">{timestamp}</div>
            </div>

            {/* Right-side controls for receiver */}
            {!isSender && (
                <div className="flex items-center space-x-1 ml-2">
                    <button onClick={onReply} className="text-gray-400 hover:text-gray-600">
                        <CornerUpLeft size={16} />
                    </button>
                    <button onClick={onToggleStar} className="text-yellow-400 hover:text-yellow-600">
                        {starred ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatBubble;
