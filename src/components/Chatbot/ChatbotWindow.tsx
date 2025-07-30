import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "bot";
  content: string;
}

interface Props {
  onClose: () => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatbotWindow = ({ onClose, messages, setMessages }: Props) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDelayMessage, setShowDelayMessage] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  // Guardar mensajes cada vez que cambien
  useEffect(() => {
    try {
      localStorage.setItem("chatbot_messages", JSON.stringify(messages));
    } catch (err) {
      console.error("Error al guardar mensajes:", err);
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Resto del código permanece igual...
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Mostrar mensaje de demora después de 3 segundos
    delayTimeoutRef.current = setTimeout(() => {
      setShowDelayMessage(true);
    }, 3000);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const botMessage: Message = { role: "bot", content: data.respuesta };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "❌ Error al obtener respuesta del asistente." },
      ]);
    } finally {
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
        delayTimeoutRef.current = null;
      }
      setShowDelayMessage(false);
      setIsLoading(false);
    }
  };
  return (
    <div className="w-96 h-[540px] bg-black rounded-xl border-2 border-lime-400 shadow-2xl flex flex-col">
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-lime-400 to-green-500 text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
        <span className="font-semibold">Asistente Barça</span>
        <button onClick={onClose} className="text-white font-bold">✕</button>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm bg-black">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <div className="text-gray-400 text-center p-4">
              <p className="text-xl mb-2">👋 ¡Chatea conmigo!</p>
              <p className="text-sm">Hazme cualquier pregunta y te ayudaré</p>
            </div>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[85%] whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-lime-300 text-gray-900 self-end ml-auto"
                : "bg-gray-300 text-gray-900 self-start mr-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
        
        {isLoading && (
          <div className="p-2 rounded-lg max-w-[85%] bg-gray-300 text-gray-900 self-start mr-auto flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
            Pensando...
          </div>
        )}
        
        {showDelayMessage && (
          <div className="p-2 rounded-lg max-w-[85%] bg-gray-300 text-gray-900 self-start mr-auto text-xs italic">
            Estamos procesando la informacion, espere unos segundos...
          </div>
        )}
        
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-2 border-t flex items-center bg-black">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribe tu pregunta..."
          className="flex-1 px-3 py-1 border border-gray-300 rounded-full text-sm"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="ml-2 bg-gradient-to-r from-lime-400 to-green-500 text-white font-semibold px-4 py-1.5 rounded-full text-sm hover:opacity-90 transition disabled:opacity-70"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
            </div>
          ) : (
            "Enviar"
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatbotWindow;