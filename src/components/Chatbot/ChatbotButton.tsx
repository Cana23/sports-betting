import { Bot } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type ChatbotButtonProps = {
  onClick: () => void;
};

const ChatbotButton = ({ onClick }: ChatbotButtonProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBouncing(true);
      setShowTooltip(true);

      setTimeout(() => {
        setIsBouncing(false);
      }, 1000);

      setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-2 z-50">
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white text-gray-800 px-3 mx-2 py-2 rounded-lg shadow-md relative"
        >
          <div className="absolute right-0 top-1/2 w-3 h-3 bg-white transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
          <span className="text-sm font-medium">¡Chatea conmigo!</span>
        </motion.div>
      )}

      <motion.button
        onClick={onClick}
        className="bg-gradient-to-r from-lime-400 to-green-500 hover:opacity-90 text-black p-4 rounded-full shadow-lg"
        animate={isBouncing ? { y: [0, -10, 0] } : {}}
        transition={{ duration: 0.6 }}
      >
        <Bot className="w-12 h-12" />
      </motion.button>
    </div>
  );
};

export default ChatbotButton;
