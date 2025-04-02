
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { saveOrder } from '@/lib/supabase';

// Define the schema for customer information
const orderFormSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters' }),
  zipCode: z.string().min(5, { message: 'Zip code must be at least 5 characters' }),
  country: z.string().min(2, { message: 'Country must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 characters' }),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  
  // Setup the form
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      country: '',
      phone: '',
    },
  });

  const handleSubmitOrder = async (data: OrderFormValues) => {
    setIsCheckingOut(true);
    
    try {
      // Create an order object combining cart items and customer info
      const orderDetails = {
        customer_name: data.fullName,
        customer_email: data.email,
        customer_address: data.address,
        customer_city: data.city,
        customer_zip: data.zipCode,
        customer_country: data.country,
        customer_phone: data.phone,
        order_items: cart,
        order_total: getCartTotal() + (getCartTotal() > 100 ? 0 : 10),
        status: 'pending' as const,
      };
      
      // Save order to Supabase
      await saveOrder(orderDetails);
      
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error saving order:', error);
      toast.error('There was a problem processing your order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleInitiateCheckout = () => {
    setShowOrderForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            onClick={() => {
              if (showOrderForm) {
                setShowOrderForm(false);
              } else {
                navigate(-1);
              }
            }}
            className="flex items-center text-7erfa-gray-600 hover:text-7erfa-black transition-colors duration-300"
          >
            <ArrowLeft size={16} className="mr-2" />
            {showOrderForm ? 'Back to Cart' : 'Back to Shopping'}
          </button>
        </div>
        
        {showOrderForm ? (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-7erfa-black mb-6">Complete Your Order</h1>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="font-semibold mb-2">Order Summary</h2>
              <div className="text-sm text-gray-600">
                <p>{cart.reduce((count, item) => count + item.quantity, 0)} items</p>
                <p className="font-medium text-black">Total: ${(getCartTotal() + (getCartTotal() > 100 ? 0 : 10)).toFixed(2)}</p>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitOrder)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, Apt 4B" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="United States" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-7erfa-black hover:bg-7erfa-black/90 text-white py-6 mt-6"
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Processing...' : 'Place Order'}
                </Button>
              </form>
            </Form>
          </div>
        ) : (
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
                onClick={handleInitiateCheckout}
                className="w-full bg-7erfa-black hover:bg-7erfa-black/90 text-white py-6 flex items-center justify-center"
              >
                Proceed to Checkout <ChevronRight size={16} className="ml-1" />
              </Button>
              
              <p className="text-xs text-7erfa-gray-500 mt-4 text-center">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
