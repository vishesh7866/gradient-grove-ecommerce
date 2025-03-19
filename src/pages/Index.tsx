
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getFeaturedProducts, getNewProducts, getBestSellers, categories } from '@/lib/data';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();
  const bestSellers = getBestSellers();

  return (
    <div className="min-h-screen page-enter">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary flex items-center group">
              View All
              <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map(category => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.slug}`}
                className="relative group overflow-hidden rounded-xl aspect-[3/2]"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Link to="/products?filter=new" className="text-primary flex items-center group">
              View All
              <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Banner Section */}
      <section className="relative overflow-hidden py-32 px-6">
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
            alt="Promo background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container mx-auto relative z-10 text-center text-white">
          <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium mb-4">
            Limited Time Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Summer Collection
            <span className="block text-2xl md:text-3xl mt-2 text-pulse-coral">Up to 40% Off</span>
          </h2>
          <p className="max-w-md mx-auto mb-8 text-gray-200">
            Explore our curated summer essentials with exclusive discounts for a limited time only.
          </p>
          <Button asChild className="btn-pulse bg-white text-black hover:bg-white/90">
            <Link to="/products?collection=summer">Shop Now</Link>
          </Button>
        </div>
      </section>
      
      {/* Best Sellers Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-3xl font-bold">Best Sellers</h2>
            <Link to="/products?sort=popular" className="text-primary flex items-center group">
              View All
              <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-3xl text-center">
          <span className="inline-block px-3 py-1 bg-pulse-mint text-gray-800 rounded-full text-sm font-medium mb-4">
            Stay Updated
          </span>
          <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Be the first to know about new collections, exclusive offers, and fashion trends.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 rounded-full border-gray-300 px-4 py-3 focus:border-primary focus:ring-primary"
              required
            />
            <Button type="submit" className="rounded-full">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
