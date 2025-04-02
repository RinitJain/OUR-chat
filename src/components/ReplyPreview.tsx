import React from "react";

interface ReplyPreviewProps {
  repliedMessage: string;
  onCancel: () => void;
}

const ReplyPreview: React.FC<ReplyPreviewProps> = ({ repliedMessage, onCancel }) => {
  return (
    <div className="flex items-center bg-gray-700 p-2 rounded-lg mb-2">
      <div className="flex-1 text-sm text-gray-300 truncate">Replying to: {repliedMessage}</div>
      <button onClick={onCancel} className="ml-2 text-red-400 text-sm">❌</button>
    </div>
  );
};

export default ReplyPreview;