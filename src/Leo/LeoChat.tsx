import React, { useState, useRef, useEffect } from 'react';
import './LeoChat.css';

interface Message {
  id: number;
  text: string;
  sender: 'leo' | 'user';
  timestamp: Date;
}

interface LeoChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeoChat: React.FC<LeoChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 I'm Leo, your portfolio AI assistant. I can tell you everything about this person's skills, experience, education, and projects. What would you like to know?",
      sender: 'leo',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && target.classList.contains('chat-overlay')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close chat on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const addMessage = (text: string, sender: 'leo' | 'user') => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = async () => {
    const message = inputValue.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (replace with your actual AI integration)
    setTimeout(() => {
      const responses = [
        "Great question! Based on the portfolio data, I can tell you that this developer has extensive experience in modern web technologies including React, Node.js, and TypeScript.",
        "Let me share the relevant information from the portfolio. The education background includes a B.Tech in Computer Science with a strong CGPA of 8.7/10.",
        "Here's what I know about the projects: There are several full-stack applications built using React, Node.js, and various databases like MongoDB and PostgreSQL.",
        "According to the portfolio information, the technical skills span across frontend, backend, and database technologies with 3+ years of experience.",
        "The experience includes working as a Software Developer where they developed web applications and led cross-functional teams to deliver projects successfully.",
        "I can see from the portfolio that there's expertise in cloud technologies like AWS, Docker, and Kubernetes for scalable application deployment.",
        "The projects showcase full-stack development capabilities with modern frameworks and best practices in software development.",
        "Based on the portfolio data, this person has experience with both SQL and NoSQL databases, including MongoDB, PostgreSQL, and MySQL."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, 'leo');
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-overlay">
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <img src="robot.png" alt="" style={{width:'40px', height:'40px'}}/>
          <div className="chat-title">
            <h3>Leo - Portfolio AI</h3>
            <p>Ask me anything about the portfolio!</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
          {isTyping && (
            <div className="message leo typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about skills, projects, experience..."
            disabled={isTyping}
            autoFocus={isOpen}
          />
          <button 
            className="send-btn" 
            onClick={sendMessage}
            disabled={isTyping || !inputValue.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeoChat;