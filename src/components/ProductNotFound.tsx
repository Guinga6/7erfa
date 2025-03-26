
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ProductNotFoundProps {
  error?: string | null;
}

const ProductNotFound = ({ error }: ProductNotFoundProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container-custom pt-28 pb-20 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error ? 'Error Loading Product' : 'Product Not Found'}
          </h2>
          <p className="text-gray-700 mb-6">
            {error || "We couldn't find the product you were looking for."}
          </p>
          <button 
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            {error ? 'Back to Products' : 'Browse Products'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductNotFound;
