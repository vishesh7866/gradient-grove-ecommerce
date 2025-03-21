
import React from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/data';

interface WishlistButtonProps {
  product: Product;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ 
  product, 
  size = 'icon',
  variant = 'outline',
  className = ''
}) => {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  
  const toggleWishlist = () => {
    if (isWishlisted) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };
  
  return (
    <Button
      size={size}
      variant={variant}
      onClick={toggleWishlist}
      className={`${className} ${isWishlisted ? 'text-red-500 hover:text-red-600' : ''}`}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart 
        size={18} 
        className={isWishlisted ? 'fill-current' : ''} 
      />
      {size !== 'icon' && (
        <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
      )}
    </Button>
  );
};

export default WishlistButton;
