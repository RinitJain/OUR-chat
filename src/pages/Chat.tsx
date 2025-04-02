import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";

const Chat: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [replyMessage, setReplyMessage] = useState<any | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (user === undefined) return;
    if (!user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;

    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => {
        const data = doc.data();
        const timestamp = data.timestamp?.seconds 
          ? new Date(data.timestamp.seconds * 1000) 
          : null;
        
        return {
          id: doc.id,
          sender: data.sender,
          message: data.text,
          replyTo: data.replyTo || null,
          timestamp: timestamp
            ? timestamp.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' }) + 
              " " + timestamp.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }) 
            : "N/A"
        };
      }));
    });

    return () => {
      setMessages([]); // 🔹 Ensuring unmount cleanup
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string, replyTo?: string) => {
    if (!user || !text.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        sender: user.displayName || user.email,
        text: text.trim(),
        replyTo: replyTo || null,
        timestamp: serverTimestamp(),
      });
      setReplyMessage(null); // Clear reply state after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* 🔹 Chat Header */}
      <div className="w-full py-3 px-4 flex justify-between items-center bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-10">
        <h1 className="text-lg font-semibold">{user?.displayName || "Chat"}</h1>
        <button onClick={logout} className="text-red-500 text-sm">Logout</button>
      </div>

      {/* 🔹 Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 mt-12 mb-16 space-y-4">
        {messages.length > 0 ? (
          messages.map((msg) => {
            const repliedMessage = messages.find(m => m.id === msg.replyTo);
            return (
              <div key={msg.id}>
                {repliedMessage && (
                  <div className="ml-6 mb-1 p-2 border-l-4 border-gray-500 text-gray-400 text-sm">
                    {repliedMessage.sender}: {repliedMessage.message}
                  </div>
                )}
                <ChatBubble
                  sender={msg.sender}
                  message={msg.message}
                  timestamp={msg.timestamp}
                  isSender={msg.sender === (user?.displayName || user?.email)}
                  onReply={() => setReplyMessage(msg)}
                />
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-400">No messages yet.</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 🔹 Chat Input */}
      <ChatInput 
        onSendMessage={(text) => sendMessage(text, replyMessage?.id)}
        replyMessage={replyMessage?.message} 
        clearReply={() => setReplyMessage(null)} 
      />
    </div>
  );
};

export default Chat;
