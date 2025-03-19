
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/data';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X, SlidersHorizontal } from 'lucide-react';
import { Product } from '@/lib/data';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortOption, setSortOption] = useState('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Parse query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    const sortParam = searchParams.get('sort') || 'newest';
    
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory(null);
    }
    
    setSortOption(sortParam);
    
    // Apply filters
    filterProducts(categoryParam, sortParam, priceRange);
  }, [location.search]);

  const filterProducts = (
    category: string | null, 
    sort: string, 
    price: [number, number]
  ) => {
    let result = [...products];
    
    // Filter by category
    if (category) {
      result = result.filter(p => p.category === category);
    }
    
    // Filter by price
    result = result.filter(p => p.price >= price[0] && p.price <= price[1]);
    
    // Sort products
    switch (sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  };

  const handleCategoryClick = (categorySlug: string) => {
    const newCategory = activeCategory === categorySlug ? null : categorySlug;
    updateFilters({ category: newCategory });
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    updateFilters({ sort: value });
  };

  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setPriceRange(newRange);
    filterProducts(activeCategory, sortOption, newRange);
  };

  const updateFilters = (filters: { [key: string]: string | null }) => {
    const searchParams = new URLSearchParams(location.search);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });
    
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200]);
    navigate('/products');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 page-enter">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Products</h1>
          
          <div className="flex items-center gap-4">
            {/* Desktop Sort */}
            <div className="hidden md:block w-48">
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Mobile filter button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden" onClick={() => setIsMobileFilterOpen(true)}>
                  <SlidersHorizontal size={18} className="mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md overflow-auto">
                <div className="h-full py-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Mobile Sort */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Sort By</h4>
                      <Select value={sortOption} onValueChange={handleSortChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="popular">Popular</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Mobile Category filter */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Categories</h4>
                      <div className="space-y-3">
                        {categories.map(category => (
                          <div key={category.id} className="flex items-center">
                            <Checkbox 
                              id={`mobile-category-${category.slug}`}
                              checked={activeCategory === category.slug}
                              onCheckedChange={() => handleCategoryClick(category.slug)}
                            />
                            <label 
                              htmlFor={`mobile-category-${category.slug}`}
                              className="ml-2 text-sm cursor-pointer"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Mobile Price filter */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Price Range</h4>
                      <div className="px-2">
                        <Slider 
                          defaultValue={[priceRange[0], priceRange[1]]}
                          max={200}
                          step={10}
                          onValueChange={handlePriceChange}
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Clear filters button */}
              {(activeCategory || priceRange[0] > 0 || priceRange[1] < 200) && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mb-4 w-full justify-between"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                  <X size={14} />
                </Button>
              )}
              
              {/* Categories */}
              <div>
                <h3 className="text-lg font-medium mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.slug)}
                      className={`block text-left hover:text-primary transition-colors ${
                        activeCategory === category.slug ? 'text-primary font-medium' : ''
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="text-lg font-medium mb-4">Price Range</h3>
                <div className="px-2">
                  <Slider 
                    defaultValue={[priceRange[0], priceRange[1]]}
                    max={200}
                    step={10}
                    onValueChange={handlePriceChange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {/* Active filters */}
            {(activeCategory || priceRange[0] > 0 || priceRange[1] < 200) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {activeCategory && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full py-1 pl-3 pr-1 text-sm">
                    Category: {categories.find(c => c.slug === activeCategory)?.name}
                    <button 
                      onClick={() => updateFilters({ category: null })}
                      className="ml-1 p-1 rounded-full hover:bg-gray-200"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {(priceRange[0] > 0 || priceRange[1] < 200) && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full py-1 pl-3 pr-1 text-sm">
                    Price: ${priceRange[0]} - ${priceRange[1]}
                    <button 
                      onClick={() => {
                        setPriceRange([0, 200]);
                        filterProducts(activeCategory, sortOption, [0, 200]);
                      }}
                      className="ml-1 p-1 rounded-full hover:bg-gray-200"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria.</p>
                <Button onClick={clearAllFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
