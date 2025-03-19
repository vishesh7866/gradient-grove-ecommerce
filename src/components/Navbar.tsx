
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        scrolled ? 'navbar-scrolled' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            <span className="bg-gradient-gentle bg-clip-text text-transparent font-bold">Pulse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
              All Products
            </Link>
            <Link to="/products?category=hoodies" className="text-sm font-medium hover:text-primary transition-colors">
              Hoodies
            </Link>
            <Link to="/products?category=t-shirts" className="text-sm font-medium hover:text-primary transition-colors">
              T-Shirts
            </Link>
            <Link to="/products?category=accessories" className="text-sm font-medium hover:text-primary transition-colors">
              Accessories
            </Link>
          </nav>

          {/* Right section: Auth & Cart */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                  <User size={20} />
                  <span className="hidden sm:inline">{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg glass opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link to="/account" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      My Orders
                    </Link>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                <User size={20} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}

            <Link to="/cart" className="relative flex items-center hover:text-primary transition-colors">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <Badge variant="default" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Link>

            {/* Mobile menu button */}
            <button 
              className="md:hidden focus:outline-none" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass animate-fade-in">
          <div className="flex flex-col space-y-4 px-6 py-8">
            <Link to="/products" className="text-base font-medium hover:text-primary transition-colors">
              All Products
            </Link>
            <Link to="/products?category=hoodies" className="text-base font-medium hover:text-primary transition-colors">
              Hoodies
            </Link>
            <Link to="/products?category=t-shirts" className="text-base font-medium hover:text-primary transition-colors">
              T-Shirts
            </Link>
            <Link to="/products?category=accessories" className="text-base font-medium hover:text-primary transition-colors">
              Accessories
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
