
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Hero = () => {
  const { ref: titleRef, isVisible: isTitleVisible } = useScrollAnimation();
  const { ref: subtitleRef, isVisible: isSubtitleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: ctaRef, isVisible: isCtaVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
      </div>

      {/* Content */}
      <div className="container-custom z-10 flex flex-col items-center text-center">
        <h1 
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 opacity-0 transform translate-y-8 ${
            isTitleVisible ? 'animate-fadeIn' : ''
          }`}
          style={{ animationDelay: '0.2s' }}
        >
          Step Into <span className="text-7erfa-gold">Luxury</span>
        </h1>

        <p 
          ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
          className={`text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 opacity-0 transform translate-y-8 ${
            isSubtitleVisible ? 'animate-fadeIn' : ''
          }`}
          style={{ animationDelay: '0.4s' }}
        >
          Discover premium footwear crafted for those who appreciate quality, style, and exceptional comfort.
        </p>

        <div 
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className={`flex flex-col sm:flex-row items-center gap-4 opacity-0 transform translate-y-8 ${
            isCtaVisible ? 'animate-fadeIn' : ''
          }`}
          style={{ animationDelay: '0.6s' }}
        >
          <Link 
            to="/products" 
            className="btn-primary group flex items-center gap-2 min-w-[180px] justify-center"
          >
            Shop Now 
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a 
            href="#featured" 
            className="text-white underline-offset-4 hover:underline transition-all duration-300"
          >
            View Featured
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70">
        <span className="text-sm mb-2">Scroll</span>
        <div className="w-px h-8 bg-white/40 animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
