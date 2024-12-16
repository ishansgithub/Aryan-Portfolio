import React from 'react';
import { motion } from 'framer-motion';

interface TerminalOutputProps {
  output: Array<{ id: string; type: string; content: string }>;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  return (
    <div className="space-y-1">
      {output.map((line) => (
        <motion.div
          key={line.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="font-mono text-sm"
        >
          {line.type === 'error' ? (
            <span className="text-red-500">{line.content}</span>
          ) : line.type === 'success' ? (
            <span className="text-green-500">{line.content}</span>
          ) : line.type === 'system' ? (
            <span className="text-blue-400">{line.content}</span>
          ) : (
            <span className="text-gray-300">{line.content}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default TerminalOutput;