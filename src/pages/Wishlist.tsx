
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, ShoppingCart, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Wishlist = () => {
  const { items, removeItem, totalItems } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 page-enter">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="mb-4 bg-gray-100 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Save items you love for inspiration or future purchases.
            </p>
            <Button asChild className="btn-pulse">
              <Link to="/products">Explore Products</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your wishlist
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  items.forEach(item => addItem({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                  }));
                }}
              >
                <ShoppingCart size={16} className="mr-2" />
                Add All to Cart
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map(item => (
                <Card key={item.id} className="group overflow-hidden border border-border hover:border-primary/50 transition-all">
                  <div className="relative overflow-hidden aspect-square">
                    <Link to={`/product/${item.id}`}>
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    
                    {item.isNew && (
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                        New
                      </Badge>
                    )}
                    
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={16} />
                      <span className="sr-only">Remove from wishlist</span>
                    </Button>
                  </div>
                  
                  <CardContent className="p-4">
                    <Link to={`/product/${item.id}`} className="block hover:text-primary transition-colors">
                      <h3 className="font-medium truncate">{item.name}</h3>
                    </Link>
                    <p className="mt-1 font-semibold">${item.price.toFixed(2)}</p>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      className="w-full"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingBag size={16} className="mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
