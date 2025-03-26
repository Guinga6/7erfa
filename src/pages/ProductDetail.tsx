
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, Product, Review } from '@/utils/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import ProductImageDisplay from '@/components/ProductImageDisplay';
import ProductInfo from '@/components/ProductInfo';
import ProductReviews from '@/components/ProductReviews';
import ProductPageSkeleton from '@/components/ProductPageSkeleton';
import ProductNotFound from '@/components/ProductNotFound';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
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

  const handleAddReview = (newReview: Review) => {
    if (product) {
      setProduct({
        ...product,
        reviews: [...product.reviews, newReview],
      });
    }
  };

  if (loading) {
    return <ProductPageSkeleton />;
  }

  if (error || !product) {
    return <ProductNotFound error={error} />;
  }

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ProductImageDisplay image={product.image} name={product.name} />
          <ProductInfo product={product} />
        </div>
        
        <ProductReviews 
          initialReviews={product.reviews} 
          onAddReview={handleAddReview} 
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
