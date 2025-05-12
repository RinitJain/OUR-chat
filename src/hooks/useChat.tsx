import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { Message } from "../types";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

const useChat = (userId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [typingIndicator, setTypingIndicator] = useState<boolean>(false);

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();

          return {
            id: doc.id,
            content: data.content,
            senderId: data.senderId,
            type: data.type,
            read: data.read,
            replyTo: data.replyTo || null,
            timestamp:
              data.timestamp instanceof Timestamp
                ? data.timestamp.toMillis()
                : typeof data.timestamp === "number"
                ? data.timestamp
                : Date.now(),
            star: data.star ?? false, // include `star` field
          } as Message;
        }
      );

      setMessages(fetchedMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (
    messageContent: string,
    replyTo?: string,
    type: "text" | "image" | "gif" | "voice" = "text"
  ) => {
    if (!messageContent.trim()) return;

    await addDoc(collection(db, "messages"), {
      content: messageContent,
      senderId: userId,
      type,
      read: false,
      replyTo: replyTo || null,
      timestamp: serverTimestamp(),
      star: false, // default star value
    });
  };

  const toggleStar = async (messageId: string, currentStatus: boolean) => {
    try {
      const messageRef = doc(db, "messages", messageId);
      await updateDoc(messageRef, {
        star: !currentStatus,
      });
    } catch (error) {
      console.error("Error toggling star:", error);
    }
  };

  const handleTyping = () => {
    setTypingIndicator(true);
    setTimeout(() => setTypingIndicator(false), 2000);
  };

  return {
    messages,
    loading,
    sendMessage,
    typingIndicator,
    handleTyping,
    toggleStar,
  };
};

export default useChat;
