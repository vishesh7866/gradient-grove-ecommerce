
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    }, 1);
  };

  return (
    <div className="group pulse-card product-card">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/5]">
          {/* Product labels */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.isNew && (
              <Badge variant="default" className="bg-pulse-blue text-white">New</Badge>
            )}
            {product.isBestSeller && (
              <Badge variant="default" className="bg-pulse-coral text-white">Best Seller</Badge>
            )}
          </div>
          
          {/* Add to cart button */}
          <button 
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 z-10 p-2 rounded-full bg-black bg-opacity-70 text-white opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
          
          {/* Product image */}
          <img 
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="px-2">
          <h3 className="font-medium text-base mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
