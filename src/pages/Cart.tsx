
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/');
      setIsCheckingOut(false);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container-custom flex-grow pt-28 pb-20 flex flex-col items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag size={64} className="mx-auto mb-6 text-7erfa-gray-400" />
            <h1 className="text-2xl font-bold text-7erfa-black mb-4">Your cart is empty</h1>
            <p className="text-7erfa-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button 
              onClick={() => navigate('/products')}
              className="bg-7erfa-black hover:bg-7erfa-black/90 text-white"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container-custom flex-grow pt-28 pb-20">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-7erfa-gray-600 hover:text-7erfa-black transition-colors duration-300"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Shopping
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-4">
            <h1 className="text-2xl font-bold text-7erfa-black mb-6">Shopping Cart</h1>
            
            {cart.map((item, index) => (
              <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="flex flex-col sm:flex-row border-b pb-6 mb-6">
                <div className="sm:w-1/4 mb-4 sm:mb-0">
                  <Link to={`/product/${item.product.id}`}>
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-32 object-cover"
                    />
                  </Link>
                </div>
                
                <div className="sm:w-3/4 sm:pl-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between">
                      <Link to={`/product/${item.product.id}`} className="text-lg font-medium text-7erfa-black hover:underline">
                        {item.product.name}
                      </Link>
                      <span className="font-medium text-7erfa-black">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="mt-2 text-7erfa-gray-600 text-sm space-y-1">
                      <p>Size: {item.selectedSize}</p>
                      <p>Color: {item.selectedColor}</p>
                      <p>Price: ${item.product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-300">
                      <button 
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 text-7erfa-gray-700 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 min-w-[40px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1 text-7erfa-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-7erfa-gray-600 hover:text-red-500 transition-colors flex items-center"
                    >
                      <Trash2 size={18} className="mr-1" />
                      <span className="text-sm">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold text-7erfa-black mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-7erfa-gray-600">Subtotal</span>
                <span className="font-medium">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-7erfa-gray-600">Shipping</span>
                <span className="font-medium">{getCartTotal() > 100 ? 'Free' : '$10.00'}</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">
                  ${(getCartTotal() + (getCartTotal() > 100 ? 0 : 10)).toFixed(2)}
                </span>
              </div>
            </div>
            
            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-7erfa-black hover:bg-7erfa-black/90 text-white py-6"
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </Button>
            
            <p className="text-xs text-7erfa-gray-500 mt-4 text-center">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
