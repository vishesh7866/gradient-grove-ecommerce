
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, Search, ShoppingBag, X, User
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import ThemeToggle from '@/components/ThemeToggle';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    // Add more navigation links as needed
  ];

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'navbar-scrolled py-2' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold font-display tracking-tight">
            PULSE<span className="text-primary">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path}
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  location.pathname === link.path ? 'text-primary' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <button 
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {user ? (
              <div className="relative group">
                <button 
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                  aria-label="Account"
                >
                  <User size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 py-2 bg-card rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Login"
              >
                <User size={20} />
              </Link>
            )}

            <Link 
              to="/cart"
              className="p-2 rounded-full hover:bg-secondary transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-accent text-white text-xs rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80vw] sm:w-[350px]">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-2xl font-bold font-display tracking-tight">
                    PULSE<span className="text-primary">.</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col space-y-4">
                  {navLinks.map(link => (
                    <Link 
                      key={link.path}
                      to={link.path}
                      className="py-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  {!user ? (
                    <div className="pt-4 mt-4 border-t border-border">
                      <Link 
                        to="/login"
                        className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                      >
                        Login
                      </Link>
                      <Link 
                        to="/register"
                        className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                      >
                        Register
                      </Link>
                    </div>
                  ) : (
                    <div className="pt-4 mt-4 border-t border-border">
                      <p className="py-2 text-sm text-muted-foreground">
                        Signed in as {user.name}
                      </p>
                      <button 
                        onClick={logout}
                        className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
