
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useApp } from '../App';
import { ChevronUp, ChevronDown, Leaf, Info, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const MenuPage: React.FC = () => {
  const { menu } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');
  
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Featured items for the carousel (items with images)
  const featuredItems = useMemo(() => {
    return menu.filter(item => item.image && item.image.length > 0).slice(0, 6);
  }, [menu]);

  const categories = ['All', 'Starters', 'Mains', 'Sides', 'Desserts', 'Drinks'];

  const parsePrice = (priceStr: string): number => {
    const match = priceStr.match(/\$(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const filteredAndSortedMenu = useMemo(() => {
    let result = activeCategory === 'All' 
      ? [...menu] 
      : menu.filter(item => item.category === activeCategory);

    if (sortOrder !== 'none') {
      result.sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }
    return result;
  }, [menu, activeCategory, sortOrder]);

  const toggleSort = () => {
    if (sortOrder === 'none') setSortOrder('asc');
    else if (sortOrder === 'asc') setSortOrder('desc');
    else setSortOrder('none');
  };

  // Carousel Navigation
  const nextSlide = useCallback(() => {
    if (isAnimating || featuredItems.length <= 1) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, featuredItems.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating || featuredItems.length <= 1) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, featuredItems.length]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="animate-in fade-in duration-700 min-h-screen bg-navy text-sand">
      {/* Featured Dishes Carousel Section */}
      {featuredItems.length > 0 && (
        <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-navy-light group">
          <div className="absolute inset-0 z-0">
            {featuredItems.map((item, idx) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                  idx === currentSlide 
                    ? 'opacity-100 scale-100 translate-x-0' 
                    : 'opacity-0 scale-110'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-transparent to-navy z-10" />
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 px-4 text-center">
                  <div className={`transition-all duration-700 delay-300 transform ${
                    idx === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}>
                    <span className="text-teal text-[10px] uppercase tracking-[0.4em] font-bold mb-3 block">Featured Presentation</span>
                    <h2 className="text-4xl md:text-6xl font-normal font-bodoni italic text-white mb-4 drop-shadow-2xl">{item.name}</h2>
                    <p className="text-sand/70 max-w-xl mx-auto italic font-lora text-sm md:text-base mb-2">{item.description}</p>
                    <span className="text-teal font-bold text-xl">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-4 md:px-12 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button 
              onClick={prevSlide}
              className="pointer-events-auto p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-sand hover:bg-teal hover:text-navy transition-all transform hover:scale-110 active:scale-90"
              aria-label="Previous featured dish"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="pointer-events-auto p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-sand hover:bg-teal hover:text-navy transition-all transform hover:scale-110 active:scale-90"
              aria-label="Next featured dish"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
            {featuredItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentSlide(idx);
                    setTimeout(() => setIsAnimating(false), 800);
                  }
                }}
                className={`h-1 transition-all duration-500 rounded-full ${
                  idx === currentSlide ? 'w-12 bg-teal shadow-[0_0_10px_#1ba098]' : 'w-4 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Subtle Label */}
          <div className="absolute top-10 right-10 z-30 hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Camera size={14} className="text-teal" />
            <span>Seasonal Gallery</span>
          </div>
        </section>
      )}

      <section className="py-20 border-b border-teal/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 font-lora uppercase tracking-tighter text-teal drop-shadow-[0_0_15px_rgba(27,160,152,0.4)]">The Menu</h1>
          <p className="text-sand opacity-70 mb-12 italic text-lg max-w-2xl mx-auto">Sourced daily from the coast. Prepared with precision. Served with New York energy.</p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all pb-2 border-b-2 ${
                  activeCategory === cat ? 'border-teal text-teal' : 'border-transparent text-sand opacity-50 hover:opacity-100 hover:text-teal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button 
              onClick={toggleSort}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-teal border border-teal/30 px-4 py-2 rounded-full hover:bg-teal/10 transition-all"
            >
              Price {sortOrder === 'none' ? '' : sortOrder === 'asc' ? '(Low to High)' : '(High to Low)'}
              {sortOrder === 'none' ? null : sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 items-stretch">
            {filteredAndSortedMenu.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-6 group p-6 rounded-2xl hover:bg-navy-light transition-all duration-500 border border-teal/10 hover:border-teal/40 h-full">
                <div className="flex-shrink-0 w-full sm:w-32 h-40 sm:h-32 rounded-xl overflow-hidden bg-navy-light shadow-sm border border-teal/20 group-hover:shadow-[0_10px_30px_rgba(27,160,152,0.3)] transition-all duration-700">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                </div>

                <div className="flex-grow flex flex-col">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-lg font-bold font-bodoni text-white group-hover:text-teal transition-colors duration-300 leading-snug">
                      {item.name}
                    </h3>
                    <div className="flex-grow border-b border-dotted border-teal/20 min-w-[20px] mb-1"></div>
                    <span className="font-bold text-teal text-base whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>

                  <div className="flex-grow">
                    <p className="text-sm text-sand opacity-60 leading-relaxed italic mb-4">
                      {item.description}
                    </p>
                  </div>
                  
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex gap-2 mt-auto pt-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-bold px-2 py-0.5 rounded-full border border-teal/30 text-teal uppercase tracking-tighter bg-navy/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredAndSortedMenu.length === 0 && (
            <div className="text-center py-20 text-sand opacity-40">
              <p className="text-xl italic font-serif">The sea is quiet today... No items found in this category.</p>
            </div>
          )}

          <div className="mt-24 p-12 bg-navy-light rounded-[40px] border border-teal/10 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Leaf size={120} className="text-teal" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <Info size={32} className="text-teal" />
              </div>
              <h2 className="text-3xl font-serif italic mb-6 text-white">Sourcing & Sustainability</h2>
              <p className="max-w-2xl mx-auto text-sand opacity-70 leading-relaxed italic text-lg">
                We work directly with day-boat fishermen along the coast. Our menu reflects the catch of the day, meaning items may change with the tide. Thank you for supporting sustainable seafood.
              </p>
              <div className="mt-8 flex justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-teal">
                <span>GF — Gluten Free</span>
                <span>V — Vegetarian</span>
                <span>DF — Dairy Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuPage;
