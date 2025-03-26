
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-7erfa-black transition-all duration-300">
          7ERFA
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-7erfa-gray-700 hover:text-7erfa-black transition-all duration-300"
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="text-7erfa-gray-700 hover:text-7erfa-black transition-all duration-300"
          >
            Products
          </Link>
          <Link 
            to="/about" 
            className="text-7erfa-gray-700 hover:text-7erfa-black transition-all duration-300"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-7erfa-gray-700 hover:text-7erfa-black transition-all duration-300"
          >
            Contact
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-7erfa-gray-700 hover:text-7erfa-black transition-all duration-300">
            <Search size={20} />
          </button>
          <button className="p-2 text-7erfa-gray-700 hover:text-7erfa-black transition-all duration-300 relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-7erfa-gold text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="p-2 md:hidden text-7erfa-gray-700 hover:text-7erfa-black transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md animate-slideInRight">
          <nav className="flex flex-col p-4 space-y-4">
            <Link 
              to="/" 
              className="text-7erfa-gray-700 hover:text-7erfa-black transition-all duration-300 border-b border-7erfa-gray-200 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-7erfa-gray-700 hover:text-7erfa-black transition-all duration-300 border-b border-7erfa-gray-200 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="text-7erfa-gray-700 hover:text-7erfa-black transition-all duration-300 border-b border-7erfa-gray-200 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-7erfa-gray-700 hover:text-7erfa-black transition-all duration-300 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
