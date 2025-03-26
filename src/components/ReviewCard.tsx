
import { Star } from 'lucide-react';
import { Review } from '@/utils/data';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={`${
          index < rating 
            ? 'text-7erfa-gold fill-7erfa-gold' 
            : 'text-gray-300'
        }`} 
      />
    ));
  };

  return (
    <div className="bg-white shadow-sm p-6 border border-gray-100 rounded-sm transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex mb-1">
            {renderStars(review.rating)}
          </div>
          <h4 className="font-medium text-7erfa-black">{review.name}</h4>
        </div>
        <span className="text-sm text-gray-500">{review.date}</span>
      </div>
      <p className="text-gray-600">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
