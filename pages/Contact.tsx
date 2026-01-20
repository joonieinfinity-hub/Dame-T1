import React, { useState } from 'react';
import { useApp } from '../App';
import { Send, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const Contact: React.FC = () => {
  const { config } = useApp();
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="animate-in fade-in duration-700 bg-[#051622] text-[#deb992]">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold font-serif mb-4 uppercase tracking-tighter text-[#1ba098] drop-shadow-[0_0_12px_rgba(27,160,152,0.3)]">Get In Touch</h1>
            <p className="text-[#deb992] opacity-60 italic">We'd love to hear from you. For reservations, please use our booking page.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Info */}
            <div>
              <div className="space-y-12 mb-16">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#0a2130] border border-[#1ba098]/30 rounded-full flex items-center justify-center text-[#1ba098]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#deb992] opacity-50 mb-2">Visit Us</h3>
                    <p className="text-xl font-serif text-white">{config.address}</p>
                    <p className="text-[#1ba098] opacity-80 mt-2 text-sm uppercase tracking-widest font-bold">Greenwich Village, New York</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#0a2130] border border-[#1ba098]/30 rounded-full flex items-center justify-center text-[#1ba098]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#deb992] opacity-50 mb-2">Call Us</h3>
                    <p className="text-xl font-serif text-white">{config.phone}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#0a2130] border border-[#1ba098]/30 rounded-full flex items-center justify-center text-[#1ba098]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#deb992] opacity-50 mb-2">Email</h3>
                    <a href={`mailto:${config.email}`} className="text-xl font-serif text-white hover:text-[#1ba098] transition-colors">{config.email}</a>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-[#1ba098]/20">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#deb992] opacity-50 mb-6">Follow Our Journey</h3>
                <div className="flex gap-4">
                   <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#0a2130] border border-[#1ba098]/30 text-[#deb992] flex items-center justify-center hover:bg-[#1ba098] hover:text-[#051622] transition-all">
                    <Instagram size={20} />
                  </a>
                  <a href={config.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#0a2130] border border-[#1ba098]/30 text-[#deb992] flex items-center justify-center hover:bg-[#1ba098] hover:text-[#051622] transition-all">
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-[#0a2130] p-10 md:p-16 rounded-[40px] border border-[#1ba098]/20">
              {formSent ? (
                <div className="text-center py-20 animate-in zoom-in">
                  <div className="w-20 h-20 bg-[#1ba098]/20 text-[#1ba098] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_15px_rgba(27,160,152,0.2)]">
                    <Send size={40} />
                  </div>
                  <h2 className="text-3xl font-serif italic mb-4 text-white">Message Sent</h2>
                  <p className="text-[#deb992] opacity-70 mb-10">We'll get back to you as soon as possible.</p>
                  <button onClick={() => setFormSent(false)} className="text-[#1ba098] font-bold uppercase tracking-widest text-xs hover:text-[#deb992] transition-colors">Send another message</button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-serif italic mb-8 text-[#1ba098]">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input placeholder="Full Name" required className="w-full bg-[#051622] border border-[#1ba098]/20 px-6 py-4 rounded-xl focus:ring-2 focus:ring-[#1ba098] outline-none text-[#deb992]" />
                      <input type="email" placeholder="Email Address" required className="w-full bg-[#051622] border border-[#1ba098]/20 px-6 py-4 rounded-xl focus:ring-2 focus:ring-[#1ba098] outline-none text-[#deb992]" />
                    </div>
                    <input placeholder="Subject" className="w-full bg-[#051622] border border-[#1ba098]/20 px-6 py-4 rounded-xl focus:ring-2 focus:ring-[#1ba098] outline-none text-[#deb992]" />
                    <textarea placeholder="How can we help?" required className="w-full bg-[#051622] border border-[#1ba098]/20 px-6 py-4 rounded-xl focus:ring-2 focus:ring-[#1ba098] outline-none h-40 text-[#deb992]" />
                    <button type="submit" className="w-full bg-[#1ba098] text-[#051622] py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#deb992] transition-all flex items-center justify-center gap-2">
                      Send Message <Send size={18} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-[#051622] border-t border-[#1ba098]/20">
        <div className="w-full h-full grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 flex items-center justify-center backdrop-blur-[1px]">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-4 text-[#1ba098] opacity-80" />
            <p className="font-serif italic text-xl text-white">87 MacDougal Street, NY 10012</p>
            <p className="text-[#deb992] text-xs uppercase tracking-widest mt-2 font-bold opacity-50">Find us in the heart of the village</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;