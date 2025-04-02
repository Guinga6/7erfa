import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const Navbar = () => {
  const { totalItems } = useCart();
  const { t } = useLanguage();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link to="/" className="text-2xl font-bold">
            7erfa
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-600 transition-colors duration-200">{t('home')}</Link>
            <Link to="/products" className="hover:text-gray-600 transition-colors duration-200">{t('products')}</Link>
            <LanguageSwitcher />
            <Link to="/cart" className="relative hover:text-gray-600 transition-colors duration-200">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-1/2 bg-white">
                <div className="flex flex-col h-full justify-between">
                  <div className="py-6">
                    <Link to="/" className="block py-2 hover:text-gray-600 transition-colors duration-200">{t('home')}</Link>
                    <Link to="/products" className="block py-2 hover:text-gray-600 transition-colors duration-200">{t('products')}</Link>
                    <Link to="/cart" className="block py-2 relative hover:text-gray-600 transition-colors duration-200">
                      {t('cart')}
                      {totalItems > 0 && (
                        <Badge className="absolute top-0 left-16 rounded-full px-2 py-0.5 text-xs">
                          {totalItems}
                        </Badge>
                      )}
                    </Link>
                    <LanguageSwitcher />
                  </div>
                  <div className="p-6">
                    <Button variant="outline" asChild>
                      <Link to="/">{t('back_to_home')}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
