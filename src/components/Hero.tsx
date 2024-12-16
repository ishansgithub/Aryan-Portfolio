import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-black text-green-500 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_3px,transparent_3px),linear-gradient(to_bottom,#000_3px,transparent_3px)] bg-[size:4rem_4rem] pointer-events-none opacity-20"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.1)_0%,transparent_70%)]"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Terminal className="w-16 h-16 mx-auto mb-8 text-green-500" />
          <motion.h1 
            className="text-4xl md:text-6xl font-mono mb-4 glitch-text relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Aryan rohit
            <motion.span
              className="absolute -inset-0.5 animate-pulse opacity-30"
              style={{ 
                background: 'linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.2), transparent)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite'
              }}
            />
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-2xl font-mono mb-6"
          >
            DEVELOPER, SECURITY RESEARCHER
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="font-mono text-sm md:text-base text-green-400 font-light"
          >
            0x416e642043544620706c6179657221
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;