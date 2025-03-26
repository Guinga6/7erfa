
import { useEffect, useState } from 'react';
import { getFeaturedProducts, Product } from '@/utils/data';
import ProductCard from './ProductCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { ref: titleRef, isVisible: isTitleVisible } = useScrollAnimation();
  
  useEffect(() => {
    setProducts(getFeaturedProducts());
  }, []);

  return (
    <section id="featured" className="py-20 container-custom">
      <div 
        ref={titleRef as React.RefObject<HTMLDivElement>}
        className={`text-center mb-16 opacity-0 ${isTitleVisible ? 'animate-fadeIn' : ''}`}
      >
        <span className="text-sm font-medium text-7erfa-gold uppercase tracking-wider">Curated Selection</span>
        <h2 className="text-3xl md:text-4xl font-bold text-7erfa-black mt-2">Featured Products</h2>
        <div className="w-16 h-1 bg-7erfa-gold mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
