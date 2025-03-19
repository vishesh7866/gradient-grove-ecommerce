
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="relative overflow-hidden rounded-full transition-colors hover:bg-transparent dark:hover:bg-transparent"
    >
      <Sun 
        size={18} 
        className={`absolute transition-transform ${
          theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
        } dark:text-white`} 
      />
      <Moon 
        size={18} 
        className={`transition-transform ${
          theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
        }`} 
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
