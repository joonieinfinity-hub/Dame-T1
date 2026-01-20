import React, { useEffect } from 'react';
import { useApp } from '../App';

const About: React.FC = () => {
  const { config } = useApp();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.15 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="animate-in fade-in duration-700 bg-navy text-sand">
      <section className="py-24 bg-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 reveal">
            <h1 className="text-5xl md:text-7xl font-normal mb-6 font-luminaire text-white uppercase italic">The Dame Story</h1>
            <p className="text-sand opacity-70 max-w-2xl mx-auto italic font-lora">Founded in the heart of Greenwich Village, we bring the best of the British coast to New York City.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="aspect-square bg-navy-light rounded-3xl overflow-hidden shadow-xl reveal reveal-left border border-teal/20">
              <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=800" alt="Kitchen" className="w-full h-full object-cover grayscale-[0.2] contrast-125" />
            </div>
            <div className="reveal reveal-right delay-200">
              <h2 className="text-3xl font-normal mb-6 font-luminaire text-white uppercase italic">Culinary Philosophy</h2>
              <div className="space-y-6 text-sand opacity-80 leading-relaxed text-lg font-lora">
                <p>
                  Our journey began with a simple pop-up and a obsession with the perfect piece of fried hake. We believed that seafood didn't need to be complex to be extraordinary—it just needed to be fresh, treated with respect, and served with a sense of fun.
                </p>
                <p>
                  Today, Dame is more than just a restaurant; it's a community. From our local oyster harvesters to our nightly regulars, every person who walks through our doors is part of the story.
                </p>
                <p>
                  We focus on sustainable sourcing, working directly with day-boat fishermen to ensure the lowest environmental impact and the highest possible quality.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-20 reveal">
            <h2 className="text-4xl md:text-5xl font-normal mb-4 font-bodoni text-teal uppercase tracking-widest italic">meet the team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Ed Szymanski', role: 'Executive Chef', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400' },
              { name: 'Patricia Howard', role: 'Director of Operations', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400' },
              { name: 'James Milton', role: 'Head Sommelier', img: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400' }
            ].map((member, i) => (
              <div key={i} className={`group reveal reveal-scale delay-${(i + 1) * 100}`}>
                <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-6 relative border border-teal/30 bg-navy-light">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[0.3] group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-navy/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center text-white backdrop-blur-[2px]">
                    <p className="text-sm italic text-sand font-lora">"Hospitality is about making people feel like they're the only ones in the room."</p>
                  </div>
                </div>
                <h3 className="text-2xl font-normal font-bodoni text-white mb-1">{member.name}</h3>
                <p className="text-xs uppercase tracking-widest text-teal font-bold opacity-80">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;