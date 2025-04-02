
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shirt, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      
      const x = Math.min(Math.max((clientX - left) / width, 0), 1);
      const y = Math.min(Math.max((clientY - top) / height, 0), 1);
      
      const moveX = (x - 0.5) * 20;
      const moveY = (y - 0.5) * 20;
      
      const imageElement = heroRef.current.querySelector('.hero-image') as HTMLElement;
      if (imageElement) {
        imageElement.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={heroRef} className="relative overflow-hidden min-h-[90vh] flex items-center bg-black text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/lovable-uploads/da415db4-70f4-47dd-acfe-3e212143210d.png" 
          alt="Streetwear Hero Background" 
          className="hero-image w-full h-full object-cover opacity-30 transition-transform duration-200 ease-out scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-6"
        >
          <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-sm">
            New Drop Alert 🔥
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Urban</span>
            <span className="block">Collective</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
            Street-ready fits that speak louder than words. Designed for the bold, crafted for the moment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="btn-pulse text-lg group bg-white text-black hover:bg-white/90">
              <Link to="/products">
                Shop Now
                <Shirt size={18} className="ml-2 group-hover:scale-110 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/collections/new">
                Explore Trends
                <TrendingUp size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 text-center text-xs text-gray-400 animate-pulse">
        Scroll to discover more
      </div>
    </div>
  );
};

export default Hero;
