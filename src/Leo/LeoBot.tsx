import React from 'react';
import './LeoBot.css';

interface LeoBotProps {
  onClick: () => void;
  isOpen: boolean;
}

const LeoBot: React.FC<LeoBotProps> = ({ onClick, isOpen }) => {
  return (
    <div 
      className={`leo-bot ${isOpen ? 'hidden' : ''}`} 
      onClick={onClick}
    >
      <div className="pulse-ring"></div>
      <div className="bot-container">
        <div className="bot-face">
          <div className="bot-eyes">
            <div className="eye"></div>
            <div className="eye"></div>
          </div>
          <div className="bot-smile"></div>
        </div>
      </div>
      <div className="leo-tooltip">Hi! I'm Leo, click to chat!</div>
    </div>
  );
};

export default LeoBot;