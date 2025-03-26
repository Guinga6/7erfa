
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Product } from '@/utils/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  
  const delay = index * 0.1;

  const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
  
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group card-hover opacity-0 ${isVisible ? 'animate-fadeIn' : ''}`}
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="product-image-wrapper aspect-square mb-4 bg-7erfa-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
            loading="lazy"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium px-4 py-2 bg-7erfa-black/80 backdrop-blur-sm">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="px-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-7erfa-black transition-colors duration-300 group-hover:text-7erfa-gold">
              {product.name}
            </h3>
            <span className="text-7erfa-black font-semibold">${product.price.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-7erfa-gray-500">{product.category}</span>
            
            <div className="flex items-center">
              <Star size={14} className="text-7erfa-gold fill-7erfa-gold" />
              <span className="text-sm ml-1">
                {averageRating ? averageRating.toFixed(1) : 'No reviews'}
              </span>
            </div>
          </div>
          
          <div className={`mt-4 flex items-center text-sm text-7erfa-black font-medium transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <span>View Details</span>
            <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
