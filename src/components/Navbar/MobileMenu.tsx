import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NavItem } from './types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}

const MobileMenu = ({ isOpen, onClose, items }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm">
            <div className="flex justify-end p-4">
              <button
                onClick={onClose}
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="px-8 py-4">
              {items.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={onClose}
                  className="flex items-center space-x-2 text-green-500 hover:text-green-400 transition-colors py-4 border-b border-green-500/20"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-mono">{item.label}</span>
                </motion.a>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;