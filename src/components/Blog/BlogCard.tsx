import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  delay?: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, category, delay = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gray-900 border border-green-500/20 p-6 rounded-lg hover:border-green-500/40 transition-all cursor-pointer group"
    >
      <div className="flex items-center space-x-4 mb-3">
        <div className="flex items-center text-xs text-green-400">
          <Calendar className="w-4 h-4 mr-1" />
          {date}
        </div>
        <div className="flex items-center text-xs text-green-400">
          <Tag className="w-4 h-4 mr-1" />
          {category}
        </div>
      </div>
      <h3 className="text-xl font-mono mb-3 text-green-500 group-hover:text-green-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 mb-4">{excerpt}</p>
      <motion.div
        className="h-0.5 bg-green-500/20 group-hover:bg-green-500/40 transition-colors"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
};