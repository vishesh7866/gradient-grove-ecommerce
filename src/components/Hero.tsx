
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      
      // Calculate relative position (0 to 1)
      const x = Math.min(Math.max((clientX - left) / width, 0), 1);
      const y = Math.min(Math.max((clientY - top) / height, 0), 1);
      
      // Calculate the translate amount (max 20px in any direction)
      const moveX = (x - 0.5) * 20;
      const moveY = (y - 0.5) * 20;
      
      // Apply the parallax effect to the image using transform
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
    <div ref={heroRef} className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background image with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
          alt="Hero background" 
          className="hero-image w-full h-full object-cover transition-transform duration-200 ease-out scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            <span className="block">Style That</span>
            <span className="bg-gradient-gentle bg-clip-text text-transparent">Resonates</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
            Discover the latest in fashion that speaks to your generation. Bold designs, premium quality, and sustainable practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="btn-pulse text-lg group bg-white text-black hover:bg-white/90">
              <Link to="/products">
                Shop Now
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/collections/new">Explore New Arrivals</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full bg-gradient-gentle opacity-20 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-[10%] left-[5%] w-40 h-40 rounded-full bg-gradient-coral opacity-20 blur-3xl animate-pulse-slow" />
    </div>
  );
};

export default Hero;
