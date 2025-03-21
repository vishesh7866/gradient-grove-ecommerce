
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronRight, Package, Truck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import confetti from 'canvas-confetti';

const OrderSuccess = () => {
  const { isAuthenticated } = useAuth();
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  
  useEffect(() => {
    // If no items were in cart, redirect to home
    if (items.length === 0) {
      navigate('/');
    } else {
      // Clear the cart after order is complete
      clearCart();
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 page-enter">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          
          <div className="inline-block bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mb-8">
            <span className="text-sm text-gray-600 dark:text-gray-400">Order Number: </span>
            <span className="font-bold">{orderNumber}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button asChild variant="outline">
              <Link to="/">Continue Shopping</Link>
            </Button>
            {isAuthenticated && (
              <Button asChild>
                <Link to="/profile?tab=orders">View Order</Link>
              </Button>
            )}
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Package size={24} className="text-primary" />
                </div>
                <h3 className="font-medium mb-2">Order Processing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your order is being prepared</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Truck size={24} className="text-primary" />
                </div>
                <h3 className="font-medium mb-2">Shipping</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Expected delivery in 3-5 days</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 size={24} className="text-primary" />
                </div>
                <h3 className="font-medium mb-2">Confirmation</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">A receipt has been sent to your email</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-lg font-medium mb-4">What's Next?</h3>
            <ul className="space-y-3 text-left max-w-md mx-auto">
              <li className="flex items-center">
                <ChevronRight size={16} className="text-primary mr-2 flex-shrink-0" />
                <span>You'll receive an email confirmation with your order details</span>
              </li>
              <li className="flex items-center">
                <ChevronRight size={16} className="text-primary mr-2 flex-shrink-0" />
                <span>Once your order ships, you'll receive tracking information</span>
              </li>
              <li className="flex items-center">
                <ChevronRight size={16} className="text-primary mr-2 flex-shrink-0" />
                <span>Sign in to your account to check your order status anytime</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
