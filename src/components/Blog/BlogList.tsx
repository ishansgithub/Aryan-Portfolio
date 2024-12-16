import React from 'react';
import { BlogCard } from './BlogCard';

const blogPosts = [
  {
    title: "Advanced Web Security Techniques",
    excerpt: "Exploring modern approaches to securing web applications...",
    date: "2024-03-15",
    category: "Security"
  },
  {
    title: "Blockchain Development Guide",
    excerpt: "A comprehensive guide to building secure smart contracts...",
    date: "2024-03-10",
    category: "Blockchain"
  },
  {
    title: "IoT Security Best Practices",
    excerpt: "Essential security considerations for IoT device development...",
    date: "2024-03-05",
    category: "IoT"
  }
];

export const BlogList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post, index) => (
        <BlogCard
          key={index}
          {...post}
          delay={index * 0.2}
        />
      ))}
    </div>
  );
};