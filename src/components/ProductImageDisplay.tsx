
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ProductImageDisplayProps {
  image: string;
  name: string;
}

const ProductImageDisplay = ({ image, name }: ProductImageDisplayProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`product-image-wrapper aspect-square opacity-0 ${isVisible ? 'animate-fadeIn' : ''}`}
    >
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ProductImageDisplay;
