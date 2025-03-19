
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { getProductById, getRelatedProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Minus, Plus, ShoppingBag, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();

  const product = id ? getProductById(id) : null;
  const relatedProducts = id ? getRelatedProducts(id) : [];
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products" className="text-primary hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    }, quantity);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 page-enter">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/products" className="flex items-center text-sm text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Product Image */}
          <div className="relative">
            {product.isNew && (
              <Badge className="absolute top-4 left-4 z-10 bg-pulse-blue text-white">New</Badge>
            )}
            {product.isBestSeller && (
              <Badge className="absolute top-4 left-[70px] z-10 bg-pulse-coral text-white">Best Seller</Badge>
            )}
            <div className="overflow-hidden rounded-2xl">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">4.0 (24 reviews)</span>
            </div>
            
            <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>
            
            <p className="text-gray-600 mb-8">{product.description}</p>
            
            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : ''
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <h3 className="text-sm font-medium">Size</h3>
                  <button className="text-sm text-primary">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md border ${
                        selectedSize === size 
                          ? 'border-primary bg-primary bg-opacity-10 font-medium' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center border rounded-md">
                <button 
                  onClick={decrementQuantity}
                  className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-3 text-center min-w-[60px]">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <Button 
                className="flex-1 px-8 py-6 gap-2 btn-pulse"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description">
            <TabsList className="mb-6">
              <TabsTrigger value="description">Product Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="text-gray-600 space-y-4">
              <h3 className="text-lg font-medium text-black">Product Details</h3>
              <p>{product.description}</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Premium quality fabric for comfort and durability</li>
                <li>Designed with attention to detail and modern aesthetic</li>
                <li>Versatile piece that adapts to various styles</li>
                <li>Easy to care for and maintain</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="shipping" className="text-gray-600 space-y-4">
              <h3 className="text-lg font-medium text-black">Shipping Information</h3>
              <p>Free standard shipping on all orders over $50. Expedited and international shipping options available at checkout.</p>
              
              <h3 className="text-lg font-medium text-black mt-6">Return Policy</h3>
              <p>We accept returns within 30 days of delivery. Items must be unworn, unwashed, and with original tags attached.</p>
            </TabsContent>
            
            <TabsContent value="reviews" className="text-gray-600">
              <h3 className="text-lg font-medium text-black mb-4">Customer Reviews</h3>
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">Alex T.</span>
                    <span className="ml-auto text-sm text-gray-500">2 weeks ago</span>
                  </div>
                  <p>Absolutely love this piece! The quality is outstanding and the fit is perfect. Will definitely be ordering more from this brand.</p>
                </div>
                
                <div className="border-b pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">Jamie K.</span>
                    <span className="ml-auto text-sm text-gray-500">1 month ago</span>
                  </div>
                  <p>Great design and comfortable to wear. Shipping was faster than expected. Would recommend!</p>
                </div>
                
                <Link to="#" className="text-primary hover:underline">
                  View all 24 reviews
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
