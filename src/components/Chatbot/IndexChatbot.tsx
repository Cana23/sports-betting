import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatbotButton from "./ChatbotButton";
import ChatbotWindow from "./ChatbotWindow";

interface Message {
  role: "user" | "bot";
  content: string;
}

const Chatbot = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // Cargar mensajes guardados al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem("chatbot_messages");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.error("Error cargando mensajes:", e);
      localStorage.removeItem("chatbot_messages");
    }
  }, []);

  // Guardar mensajes en localStorage cada vez que cambien
  useEffect(() => {
    try {
      localStorage.setItem("chatbot_messages", JSON.stringify(messages));
    } catch (e) {
      console.error("Error guardando mensajes:", e);
    }
  }, [messages]);

  const handleClose = () => setVisible(false);
  const handleOpen = () => setVisible(true);

  return (
    <>
      {!visible && <ChatbotButton onClick={handleOpen} />}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-20 right-6 z-50"
          >
            <ChatbotWindow
              onClose={handleClose}
              messages={messages}
              setMessages={setMessages}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
