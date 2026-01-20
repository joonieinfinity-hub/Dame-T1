import React from 'react';
import { useApp } from '../App';
import { ArrowRight, Gift, Users, Star } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 bg-[#051622] text-[#deb992]">
      <section className="py-24 bg-[#051622]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold font-serif mb-4 uppercase tracking-tighter text-[#1ba098]">Bespoke Experiences</h1>
            <p className="text-[#deb992] opacity-60 max-w-xl mx-auto italic">From intimate dinners to grand celebrations, Dame offers tailored services to make every moment memorable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="relative h-[600px] rounded-3xl overflow-hidden group border border-[#1ba098]/20 bg-[#0a2130]">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" alt="Private Dining" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.2] grayscale-[0.2]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051622] via-transparent to-transparent p-12 flex flex-col justify-end text-white backdrop-blur-[1px]">
                <Users className="mb-6 text-[#1ba098]" size={40} />
                <h2 className="text-3xl font-bold font-serif mb-4 text-[#1ba098]">Private Dining</h2>
                <p className="text-[#deb992] opacity-80 mb-8 leading-relaxed italic">Our mezzanine offers a secluded space for up to 20 guests. Perfect for birthdays, business dinners, or family gatherings.</p>
                <button className="bg-[#1ba098] text-[#051622] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest self-start hover:bg-[#deb992] transition-colors">Inquire Now</button>
              </div>
            </div>

            <div className="relative h-[600px] rounded-3xl overflow-hidden group border border-[#1ba098]/20 bg-[#0a2130]">
              <img src="https://images.unsplash.com/photo-1533777324565-10a79a7cc06d?auto=format&fit=crop&q=80&w=800" alt="Catering" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.2] grayscale-[0.2]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051622] via-transparent to-transparent p-12 flex flex-col justify-end text-white backdrop-blur-[1px]">
                <Star className="mb-6 text-[#1ba098]" size={40} />
                <h2 className="text-3xl font-bold font-serif mb-4 text-[#1ba098]">Event Catering</h2>
                <p className="text-[#deb992] opacity-80 mb-8 leading-relaxed italic">Bring the Dame experience to your own venue. Custom menus featuring our signature seafood towers and grilled specialties.</p>
                <button className="bg-[#1ba098] text-[#051622] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest self-start hover:bg-[#deb992] transition-colors">View Packages</button>
              </div>
            </div>
          </div>

          <div className="bg-[#0a2130] rounded-[40px] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-16 border border-[#1ba098]/10">
            <div className="lg:w-1/2">
              <Gift className="text-[#1ba098] mb-8" size={48} />
              <h2 className="text-4xl font-bold font-serif mb-6 italic leading-tight text-[#1ba098]">The Perfect Gift</h2>
              <p className="text-[#deb992] opacity-80 text-lg mb-8 leading-relaxed italic">
                Give the gift of an unforgettable dining experience. Our physical and digital gift cards are the ideal choice for seafood lovers and gourmands alike.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#deb992] text-[#051622] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1ba098] transition-colors">Buy Digital Card</button>
                <button className="border border-[#1ba098]/30 text-[#deb992] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1ba098] hover:text-[#051622] transition-all">Order Physical Card</button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800" alt="Gift Card" className="rounded-2xl shadow-2xl rotate-3 grayscale-[0.2] border border-[#1ba098]/20" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;