
import { Review } from '@/utils/data';
import ReviewCard from './ReviewCard';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface ProductReviewsProps {
  initialReviews: Review[];
  onAddReview: (newReview: Review) => void;
}

const ProductReviews = ({ initialReviews, onAddReview }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [reviewName, setReviewName] = useState<string>('');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast.error('Please fill out all fields');
      return;
    }
    
    const newReview: Review = {
      id: reviews.length + 1,
      name: reviewName,
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewComment,
    };
    
    setReviews([...reviews, newReview]);
    onAddReview(newReview);
    
    setReviewName('');
    setReviewComment('');
    setReviewRating(5);
    
    toast.success('Thank you for your review!');
  };

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-7erfa-black mb-8">Customer Reviews</h2>
      
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-7erfa-gray-600 mb-8">No reviews yet. Be the first to review this product!</p>
      )}
      
      <div className="max-w-xl mx-auto mt-16">
        <h3 className="text-xl font-bold text-7erfa-black mb-6">Write a Review</h3>
        <form onSubmit={handleSubmitReview}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-7erfa-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-7erfa-gold focus:border-7erfa-gold"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-7erfa-gray-700 mb-2">Rating</label>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setReviewRating(index + 1)}
                  className="mr-1"
                >
                  <Star 
                    size={24} 
                    className={`${
                      index < reviewRating 
                        ? 'text-7erfa-gold fill-7erfa-gold' 
                        : 'text-gray-300'
                    } hover:text-7erfa-gold transition-colors`} 
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="comment" className="block text-7erfa-gray-700 mb-2">Your Review</label>
            <textarea
              id="comment"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={5}
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-7erfa-gold focus:border-7erfa-gold"
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductReviews;
