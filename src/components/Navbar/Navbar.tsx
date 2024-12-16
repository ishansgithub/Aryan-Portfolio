import React, { useState } from 'react';
import { Terminal, Shield, BookOpen, Mail, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import MobileMenu from './MobileMenu';
import { NavItem } from './types';

const navItems: NavItem[] = [
  { icon: Terminal, label: 'Home', href: '#' },
  { icon: Shield, label: 'About', href: '#about' },
  { icon: BookOpen, label: 'Blog', href: '#blog' },
  { icon: Mail, label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-b border-green-500/20 z-40"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 font-mono text-xl relative group"
            >
              <span className="relative z-10">./ar</span>
              <motion.div
                className="absolute inset-0 bg-green-500/10 rounded-md -z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
              />
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-green-500 hover:text-green-400 transition-colors flex items-center space-x-2 group"
                  whileHover={{ scale: 1.05 }}
                >
                  <item.icon className="w-4 h-4 group-hover:animate-pulse" />
                  <span className="relative">
                    {item.label}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-green-500 hover:text-green-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={navItems}
      />
    </>
  );
};

export default Navbar;