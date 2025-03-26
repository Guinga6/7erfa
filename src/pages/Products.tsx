
import { useState, useEffect } from 'react';
import { products, Product } from '@/utils/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Filter, ArrowUpDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Products = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { ref: headerRef, isVisible: isHeaderVisible } = useScrollAnimation();

  const categories = ['All', 'Running', 'Casual', 'Formal', 'Hiking', 'Skateboarding'];

  useEffect(() => {
    setAllProducts(products);
    setFilteredProducts(products);
  }, []);

  useEffect(() => {
    let result = [...allProducts];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, sortBy, allProducts]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 pb-20 container-custom">
        <div 
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`mb-12 opacity-0 ${isHeaderVisible ? 'animate-fadeIn' : ''}`}
        >
          <h1 className="text-4xl font-bold text-7erfa-black mb-2">Our Collection</h1>
          <p className="text-7erfa-gray-600 max-w-3xl">Discover our carefully curated selection of premium footwear designed for style, comfort, and durability.</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters for Desktop */}
          <div className="hidden md:block w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-28 border border-gray-200 p-6 rounded-sm">
              <h3 className="font-medium text-7erfa-black mb-4 pb-2 border-b border-gray-200">Categories</h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left py-1 px-2 transition-colors rounded-sm ${
                        selectedCategory === category
                          ? 'bg-7erfa-gold/10 text-7erfa-black font-medium'
                          : 'text-7erfa-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
              
              <h3 className="font-medium text-7erfa-black mt-8 mb-4 pb-2 border-b border-gray-200">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-7erfa-gold focus:border-7erfa-gold"
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
          
          {/* Mobile Filters */}
          <div className="md:hidden mb-6">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 text-7erfa-black px-4 py-2 border border-gray-200 rounded-sm"
              >
                <Filter size={16} />
                Filters
              </button>
              
              <div className="flex items-center gap-2">
                <ArrowUpDown size={16} className="text-7erfa-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-none focus:outline-none text-7erfa-gray-600 bg-transparent"
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>
            
            {isFilterOpen && (
              <div className="p-4 border border-gray-200 rounded-sm mb-4 animate-slideInRight">
                <h3 className="font-medium text-7erfa-black mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterOpen(false);
                      }}
                      className={`py-1 px-3 rounded-full text-sm ${
                        selectedCategory === category
                          ? 'bg-7erfa-black text-white'
                          : 'bg-gray-100 text-7erfa-gray-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Products Grid */}
          <div className="w-full">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-7erfa-gray-600">{filteredProducts.length} products</p>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-7erfa-gray-600">No products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
