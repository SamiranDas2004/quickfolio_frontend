"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface ChatWidgetProps {
  username: string;
  bio?: string;
  theme?: "dark" | "light" | "purple";
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget({ username, bio, theme = "purple" }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const themeColors = {
    dark: {
      button: "from-blue-600 to-blue-800",
      header: "from-blue-600 to-blue-800",
      userMessage: "from-blue-600 to-blue-800",
      shadow: "blue-500/50",
      ring: "blue-500",
    },
    light: {
      button: "from-gray-800 to-gray-900",
      header: "from-gray-800 to-gray-900",
      userMessage: "from-gray-800 to-gray-900",
      shadow: "gray-500/50",
      ring: "gray-500",
    },
    purple: {
      button: "from-purple-600 to-blue-600",
      header: "from-purple-600 to-blue-600",
      userMessage: "from-purple-600 to-blue-600",
      shadow: "purple-500/50",
      ring: "purple-500",
    },
  };

  const colors = themeColors[theme];

  useEffect(() => {
    if (isOpen && messages.length === 0 && bio) {
      setMessages([{ role: "assistant", content: bio }]);
    }
  }, [isOpen, bio]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.chunk) {
                assistantMessage += data.chunk;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].content = assistantMessage;
                  return newMessages;
                });
              }
            } catch (e) {}
          }
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't process your message. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className="absolute -top-12 right-0 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg px-4 py-2 text-white text-sm font-medium whitespace-nowrap">
            Ask Me
          </div>
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${colors.button} rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity`} />
            <div className={`relative w-16 h-16 bg-gradient-to-r ${colors.button} rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform`}>
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r ${colors.header} p-4 flex items-center justify-between`}>
            <div>
              <h3 className="text-white font-bold text-lg">Ask Me</h3>
              <p className="text-white/80 text-xs">I'm here to help!</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.role === "user"
                      ? `bg-gradient-to-r ${colors.userMessage} text-white`
                      : "bg-white/10 text-white border border-white/20"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-2">
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className={`flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-${colors.ring}`}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`bg-gradient-to-r ${colors.button} rounded-xl px-4 py-2 text-white hover:shadow-lg hover:shadow-${colors.shadow} transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
