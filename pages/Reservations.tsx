import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';
import { Calendar, Users, Clock, Info, ArrowRight } from 'lucide-react';

const Reservations: React.FC = () => {
  const { config } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-navy">
        <div className="max-w-md w-full text-center bg-navy-light p-12 rounded-3xl shadow-2xl animate-in zoom-in duration-500 border border-teal/30">
          <div className="w-20 h-20 bg-teal/20 text-teal rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(27,160,152,0.3)]">
            <Calendar size={40} />
          </div>
          <h2 className="text-3xl font-normal mb-4 font-bodoni text-white uppercase italic">Booking Received!</h2>
          <p className="text-sand opacity-70 mb-8">We've received your request and will confirm your table shortly via email.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full bg-sand text-navy py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-teal transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 bg-navy min-h-screen text-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Form */}
          <div className="bg-navy p-8 md:p-12 rounded-3xl shadow-xl border border-teal/30">
            <h1 className="text-4xl font-normal mb-8 font-bodoni uppercase tracking-tight text-sand italic">Reserve a Table</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-sand opacity-50 mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-teal opacity-70" size={18} />
                    <input type="date" required className="w-full pl-12 pr-4 py-3 bg-navy-light border border-teal/30 text-sand rounded-xl focus:ring-2 focus:ring-teal outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-sand opacity-50 mb-2">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-teal opacity-70" size={18} />
                    <select required className="w-full pl-12 pr-4 py-3 bg-navy-light border border-teal/30 text-sand rounded-xl focus:ring-2 focus:ring-teal outline-none appearance-none">
                      <option>5:00 PM</option>
                      <option>6:30 PM</option>
                      <option>8:00 PM</option>
                      <option>9:30 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-sand opacity-50 mb-2">Party Size</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-teal opacity-70" size={18} />
                  <select required className="w-full pl-12 pr-4 py-3 bg-navy-light border border-teal/30 text-sand rounded-xl focus:ring-2 focus:ring-teal outline-none appearance-none">
                    <option>2 People</option>
                    <option>4 People</option>
                    <option>6 People</option>
                    <option>Large Group (Contact Us)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6 border-t border-teal/20 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input placeholder="First Name" required className="w-full px-6 py-3 bg-navy-light border border-teal/30 text-sand rounded-xl focus:ring-2 focus:ring-teal outline-none" />
                  <input placeholder="Last Name" required className="w-full px-6 py-3 bg-navy-light border border-teal/30 text-sand rounded-xl focus:ring-2 focus:ring-teal outline-none" />
                </div>
                <input type="email" placeholder="Email" required className="w-full px-6 py-3 bg-navy-light border border-teal/30 text-sand rounded-xl focus:ring-2 focus:ring-teal outline-none" />
                <textarea placeholder="Special requests (optional)" className="w-full px-6 py-3 bg-navy-light border border-teal/30 text-sand rounded-xl focus:ring-2 focus:ring-teal outline-none h-32" />
              </div>

              <button type="submit" className="w-full bg-teal text-navy py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-sand transition-all">
                Confirm Reservation
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="lg:pt-12">
            <h2 className="text-4xl font-normal mb-8 font-bodoni text-white uppercase italic">Policies</h2>
            <div className="space-y-10">
              <div className="flex items-start">
                <div className="p-3 bg-navy-light text-teal rounded-lg mr-6 border border-teal/30">
                  <Info size={24} />
                </div>
                <div>
                  <h4 className="font-normal text-lg mb-2 text-teal font-bodoni italic">Grace Period</h4>
                  <p className="text-sand opacity-70 leading-relaxed italic font-lora">We hold tables for 15 minutes. Please call us if you're running late.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-navy-light text-teal rounded-lg mr-6 border border-teal/30">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-normal text-lg mb-2 text-teal font-bodoni italic">Dining Time</h4>
                  <p className="text-sand opacity-70 leading-relaxed italic font-lora">All bookings are for 90 minutes. We strive to be efficient so everyone can enjoy their meal.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-navy-light text-teal rounded-lg mr-6 border border-teal/30">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-normal text-lg mb-2 text-teal font-bodoni italic">Large Groups</h4>
                  <p className="text-sand opacity-70 leading-relaxed italic font-lora">For parties larger than 6, please email our events team at events@damerestaurant.com</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-navy-light rounded-2xl text-sand border border-teal/30">
              <h3 className="text-2xl font-normal mb-4 text-teal font-bodoni italic">Want to skip the line?</h3>
              <p className="text-sand opacity-60 text-sm mb-6 italic font-lora">A limited number of walk-in seats are available at our bar nightly starting at 5 PM.</p>
              <Link to="/contact" className="text-teal font-bold uppercase tracking-widest text-xs flex items-center hover:opacity-80 transition-opacity">
                View Location Map <ArrowRight size={14} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;