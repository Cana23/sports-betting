import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatbotButton from "./ChatbotButton";
import ChatbotWindow from "./ChatbotWindow";

const ChatbotContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <ChatbotButton onClick={toggleChatbot} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-20 right-6 z-50"
          >
            <ChatbotWindow onClose={toggleChatbot} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotContainer;
