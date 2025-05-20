'use client'; // Ensure client-side rendering for Next.js compatibility
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './theme-provider';

export default function Navbar() {
  const { theme, setTheme } = useTheme() || { theme: 'light', setTheme: () => {} }; // Fallback for theme context
  const systemPrefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme =
    theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme;

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debugging log for theme and size verification
  useEffect(() => {
    console.log('Theme:', theme, 'Current Theme:', currentTheme, 'setTheme:', setTheme);
  }, [theme, currentTheme]);

  return (
    <motion.header
      className={`sticky top-0 z-10 backdrop-blur-sm ${
        scrolled ? 'bg-background/80 border-b shadow-sm' : 'bg-transparent'
      } transition-all duration-200`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Database className="w-6 h-6 text-primary" />
          <span className="font-bold text-xl">Terabox Downloader</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
            aria-label={
              currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
            }
            className="h-12 w-12 min-h-[48px] min-w-[48px] flex items-center justify-center"
            style={{ minWidth: '32px', minHeight: '32px' }} // Fallback inline styles
          >
            {currentTheme === 'light' ? (
              <Moon className="h-8 w-8 text-foreground" /> // Increased icon size (32px)
            ) : (
              <Sun className="h-8 w-8 text-foreground" /> // Increased icon size (32px)
            )}
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}