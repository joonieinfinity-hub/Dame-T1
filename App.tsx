import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu as MenuIcon, X, Instagram, Facebook, Mail, MapPin, 
  Phone, Settings, Search, Check, ChevronRight, ArrowRight,
  Plus, Trash2, Globe, Layout, Utensils, PenTool, ExternalLink,
  Lock, LogOut, UserCheck
} from 'lucide-react';
import { INITIAL_CONFIG, MENU_ITEMS, BLOG_POSTS } from './constants';
import { SiteConfig, MenuItem, BlogPost, SEOData } from './types';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import MenuPage from './pages/Menu';
import Reservations from './pages/Reservations';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

// Context
interface AppState {
  config: SiteConfig;
  menu: MenuItem[];
  posts: BlogPost[];
  seo: Record<string, SEOData>;
  isAuthenticated: boolean;
  userEmail: string | null;
  isDashboardOpen: boolean;
  showLoginModal: boolean;
  setIsDashboardOpen: (open: boolean) => void;
  setShowLoginModal: (show: boolean) => void;
  login: (email: string) => void;
  logout: () => void;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  updateMenu: (newMenu: MenuItem[]) => void;
  addItem: (item: MenuItem) => void;
  updateItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteItem: (id: string) => void;
  updatePosts: (newPosts: BlogPost[]) => void;
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, updates: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  updateSEO: (path: string, data: SEOData) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

// Scroll Restoration & Smooth Scroll Handler
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname, hash]);

  return null;
};

// SEO Dynamic Header Update
const SEOManager = () => {
  const { seo, config } = useApp();
  const location = useLocation();

  useEffect(() => {
    const currentSEO = seo[location.pathname];
    if (currentSEO) {
      document.title = `${currentSEO.title} | ${config.name}`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', currentSEO.description);
    } else {
      document.title = `${config.name} | ${config.tagline}`;
    }
  }, [location.pathname, seo, config]);

  return null;
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { config } = useApp();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Shop', path: 'https://damenyc.square.site/', external: true },
    { name: 'Gift Cards', path: 'https://squareup.com/gift/TKYVAB895NCRJ/order', external: true },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#051622] text-[#deb992] border-b border-[#1ba098]/30 shadow-xl backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex flex-col items-center group">
            <span className="text-3xl font-normal tracking-[0.15em] font-serif text-[#deb992] drop-shadow-[0_0_8px_rgba(222,185,146,0.3)] group-hover:tracking-[0.2em] transition-all duration-500">{config.name}</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#1ba098] font-bold hidden sm:block">Fine Dining & Seafood</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              link.external ? (
                <a 
                  key={link.name} 
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold tracking-widest uppercase font-lora hover:text-[#1ba098] transition-all text-[#deb992] flex items-center gap-1"
                >
                  {link.name} <ExternalLink size={12} className="opacity-50" />
                </a>
              ) : (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`text-xs font-bold tracking-widest uppercase font-lora hover:text-[#1ba098] transition-all ${
                    location.pathname === link.path ? 'text-[#1ba098] border-b border-[#1ba098]' : 'text-[#deb992]'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          <div className="hidden md:block">
            <Link 
              to="/reservations" 
              className="bg-[#1ba098] text-[#051622] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#deb992] hover:shadow-[0_0_15px_rgba(27,160,152,0.4)] transition-all font-lora"
            >
              Book Now
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#deb992] hover:text-[#1ba098] transition-colors">
              {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#051622] border-t border-[#1ba098]/30 animate-in fade-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.name}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-4 text-base font-medium text-[#deb992] hover:text-[#1ba098] border-b border-[#1ba098]/10 font-lora flex items-center justify-between"
                >
                  {link.name} <ExternalLink size={16} />
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-[#deb992] hover:text-[#1ba098] border-b border-[#1ba098]/10 font-lora"
                >
                  {link.name}
                </Link>
              )
            ))}
            <div className="pt-6">
               <Link 
                to="/reservations" 
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-[#1ba098] text-[#051622] px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest font-lora shadow-lg"
              >
                Make a Reservation
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { config, isAuthenticated, setIsDashboardOpen, setShowLoginModal } = useApp();

  const handleStaffToggle = () => {
    if (isAuthenticated) {
      setIsDashboardOpen(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <footer className="bg-[#051622] text-[#deb992] pt-20 pb-10 border-t border-[#1ba098]/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1ba098]/20 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-3xl font-normal font-serif mb-6 text-[#1ba098] tracking-[0.1em]">{config.name}</h3>
            <p className="text-[#deb992] text-sm leading-relaxed mb-6 opacity-80 font-lora italic">
              Modern British seafood in the heart of Greenwich Village. We celebrate the best ingredients with simplicity, honesty, and New York energy.
            </p>
            <div className="flex space-x-4">
              <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#1ba098]/30 flex items-center justify-center text-[#deb992] hover:text-[#051622] hover:bg-[#1ba098] transition-all">
                <Instagram size={18} />
              </a>
              <a href={config.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#1ba098]/30 flex items-center justify-center text-[#deb992] hover:text-[#051622] hover:bg-[#1ba098] transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-[#1ba098] font-lora opacity-80">Navigation</h4>
            <ul className="space-y-4 text-sm font-lora">
              <li><Link to="/menu" className="text-[#deb992] hover:text-[#1ba098] transition-colors">The Menu</Link></li>
              <li><Link to="/reservations" className="text-[#deb992] hover:text-[#1ba098] transition-colors">Reservations</Link></li>
              <li><a href="https://damenyc.square.site/" target="_blank" rel="noopener noreferrer" className="text-[#deb992] hover:text-[#1ba098] transition-colors flex items-center gap-2">Shop Merch <ExternalLink size={14} /></a></li>
              <li><a href="https://squareup.com/gift/TKYVAB895NCRJ/order" target="_blank" rel="noopener noreferrer" className="text-[#deb992] hover:text-[#1ba098] transition-colors flex items-center gap-2">Gift Cards <ExternalLink size={14} /></a></li>
              <li><Link to="/blog" className="text-[#deb992] hover:text-[#1ba098] transition-colors">Kitchen Notes</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-[#1ba098] font-lora opacity-80">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-[#deb992] font-lora">
              <li className="flex items-start">
                <MapPin size={16} className="mr-3 mt-0.5 text-[#1ba098]" />
                <span className="opacity-80 leading-relaxed">{config.address}</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-3 text-[#1ba098]" />
                <span className="opacity-80">{config.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-3 text-[#1ba098]" />
                <a href={`mailto:${config.email}`} className="opacity-80 hover:text-[#1ba098] transition-colors">{config.email}</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-[#1ba098] font-lora opacity-80">Newsletter</h4>
            <p className="text-[#deb992] text-sm mb-6 opacity-80 font-lora">Join our mailing list for news on new seasonal menus and events.</p>
            <div className="flex group">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-[#0a2130] border border-[#1ba098]/30 px-4 py-3 w-full text-sm focus:ring-1 focus:ring-[#1ba098] outline-none text-[#deb992] font-lora placeholder-[#deb992]/30" 
              />
              <button className="bg-[#1ba098] px-5 py-3 hover:bg-[#deb992] transition-colors text-[#051622] flex items-center justify-center">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-[#1ba098]/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-[#deb992] opacity-40 font-lora">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <p>© {new Date().getFullYear()} {config.name}. Built with Precision.</p>
            <button 
              onClick={handleStaffToggle}
              className="flex items-center gap-2 hover:text-[#1ba098] transition-colors group"
            >
              {isAuthenticated ? <Settings size={12} className="group-hover:rotate-90 transition-transform" /> : <Lock size={12} />}
              Staff Portal
            </button>
          </div>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#1ba098] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#1ba098] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ThemePanel = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'blog' | 'menu'>('general');
  const [emailInput, setEmailInput] = useState('');
  
  const { 
    config, updateConfig, menu, addItem, updateItem, deleteItem, 
    posts, addPost, updatePost, deletePost, seo, updateSEO,
    isAuthenticated, login, logout, userEmail, 
    isDashboardOpen, setIsDashboardOpen, showLoginModal, setShowLoginModal
  } = useApp();
  
  const location = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.includes('@')) {
      login(emailInput);
      setShowLoginModal(false);
      setIsDashboardOpen(true);
    }
  };

  const currentSEO = seo[location.pathname] || { title: config.name, description: config.tagline, keywords: 'seafood, restaurant' };

  return (
    <>
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#051622]/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="max-w-md w-full bg-[#0a2130] border border-[#1ba098]/30 rounded-[40px] p-12 relative overflow-hidden shadow-2xl">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-8 right-8 text-[#deb992]/50 hover:text-[#1ba098] transition-colors"
            >
              <X size={24} />
            </button>
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-[#1ba098]/10 text-[#1ba098] rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={32} />
              </div>
              <h2 className="text-3xl font-serif italic text-white mb-2 uppercase tracking-tighter">Staff Portal</h2>
              <p className="text-[#deb992] opacity-60 text-sm italic">Verification required to access management console.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#1ba098] mb-3">Staff Email Address</label>
                <input 
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@damenewyork.com"
                  className="w-full bg-[#051622] border border-[#1ba098]/20 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-[#1ba098] outline-none text-[#deb992] placeholder-[#deb992]/20"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#1ba098] text-[#051622] py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#deb992] transition-all flex items-center justify-center gap-3"
              >
                Verify & Enter <ArrowRight size={16} />
              </button>
            </form>
            <p className="mt-8 text-[10px] text-center text-[#deb992]/30 uppercase tracking-widest font-bold">Authorized Personnel Only</p>
          </div>
        </div>
      )}

      {/* Control Panel (Slide out) */}
      <div className={`fixed right-0 top-0 h-screen z-[60] transition-transform duration-500 ease-in-out ${isDashboardOpen ? 'translate-x-0' : 'translate-x-full shadow-none'}`}>
        <div className="w-[400px] h-full bg-[#051622] shadow-2xl border-l border-[#1ba098]/30 flex flex-col text-[#deb992] relative">
          
          {/* Close button for panel */}
          <button 
            onClick={() => setIsDashboardOpen(false)}
            className="absolute left-[-40px] top-6 bg-[#051622] text-[#deb992] p-2 rounded-l-lg border-y border-l border-[#1ba098]/30"
          >
            <ChevronRight size={24} />
          </button>

          <div className="p-6 border-b border-[#1ba098]/30 bg-[#0a2130]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold font-serif text-[#1ba098] tracking-wider uppercase italic">Dashboard</h3>
                <div className="flex items-center gap-2 mt-1">
                  <UserCheck size={10} className="text-[#1ba098]" />
                  <span className="text-[9px] font-bold opacity-40 truncate max-w-[150px]">{userEmail}</span>
                </div>
              </div>
              <button 
                onClick={() => { logout(); setIsDashboardOpen(false); }}
                className="p-2 text-[#deb992]/40 hover:text-red-400 transition-colors"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
            
            <div className="flex gap-2">
              {[
                { id: 'general', icon: Layout, label: 'Global' },
                { id: 'seo', icon: Globe, label: 'SEO' },
                { id: 'blog', icon: PenTool, label: 'Posts' },
                { id: 'menu', icon: Utensils, label: 'Menu' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  title={tab.label}
                  className={`flex-1 flex flex-col items-center justify-center p-2 rounded-xl transition-all ${activeTab === tab.id ? 'bg-[#1ba098] text-[#051622] shadow-lg scale-105' : 'bg-[#051622] text-[#1ba098]/60 hover:text-[#1ba098] hover:bg-[#1ba098]/10'}`}
                >
                  <tab.icon size={18} />
                  <span className="text-[8px] mt-1 font-bold uppercase">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {activeTab === 'general' && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <p className="text-[10px] font-bold text-[#1ba098] uppercase tracking-[0.2em] mb-4">Branding & Contact</p>
                <div>
                  <label className="block text-[10px] font-bold uppercase opacity-50 mb-2">Restaurant Name</label>
                  <input 
                    value={config.name}
                    onChange={(e) => updateConfig({ name: e.target.value })}
                    className="w-full bg-[#0a2130] border border-[#1ba098]/30 p-3 text-sm rounded-xl text-[#deb992] focus:ring-1 focus:ring-[#1ba098] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase opacity-50 mb-2">Tagline</label>
                  <textarea 
                    value={config.tagline}
                    onChange={(e) => updateConfig({ tagline: e.target.value })}
                    className="w-full bg-[#0a2130] border border-[#1ba098]/30 p-3 text-sm rounded-xl h-20 text-[#deb992] focus:ring-1 focus:ring-[#1ba098] outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase opacity-50 mb-2">Address</label>
                  <input 
                    value={config.address}
                    onChange={(e) => updateConfig({ address: e.target.value })}
                    className="w-full bg-[#0a2130] border border-[#1ba098]/30 p-3 text-sm rounded-xl text-[#deb992] focus:ring-1 focus:ring-[#1ba098] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase opacity-50 mb-2">Email Address</label>
                  <input 
                    value={config.email}
                    onChange={(e) => updateConfig({ email: e.target.value })}
                    className="w-full bg-[#0a2130] border border-[#1ba098]/30 p-3 text-sm rounded-xl text-[#deb992] focus:ring-1 focus:ring-[#1ba098] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase opacity-50 mb-2">Instagram URL</label>
                  <input 
                    value={config.instagram}
                    onChange={(e) => updateConfig({ instagram: e.target.value })}
                    className="w-full bg-[#0a2130] border border-[#1ba098]/30 p-3 text-sm rounded-xl text-[#deb992] focus:ring-1 focus:ring-[#1ba098] outline-none"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase opacity-50 mb-2">Facebook URL</label>
                  <input 
                    value={config.facebook}
                    onChange={(e) => updateConfig({ facebook: e.target.value })}
                    className="w-full bg-[#0a2130] border border-[#1ba098]/30 p-3 text-sm rounded-xl text-[#deb992] focus:ring-1 focus:ring-[#1ba098] outline-none"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="p-4 bg-[#0a2130] rounded-xl border border-[#1ba098]/10 text-xs italic opacity-60">
                  Changes made here reflect instantly across all pages including the header, footer, and contact page.
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <p className="text-[10px] font-bold text-[#1ba098] uppercase tracking-[0.2em] mb-4">SEO Settings: {location.pathname}</p>
                <div>
                  <label className="block text-[10px] font-bold uppercase opacity-50 mb-2">Meta Title</label>
                  <input 
                    value={currentSEO.title}
                    onChange={(e) => updateSEO(location.pathname, { ...currentSEO, title: e.target.value })}
                    className="w-full bg-[#0a2130] border border-[#1ba098]/30 p-3 text-sm rounded-xl text-[#deb992] focus:ring-1 focus:ring-[#1ba098] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase opacity-50 mb-2">Meta Description</label>
                  <textarea 
                    value={currentSEO.description}
                    onChange={(e) => updateSEO(location.pathname, { ...currentSEO, description: e.target.value })}
                    className="w-full bg-[#0a2130] border border-[#1ba098]/30 p-3 text-sm rounded-xl h-32 text-[#deb992] focus:ring-1 focus:ring-[#1ba098] outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase opacity-50 mb-2">Keywords</label>
                  <input 
                    value={currentSEO.keywords}
                    onChange={(e) => updateSEO(location.pathname, { ...currentSEO, keywords: e.target.value })}
                    className="w-full bg-[#0a2130] border border-[#1ba098]/30 p-3 text-sm rounded-xl text-[#deb992] focus:ring-1 focus:ring-[#1ba098] outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <button 
                  onClick={() => addPost({
                    id: Date.now().toString(),
                    title: 'New Dispatch',
                    excerpt: 'Enter a short summary...',
                    content: '',
                    author: 'Dame Team',
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                    category: 'News',
                    image: 'https://images.unsplash.com/photo-1551632432-c735e8299bc2?auto=format&fit=crop&q=80&w=800'
                  })}
                  className="w-full flex items-center justify-center gap-3 bg-[#1ba098] text-[#051622] py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#deb992] transition-colors shadow-lg"
                >
                  <Plus size={18} /> Add New Post
                </button>
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id} className="p-4 bg-[#0a2130] rounded-2xl border border-[#1ba098]/20 group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-grow pr-4">
                           <input 
                            value={post.title}
                            onChange={(e) => updatePost(post.id, { title: e.target.value })}
                            className="bg-transparent border-none p-0 font-bold text-sm text-white focus:ring-0 w-full mb-1"
                          />
                          <input 
                            value={post.category}
                            onChange={(e) => updatePost(post.id, { category: e.target.value })}
                            className="bg-transparent border-none p-0 text-[10px] opacity-40 uppercase font-bold focus:ring-0 w-full"
                          />
                        </div>
                        <button 
                          onClick={() => deletePost(post.id)}
                          className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-400/10 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <button 
                  onClick={() => addItem({
                    id: Date.now().toString(),
                    name: 'Signature Dish',
                    description: 'Chef\'s daily creation...',
                    price: '$0',
                    category: 'Mains',
                    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400'
                  })}
                  className="w-full flex items-center justify-center gap-3 bg-[#1ba098] text-[#051622] py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#deb992] transition-colors shadow-lg"
                >
                  <Plus size={18} /> Add Menu Item
                </button>
                <div className="space-y-4">
                  {menu.map(item => (
                    <div key={item.id} className="p-4 bg-[#0a2130] rounded-2xl border border-[#1ba098]/20 group">
                      <div className="flex justify-between items-start">
                        <div className="flex-grow pr-4 space-y-2">
                          <input 
                            value={item.name}
                            onChange={(e) => updateItem(item.id, { name: e.target.value })}
                            className="bg-transparent border-none p-0 font-bold text-sm text-white focus:ring-0 w-full"
                          />
                          <div className="flex gap-2">
                            <input 
                              value={item.price}
                              onChange={(e) => updateItem(item.id, { price: e.target.value })}
                              className="bg-transparent border border-[#1ba098]/20 px-2 py-0.5 rounded text-[10px] font-bold text-[#1ba098] w-16"
                            />
                             <select 
                              value={item.category}
                              onChange={(e) => updateItem(item.id, { category: e.target.value as any })}
                              className="bg-[#051622] border border-[#1ba098]/20 px-2 py-0.5 rounded text-[10px] font-bold text-white/50 appearance-none"
                            >
                              <option>Starters</option>
                              <option>Mains</option>
                              <option>Sides</option>
                              <option>Desserts</option>
                              <option>Drinks</option>
                            </select>
                          </div>
                        </div>
                        <button 
                          onClick={() => deleteItem(item.id)}
                          className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-400/10 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-[#0a2130]/50 border-t border-[#1ba098]/10 text-[10px] text-center opacity-40">
            Dame Admin v2.4 | Modern Seafood CRM
          </div>
        </div>
      </div>
    </>
  );
};

const App = () => {
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [menu, setMenu] = useState<MenuItem[]>(MENU_ITEMS);
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [seo, setSeo] = useState<Record<string, SEOData>>({});
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // UI State
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const login = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  const updateConfig = (newConfig: Partial<SiteConfig>) => setConfig(prev => ({ ...prev, ...newConfig }));
  
  const updateMenu = (newMenu: MenuItem[]) => setMenu(newMenu);
  const addItem = (item: MenuItem) => setMenu(prev => [item, ...prev]);
  const updateItem = (id: string, updates: Partial<MenuItem>) => setMenu(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  const deleteItem = (id: string) => setMenu(prev => prev.filter(i => i.id !== id));
  
  const updatePosts = (newPosts: BlogPost[]) => setPosts(newPosts);
  const addPost = (post: BlogPost) => setPosts(prev => [post, ...prev]);
  const updatePost = (id: string, updates: Partial<BlogPost>) => setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  const deletePost = (id: string) => setPosts(prev => prev.filter(p => p.id !== id));
  
  const updateSEO = (path: string, data: SEOData) => setSeo(prev => ({ ...prev, [path]: data }));

  return (
    <AppContext.Provider value={{ 
      config, menu, posts, seo, 
      isAuthenticated, userEmail, login, logout,
      isDashboardOpen, setIsDashboardOpen, showLoginModal, setShowLoginModal,
      updateConfig, updateMenu, addItem, updateItem, deleteItem,
      updatePosts, addPost, updatePost, deletePost, updateSEO 
    }}>
      <HashRouter>
        <ScrollToTop />
        <SEOManager />
        <div className="min-h-screen flex flex-col selection:bg-[#1ba098] selection:text-[#051622] bg-[#051622] text-[#deb992]">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <ThemePanel />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;