
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductPageSkeleton = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container-custom pt-28 pb-20 flex justify-center items-center">
        <div className="shimmer w-full max-w-4xl h-64 bg-gray-200 animate-pulse"></div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPageSkeleton;
