
// Define the structure of our translations
type TranslationKeys = {
  // Navigation
  'home': string;
  'products': string;
  'cart': string;
  'search': string;
  'account': string;
  'language': string;
  
  // Product related
  'add_to_cart': string;
  'buy_now': string;
  'reviews': string;
  'description': string;
  'price': string;
  'quantity': string;
  'total': string;
  'related_products': string;
  'product_details': string;
  'out_of_stock': string;
  'in_stock': string;
  
  // Cart related
  'your_cart': string;
  'checkout': string;
  'continue_shopping': string;
  'empty_cart': string;
  'remove': string;
  'subtotal': string;
  'shipping': string;
  'tax': string;
  'order_total': string;
  
  // Checkout
  'customer_information': string;
  'shipping_information': string;
  'payment_information': string;
  'full_name': string;
  'email': string;
  'phone': string;
  'address': string;
  'city': string;
  'state': string;
  'zip_code': string;
  'country': string;
  'card_number': string;
  'expiry_date': string;
  'cvv': string;
  'place_order': string;
  
  // Misc
  'loading': string;
  'error': string;
  'not_found': string;
  'back_to_home': string;
};

type Translations = {
  en: TranslationKeys;
  ar: TranslationKeys;
};

export const translations: Translations = {
  en: {
    // Navigation
    'home': 'Home',
    'products': 'Products',
    'cart': 'Cart',
    'search': 'Search',
    'account': 'Account',
    'language': 'Language',
    
    // Product related
    'add_to_cart': 'Add to Cart',
    'buy_now': 'Buy Now',
    'reviews': 'Reviews',
    'description': 'Description',
    'price': 'Price',
    'quantity': 'Quantity',
    'total': 'Total',
    'related_products': 'Related Products',
    'product_details': 'Product Details',
    'out_of_stock': 'Out of Stock',
    'in_stock': 'In Stock',
    
    // Cart related
    'your_cart': 'Your Cart',
    'checkout': 'Checkout',
    'continue_shopping': 'Continue Shopping',
    'empty_cart': 'Your cart is empty',
    'remove': 'Remove',
    'subtotal': 'Subtotal',
    'shipping': 'Shipping',
    'tax': 'Tax',
    'order_total': 'Order Total',
    
    // Checkout
    'customer_information': 'Customer Information',
    'shipping_information': 'Shipping Information',
    'payment_information': 'Payment Information',
    'full_name': 'Full Name',
    'email': 'Email',
    'phone': 'Phone',
    'address': 'Address',
    'city': 'City',
    'state': 'State',
    'zip_code': 'Zip Code',
    'country': 'Country',
    'card_number': 'Card Number',
    'expiry_date': 'Expiry Date',
    'cvv': 'CVV',
    'place_order': 'Place Order',
    
    // Misc
    'loading': 'Loading...',
    'error': 'Something went wrong',
    'not_found': 'Page not found',
    'back_to_home': 'Back to Home',
  },
  ar: {
    // Navigation
    'home': 'الرئيسية',
    'products': 'المنتجات',
    'cart': 'سلة التسوق',
    'search': 'بحث',
    'account': 'الحساب',
    'language': 'اللغة',
    
    // Product related
    'add_to_cart': 'أضف إلى السلة',
    'buy_now': 'اشتر الآن',
    'reviews': 'المراجعات',
    'description': 'الوصف',
    'price': 'السعر',
    'quantity': 'الكمية',
    'total': 'المجموع',
    'related_products': 'منتجات ذات صلة',
    'product_details': 'تفاصيل المنتج',
    'out_of_stock': 'نفذت الكمية',
    'in_stock': 'متوفر',
    
    // Cart related
    'your_cart': 'سلة التسوق الخاصة بك',
    'checkout': 'إتمام الشراء',
    'continue_shopping': 'مواصلة التسوق',
    'empty_cart': 'سلة التسوق فارغة',
    'remove': 'إزالة',
    'subtotal': 'المجموع الفرعي',
    'shipping': 'الشحن',
    'tax': 'الضريبة',
    'order_total': 'إجمالي الطلب',
    
    // Checkout
    'customer_information': 'معلومات العميل',
    'shipping_information': 'معلومات الشحن',
    'payment_information': 'معلومات الدفع',
    'full_name': 'الاسم الكامل',
    'email': 'البريد الإلكتروني',
    'phone': 'الهاتف',
    'address': 'العنوان',
    'city': 'المدينة',
    'state': 'الولاية',
    'zip_code': 'الرمز البريدي',
    'country': 'البلد',
    'card_number': 'رقم البطاقة',
    'expiry_date': 'تاريخ انتهاء الصلاحية',
    'cvv': 'رمز التحقق',
    'place_order': 'تأكيد الطلب',
    
    // Misc
    'loading': 'جاري التحميل...',
    'error': 'حدث خطأ ما',
    'not_found': 'الصفحة غير موجودة',
    'back_to_home': 'العودة إلى الرئيسية',
  }
};
