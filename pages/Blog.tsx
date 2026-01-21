
import React from 'react';
import { useApp } from '../App';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blog: React.FC = () => {
  const { posts } = useApp();

  return (
    <div className="animate-in fade-in duration-700 bg-navy min-h-screen text-sand">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold font-serif mb-4 uppercase tracking-tighter text-teal">Kitchen Dispatches</h1>
            <p className="text-sand opacity-60 italic">Stories, updates, and culinary reflections from the Dame team.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {posts.map((post) => (
              <article key={post.id} className="bg-navy-light rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_60px_rgba(27,160,152,0.2)] hover:-translate-y-2 transition-all duration-500 group flex flex-col border border-teal/10">
                <div className="aspect-video overflow-hidden border-b border-teal/10">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[0.3]" />
                </div>
                <div className="p-8 md:p-12 flex-grow">
                  <div className="flex items-center gap-6 mb-6 text-[10px] uppercase tracking-widest font-bold text-sand opacity-50">
                    <span className="flex items-center gap-2 text-teal"><Calendar size={14} /> {post.date}</span>
                    <span className="flex items-center gap-2"><User size={14} /> {post.author}</span>
                  </div>
                  <h2 className="text-3xl font-bold font-bodoni mb-6 group-hover:text-teal transition-colors duration-300 text-white">{post.title}</h2>
                  <p className="text-sand opacity-70 leading-relaxed mb-8 group-hover:opacity-100 transition-opacity italic">{post.excerpt}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase bg-navy text-sand px-3 py-1 rounded-full group-hover:bg-teal group-hover:text-navy transition-colors border border-teal/30">
                      <Tag size={12} /> {post.category}
                    </div>
                    <button className="text-teal font-bold uppercase tracking-widest text-xs flex items-center group/btn hover:text-sand transition-colors">
                      Read Full Story <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 border-t border-teal/10 pt-16 text-center">
            <p className="text-sand opacity-40 text-sm italic">Showing {posts.length} of {posts.length} posts</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
