
import React from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/utils/data';
import { useLanguage } from '@/context/LanguageContext';

const Products = () => {
  const { t } = useLanguage();
  
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">{t('products')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
