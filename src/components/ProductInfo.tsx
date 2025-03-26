
import { Product } from '@/utils/data';
import { Star, Truck, Clock, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes.length > 0 ? product.sizes[0] : '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors.length > 0 ? product.colors[0] : '');
  const [quantity, setQuantity] = useState<number>(1);

  const averageRating = product.reviews.length > 0 
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length 
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    
    toast.success('Product added to cart!');
  };

  return (
    <div>
      <span className="text-sm font-medium text-7erfa-gold uppercase tracking-wider">{product.category}</span>
      <h1 className="text-3xl font-bold text-7erfa-black mt-2 mb-4">{product.name}</h1>
      
      <div className="flex items-center mb-6">
        <div className="flex mr-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star 
              key={index} 
              size={18} 
              className={`${
                index < Math.round(averageRating) 
                  ? 'text-7erfa-gold fill-7erfa-gold' 
                  : 'text-gray-300'
              }`} 
            />
          ))}
        </div>
        <span className="text-7erfa-gray-600">
          {product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'}
        </span>
      </div>
      
      <p className="text-2xl font-bold text-7erfa-black mb-6">${product.price.toFixed(2)}</p>
      
      <p className="text-7erfa-gray-600 mb-8">{product.description}</p>
      
      <div className="mb-6">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-7erfa-black mb-3">Size</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[60px] py-2 px-3 border ${
                  selectedSize === size
                    ? 'border-7erfa-black bg-7erfa-black text-white'
                    : 'border-gray-300 hover:border-7erfa-black text-7erfa-gray-700'
                } transition-all duration-200`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-7erfa-black mb-3">Color</h3>
          <div className="flex flex-wrap gap-3">
            {product.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 border-2 rounded-full flex items-center justify-center ${
                  selectedColor === color
                    ? 'border-7erfa-black'
                    : 'border-transparent'
                } transition-all duration-200`}
                style={{ 
                  backgroundColor: color.toLowerCase(),
                  color: ['White', 'Yellow', 'Beige'].includes(color) ? '#000' : '#fff'
                }}
              >
                {selectedColor === color && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-sm font-medium text-7erfa-black mb-3">Quantity</h3>
          <div className="flex border border-gray-300 w-fit">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 text-7erfa-gray-700 hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 text-7erfa-gray-700 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
        </div>
        
        <button 
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full btn-primary mb-4 ${
            !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
        
        <div className="mt-8 space-y-4">
          <div className="flex items-center text-7erfa-gray-600">
            <Truck size={18} className="mr-3" />
            <span>Free shipping on orders over $100</span>
          </div>
          <div className="flex items-center text-7erfa-gray-600">
            <Clock size={18} className="mr-3" />
            <span>Delivery within 3-5 business days</span>
          </div>
          <div className="flex items-center text-7erfa-gray-600">
            <ShieldCheck size={18} className="mr-3" />
            <span>1 year warranty</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
