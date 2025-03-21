
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Lock, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

const Cart = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to proceed to checkout", {
        description: "You need to be logged in to complete your purchase",
        action: {
          label: "Login",
          onClick: () => navigate("/login?redirect=checkout")
        }
      });
      return;
    }
    
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 page-enter">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="mb-4 bg-gray-100 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild className="btn-pulse">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium">Items ({totalItems})</h2>
                  <button 
                    onClick={clearCart}
                    className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
                
                <div className="divide-y">
                  {items.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full gap-2 btn-pulse"
                  onClick={handleCheckout}
                >
                  <Lock size={16} />
                  Proceed to Checkout
                </Button>
                
                {/* Trust Badges */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle2 size={16} className="text-green-500 dark:text-green-400 mr-2" />
                    Free shipping on orders over $50
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle2 size={16} className="text-green-500 dark:text-green-400 mr-2" />
                    30-day easy returns
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle2 size={16} className="text-green-500 dark:text-green-400 mr-2" />
                    Secure checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
