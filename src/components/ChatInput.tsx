import React, { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return; // Prevent sending empty messages
    onSendMessage(message);
    setMessage(""); // Clear input after sending
  };

  return (
    <div className="p-4 bg-gray-800 fixed bottom-0 w-full flex items-center">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents new line in text area
            handleSend();
          }
        }}
        className="flex-1 p-2 border rounded-lg bg-gray-700 text-white"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSend}
        className="ml-2 p-2 bg-blue-500 text-white rounded"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
