// Added React to the import list to fix the namespace error
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';
import { ArrowRight, Star, Quote, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  const { config, menu } = useApp();
  const [offset, setOffset] = useState(0);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Parallax and Reveal Logic
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.15 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const nextHero = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentHeroIndex((prev) => (prev + 1) % config.heroImages.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [config.heroImages.length, isTransitioning]);

  const prevHero = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentHeroIndex((prev) => (prev - 1 + config.heroImages.length) % config.heroImages.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [config.heroImages.length, isTransitioning]);

  // Carousel Auto-play Logic
  useEffect(() => {
    const timer = setInterval(() => {
      nextHero();
    }, 7000); // Change image every 7 seconds
    return () => clearInterval(timer);
  }, [nextHero]);

  // Split Name for Dynamic Writing Effect
  const nameChars = useMemo(() => config.name.split(''), [config.name]);

  return (
    <div className="animate-in fade-in duration-700 bg-navy text-sand">
      {/* Hero Section with Parallax Carousel */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Carousel Background Images with Zoom effect */}
        <div 
          className="absolute inset-0 z-0 scale-105"
          style={{ 
            transform: `translateY(${offset * 0.25}px) scale(1.05)`,
            transition: 'transform 0.1s linear'
          }}
        >
          {config.heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
                idx === currentHeroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img 
                src={img} 
                alt={`Hero ${idx + 1}`} 
                className={`w-full h-full object-cover brightness-[0.35] transition-transform duration-[7000ms] ease-linear ${
                  idx === currentHeroIndex ? 'scale-110' : 'scale-100'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-6 md:px-12 pointer-events-none">
          <button 
            onClick={prevHero} 
            className="pointer-events-auto p-4 rounded-full bg-black/10 backdrop-blur-sm border border-white/5 text-sand/40 hover:text-teal hover:bg-black/20 hover:scale-110 active:scale-90 transition-all group"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={28} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button 
            onClick={nextHero} 
            className="pointer-events-auto p-4 rounded-full bg-black/10 backdrop-blur-sm border border-white/5 text-sand/40 hover:text-teal hover:bg-black/20 hover:scale-110 active:scale-90 transition-all group"
            aria-label="Next Slide"
          >
            <ChevronRight size={28} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Carousel Indicators with Progress Line */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4">
          {config.heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!isTransitioning) {
                   setIsTransitioning(true);
                   setCurrentHeroIndex(idx);
                   setTimeout(() => setIsTransitioning(false), 1000);
                }
              }}
              className="group relative h-10 w-12 flex items-center justify-center"
            >
              <div className={`h-[2px] transition-all duration-700 ${
                idx === currentHeroIndex ? 'w-full bg-teal shadow-[0_0_8px_#1ba098]' : 'w-6 bg-white/20 group-hover:bg-white/40'
              }`} />
              {idx === currentHeroIndex && (
                 <div 
                   className="absolute top-[19px] left-0 h-[2px] bg-white animate-[progress-grow_7000ms_linear_infinite]" 
                   style={{ width: '0%' }}
                 />
              )}
            </button>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-40 text-center px-4 max-w-4xl">
          <h1 className="text-8xl md:text-[14rem] font-normal text-white mb-4 tracking-normal leading-none font-hero drop-shadow-[0_0_40px_rgba(27,160,152,0.3)] transition-transform duration-1000 cursor-default select-none flex justify-center flex-nowrap whitespace-nowrap overflow-visible">
            {nameChars.map((char, i) => (
              <span 
                key={i} 
                className="inline-block animate-writing opacity-0"
                style={{ 
                  /* Slightly slower stagger delay (300ms) for a more refined feel */
                  animationDelay: `${400 + (i * 300)}ms`,
                  animationFillMode: 'both'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-teal mb-10 font-light tracking-[0.1em] italic animate-in slide-in-from-bottom duration-1000 delay-[2200ms]">
            {config.tagline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in slide-in-from-bottom duration-1000 delay-[2500ms]">
            <Link 
              to="/menu" 
              className="w-full sm:w-auto bg-sand text-navy px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-navy hover:shadow-[0_0_50px_rgba(222,185,146,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl"
            >
              View Menu
            </Link>
            <Link 
              to="/reservations" 
              className="w-full sm:w-auto border border-teal text-sand px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-teal hover:text-navy hover:shadow-[0_0_50px_rgba(27,160,152,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl"
            >
              Reservations
            </Link>
          </div>
        </div>

        {/* Scroll Indicator Icon */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <div className="w-px h-16 bg-teal/50 shadow-[0_0_10px_rgba(27,160,152,0.5)]"></div>
        </div>

        <style>{`
          @keyframes progress-grow {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </section>

      {/* About Teaser */}
      <section className="py-24 bg-navy overflow-hidden border-b border-teal/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 reveal reveal-left">
              <span className="text-teal text-xs font-bold uppercase tracking-widest mb-4 block">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-normal mb-8 leading-tight font-lora italic text-white">A Modern Take on British Seafood</h2>
              <p className="text-lg text-sand opacity-80 leading-relaxed mb-8">
                {config.aboutText}
              </p>
              <Link to="/about" className="group inline-flex items-center text-teal font-bold uppercase tracking-widest text-sm border-b-2 border-teal/30 pb-1 hover:border-sand hover:text-sand hover:scale-105 active:scale-95 transition-all">
                Learn More <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative reveal reveal-right">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 group border border-teal/20">
                <img 
                  src={config.aboutImage} 
                  alt="About Dame" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[0.2]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-sand text-navy p-8 rounded-xl hidden md:block shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                <p className="text-3xl font-serif italic mb-2">"Unforgettable"</p>
                <p className="text-[10px] uppercase tracking-widest font-bold">— New York Times</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Highlights */}
      <section className="py-24 bg-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal reveal-scale">
            <span className="text-teal opacity-70 text-xs font-bold uppercase tracking-widest mb-4 block">On The Table</span>
            <h2 className="text-4xl md:text-5xl font-normal text-white font-lora italic">Featured Dishes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menu.slice(0, 3).map((item, idx) => (
              <div key={item.id} className={`group bg-navy-light rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_25px_60px_rgba(27,160,152,0.2)] hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 reveal reveal-scale border border-teal/20 delay-${(idx + 1) * 100}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-normal font-lora group-hover:text-teal group-hover:translate-x-1 origin-left transition-all duration-300 text-white">{item.name}</h3>
                    <span className="text-teal font-bold">{item.price}</span>
                  </div>
                  <p className="text-sand opacity-60 text-sm mb-6 leading-relaxed font-lora italic">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 reveal">
             <Link 
              to="/menu" 
              className="inline-flex items-center bg-sand text-navy px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-teal hover:shadow-[0_0_20px_rgba(27,160,152,0.4)] transition-all hover:scale-110 active:scale-95 shadow-lg"
            >
              Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-navy overflow-hidden border-y border-teal/20">
        <div className="max-w-4xl mx-auto px-4 text-center reveal reveal-scale">
          <Quote size={48} className="mx-auto mb-10 text-teal/20" />
          <div className="relative">
            <p className="text-2xl md:text-3xl font-lora italic text-sand leading-relaxed mb-8">
              "The grilled oysters were transformative. It's rare to find a place that balances such casual energy with world-class execution. A true gem."
            </p>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#1ba098" color="#1ba098" />)}
            </div>
            <p className="text-xs uppercase tracking-widest font-bold text-sand opacity-50">Sarah Jenkins, Food Critic</p>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-24 bg-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-navy-light rounded-2xl aspect-video w-full flex items-center justify-center overflow-hidden shadow-inner group reveal reveal-left border border-teal/20">
              {/* Map Placeholder */}
              <div className="text-center p-8 group-hover:scale-105 transition-transform duration-700">
                <MapPin size={32} className="mx-auto mb-4 text-teal" />
                <p className="text-sand font-medium">Interactive Map Integration</p>
                <p className="text-sand opacity-50 text-[10px] mt-2 uppercase tracking-widest font-bold">{config.address}</p>
              </div>
            </div>
            <div className="lg:pl-12 reveal reveal-right">
              <h2 className="text-3xl font-normal mb-8 text-teal font-serif italic">Find Us</h2>
              <div className="space-y-8">
                <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                  <MapPin className="text-sand mr-4 mt-1 group-hover:scale-110 text-teal transition-all" size={24} />
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-2 text-sand opacity-50">Location</h4>
                    <p className="text-sand">{config.address}</p>
                  </div>
                </div>
                <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                  <Clock className="text-sand mr-4 mt-1 group-hover:scale-110 text-teal transition-all" size={24} />
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-2 text-sand opacity-50">Hours</h4>
                    <ul className="text-sand space-y-1">
                      {config.operatingHours.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;