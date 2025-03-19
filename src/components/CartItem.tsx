
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType, useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  
  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  return (
    <div className="flex items-start py-4 cart-item-enter">
      {/* Product image */}
      <Link to={`/product/${item.id}`} className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-md mr-4">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </Link>
      
      {/* Product details */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <Link to={`/product/${item.id}`} className="text-base font-medium line-clamp-1 hover:text-primary transition-colors">
            {item.name}
          </Link>
          <button 
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-1"
            aria-label="Remove item"
          >
            <X size={16} />
          </button>
        </div>
        
        {item.size && (
          <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
        )}
        
        {item.color && (
          <p className="text-sm text-gray-500 mt-1">Color: {item.color}</p>
        )}
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center border rounded-full overflow-hidden">
            <button 
              onClick={handleDecrement}
              className="p-1 px-2 hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-2 text-sm min-w-[28px] text-center">{item.quantity}</span>
            <button 
              onClick={handleIncrement}
              className="p-1 px-2 hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          
          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
