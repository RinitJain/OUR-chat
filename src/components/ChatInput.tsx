import React, { useState } from "react";
import ReplyPreview from "./ReplyPreview";

interface ChatInputProps {
  onSendMessage: (message: string, replyTo?: string) => void;
  replyMessage: string | null;
  clearReply: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, replyMessage, clearReply }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    onSendMessage(message, replyMessage || undefined);
    setMessage("");
    clearReply();
  };

  return (
    <div className="p-4 bg-gray-800 fixed bottom-0 w-full flex flex-col">
      {replyMessage && <ReplyPreview repliedMessage={replyMessage} onCancel={clearReply} />}
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 p-2 border rounded-lg bg-gray-700 text-white"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="ml-2 p-2 bg-blue-500 text-white rounded">Send</button>
      </div>
    </div>
  );
};

export default ChatInput;