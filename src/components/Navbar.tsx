import React, { useState, useEffect } from 'react';
import { Terminal, Shield, BookOpen, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const navItems = [
    { icon: Terminal, label: 'Home', href: '#' },
    { icon: Shield, label: 'About', href: '#about' },
    { icon: BookOpen, label: 'Blog', href: '#blog' },
    { icon: Mail, label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-b border-green-500/20 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-500 font-mono text-xl"
          >
            ./ar
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-green-500 hover:text-green-400 transition-colors flex items-center space-x-2"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;