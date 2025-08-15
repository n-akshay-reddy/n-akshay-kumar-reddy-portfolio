import React, { useState } from 'react';
import LeoBot from './LeoBot';
import LeoChat from './LeoChat';

const Leo: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <LeoBot onClick={openChat} isOpen={isChatOpen} />
      <LeoChat isOpen={isChatOpen} onClose={closeChat} />
    </>
  );
};

export default Leo;