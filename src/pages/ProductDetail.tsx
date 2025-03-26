import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, Product, Review } from '@/utils/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewCard from '@/components/ReviewCard';
import { Star, Check, ArrowLeft, Truck, Clock, ShieldCheck } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [reviewName, setReviewName] = useState<string>('');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const { ref: productRef, isVisible: isProductVisible } = useScrollAnimation();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("ProductDetail component mounted, id:", id);
    
    setLoading(true);
    setError(null);
    
    try {
      const productId = parseInt(id || '0', 10);
      console.log("Looking for product with ID:", productId);
      
      const foundProduct = getProductById(productId);
      console.log("Found product:", foundProduct);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setReviews(foundProduct.reviews);
        if (foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0]);
        }
        if (foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
        setLoading(false);
      } else {
        console.error("Product not found for ID:", productId);
        setError(`Product with ID ${productId} not found`);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error loading product:", err);
      setError("Failed to load product details");
      setLoading(false);
    }
  }, [id, navigate]);

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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast.error('Please fill out all fields');
      return;
    }
    
    const newReview: Review = {
      id: reviews.length + 1,
      name: reviewName,
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewComment,
    };
    
    setReviews([...reviews, newReview]);
    if (product) {
      setProduct({
        ...product,
        reviews: [...product.reviews, newReview],
      });
    }
    
    setReviewName('');
    setReviewComment('');
    setReviewRating(5);
    
    toast.success('Thank you for your review!');
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container-custom pt-28 pb-20 flex justify-center items-center">
          <div className="shimmer w-full max-w-4xl h-64 bg-gray-200 animate-pulse"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container-custom pt-28 pb-20 flex flex-col justify-center items-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <button 
              onClick={() => navigate('/products')}
              className="btn-primary"
            >
              Back to Products
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container-custom pt-28 pb-20 flex justify-center items-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
            <p className="text-gray-700 mb-6">We couldn't find the product you were looking for.</p>
            <button 
              onClick={() => navigate('/products')}
              className="btn-primary"
            >
              Browse Products
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const averageRating = product.reviews.length > 0 
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length 
    : 0;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 pb-20 container-custom">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-7erfa-gray-600 hover:text-7erfa-black mb-8 transition-colors duration-300"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Products
        </button>
        
        <div 
          ref={productRef as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 opacity-0 ${isProductVisible ? 'animate-fadeIn' : ''}`}
        >
          <div className="product-image-wrapper aspect-square">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
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
                      {selectedColor === color && <Check size={16} />}
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
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-7erfa-black mb-8">Customer Reviews</h2>
          
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <p className="text-7erfa-gray-600 mb-8">No reviews yet. Be the first to review this product!</p>
          )}
          
          <div className="max-w-xl mx-auto mt-16">
            <h3 className="text-xl font-bold text-7erfa-black mb-6">Write a Review</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-7erfa-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-7erfa-gold focus:border-7erfa-gold"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-7erfa-gray-700 mb-2">Rating</label>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setReviewRating(index + 1)}
                      className="mr-1"
                    >
                      <Star 
                        size={24} 
                        className={`${
                          index < reviewRating 
                            ? 'text-7erfa-gold fill-7erfa-gold' 
                            : 'text-gray-300'
                        } hover:text-7erfa-gold transition-colors`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="comment" className="block text-7erfa-gray-700 mb-2">Your Review</label>
                <textarea
                  id="comment"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={5}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-7erfa-gold focus:border-7erfa-gold"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
