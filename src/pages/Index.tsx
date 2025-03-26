
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Index;
