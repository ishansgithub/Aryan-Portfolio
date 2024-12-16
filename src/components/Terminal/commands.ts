import { CommandResponse } from './types';
import { scrollToSection } from '../../utils/scrollUtils';

export const commands = {
  help: (): CommandResponse => ({
    type: 'success',
    content: 'Available commands: help, whoami, about, blog, contact, home, clear, navbar, hide',
  }),
  whoami: (): CommandResponse => ({
    type: 'info',
    content: 'Aryan Rohit - Developer, MERN Stack Enthusiast',
  }),
  about: (): CommandResponse => {
    scrollToSection('about');
    return {
      type: 'success',
      content: 'Navigating to About section...',
    };
  },
  blog: (): CommandResponse => {
    scrollToSection('blog');
    return {
      type: 'success',
      content: 'Navigating to Blog section...',
    };
  },
  contact: (): CommandResponse => {
    scrollToSection('contact');
    return {
      type: 'success',
      content: 'Navigating to Contact section...',
    };
  },
  home: (): CommandResponse => {
    scrollToSection('home');
    return {
      type: 'success',
      content: 'Navigating to Home section...',
    };
  },
  hide: (): CommandResponse => {
    document.dispatchEvent(new CustomEvent('hideNavbar'));
    return {
      type: 'success',
      content: 'Navigation hidden',
    };
  },
};