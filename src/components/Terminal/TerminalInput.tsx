import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface TerminalInputProps {
  onCommand: (command: string) => void;
  prompt: string;
}

const TerminalInput: React.FC<TerminalInputProps> = ({ onCommand, prompt }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim().toLowerCase());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 relative group">
      <motion.div 
        className="flex items-center space-x-2 text-green-500"
        whileHover={{ scale: 1.02 }}
      >
        <TerminalIcon className="w-4 h-4 animate-pulse" />
        <span className="font-mono">{prompt}</span>
      </motion.div>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-transparent border-none outline-none text-green-500 font-mono caret-green-500 focus:ring-0 focus:outline-none"
        spellCheck="false"
        autoComplete="off"
        aria-label="Terminal input"
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500/20"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />
    </form>
  );
};

export default TerminalInput;