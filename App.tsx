import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu as MenuIcon, X, Instagram, Facebook, Mail, MapPin, 
  Phone, Settings, Check, ChevronRight, ArrowRight,
  Plus, Trash2, Globe, Layout, Utensils, PenTool, ExternalLink,
  Lock, LogOut, UserCheck, Image as ImageIcon, Eye, EyeOff, Maximize, Minimize, Save
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

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);
  return null;
};

const ScrollProgressBar = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScroll(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[100] pointer-events-none">
      <div 
        className="h-full bg-teal shadow-[0_0_10px_#1ba098] transition-all duration-100 ease-out origin-left"
        style={{ width: `${scroll}%` }}
      />
    </div>
  );
};

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
  const [scrolled, setScrolled] = useState(false);
  const { config } = useApp();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className={`sticky top-0 z-50 bg-navy text-sand border-b transition-all duration-500 backdrop-blur-md ${scrolled ? 'h-16 bg-opacity-95 border-teal/20 shadow-[0_0_30px_rgba(27,160,152,0.1)]' : 'h-24 bg-opacity-90 border-teal/30 shadow-xl'}`}>
      <div 
        className="mx-auto px-4 sm:px-6 lg:px-8 h-full transition-all duration-500"
        style={{ maxWidth: `${config.headerMaxWidth}px` }}
      >
        <div className="flex justify-between h-full items-center">
          <Link to="/" className="flex items-center group overflow-visible">
            {config.showLogoHeader && config.logoUrl ? (
              <div 
                style={{ padding: `${config.logoPadding}px 0` }}
                className="flex items-center justify-center transition-all duration-500 group-hover:scale-110 active:scale-95"
              >
                <img 
                  src={config.logoUrl} 
                  alt={`${config.name} Logo`} 
                  style={{ height: scrolled ? `${config.logoHeight * 0.75}px` : `${config.logoHeight}px` }}
                  className="w-auto object-contain transition-all duration-500 rounded-full border border-teal/10 shadow-lg"
                />
              </div>
            ) : (
              <div className="flex flex-col transition-all duration-500 group-hover:translate-x-1">
                <span className={`font-normal tracking-[0.15em] font-serif text-sand drop-shadow-[0_0_8px_rgba(222,185,146,0.3)] group-hover:text-teal group-hover:tracking-[0.2em] transition-all duration-500 leading-none ${scrolled ? 'text-2xl' : 'text-3xl'}`}>{config.name}</span>
                {!scrolled && <span className="text-[10px] uppercase tracking-[0.2em] text-teal font-bold hidden sm:block mt-1">Fine Dining & Seafood</span>}
              </div>
            )}
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              link.external ? (
                <a key={link.path} href={link.path} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold tracking-[0.2em] uppercase font-lora hover:text-teal hover:scale-105 active:scale-95 transition-all text-sand">
                  {link.name}
                </a>
              ) : (
                <Link key={link.path} to={link.path} className={`text-[10px] font-bold tracking-[0.2em] uppercase font-lora hover:text-teal hover:scale-105 active:scale-95 transition-all ${location.pathname === link.path ? 'text-teal border-b border-teal/40' : 'text-sand'}`}>
                  {link.name}
                </Link>
              )
            ))}
            <Link to="/reservations" className="bg-teal text-navy px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(27,160,152,0.6)] transition-all transform hover:scale-110 active:scale-95 font-lora ml-4 shadow-lg">Book Now</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-sand hover:text-teal transition-all p-2 active:scale-75">
              {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-navy border-t border-teal/30 animate-in fade-in slide-in-from-top duration-300 h-screen overflow-y-auto">
          <div className="px-6 py-8 space-y-2">
            {navLinks.map((link) => (
              link.external ? (
                <a key={link.path} href={link.path} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="block py-4 text-xl font-serif italic text-sand hover:text-teal border-b border-teal/10 hover:translate-x-2 transition-all">
                  {link.name}
                </a>
              ) : (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="block py-4 text-xl font-serif italic text-sand hover:text-teal border-b border-teal/10 hover:translate-x-2 transition-all">
                  {link.name}
                </Link>
              )
            ))}
            <div className="pt-8">
               <Link to="/reservations" onClick={() => setIsOpen(false)} className="block w-full text-center bg-teal text-navy px-6 py-5 rounded-2xl text-xs font-bold uppercase tracking-widest font-lora shadow-lg hover:bg-white transition-colors active:scale-95">Make a Reservation</Link>
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
    if (isAuthenticated) setIsDashboardOpen(true);
    else setShowLoginModal(true);
  };

  return (
    <footer className="bg-navy text-sand pt-24 pb-12 border-t border-teal/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-4 lg:col-span-5">
            <div className="flex flex-col items-start gap-8 mb-10">
              {config.showLogoFooter && config.logoUrl ? (
                <Link to="/" className="transition-all hover:scale-110 active:scale-95 duration-500 group">
                  <img 
                    src={config.logoUrl} 
                    alt={`${config.name} Logo Footer`} 
                    style={{ height: `${config.logoHeightFooter}px` }}
                    className="w-auto object-contain opacity-90 group-hover:opacity-100 group-hover:shadow-[0_0_20px_#deb99244] transition-all rounded-full border border-teal/10 shadow-lg"
                  />
                </Link>
              ) : (
                <h3 className="text-4xl font-normal font-serif text-teal tracking-tighter italic hover:scale-105 transition-transform cursor-default">{config.name}</h3>
              )}
              <p className="text-sand/70 text-lg leading-relaxed max-w-sm italic font-lora">
                {config.tagline}. Authentically British, distinctly New York.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-teal/30 flex items-center justify-center text-sand hover:text-navy hover:bg-teal hover:border-teal hover:scale-110 active:scale-90 transition-all duration-300 shadow-md hover:shadow-teal/20"><Instagram size={20} /></a>
              <a href={config.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-teal/30 flex items-center justify-center text-sand hover:text-navy hover:bg-teal hover:border-teal hover:scale-110 active:scale-90 transition-all duration-300 shadow-md hover:shadow-teal/20"><Facebook size={20} /></a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 text-teal/60 font-lora">Explore</h4>
            <ul className="space-y-5 text-sm font-lora italic">
              <li><Link to="/menu" className="text-sand/70 hover:text-teal hover:translate-x-1 transition-all inline-block">The Menu</Link></li>
              <li><Link to="/about" className="text-sand/70 hover:text-teal hover:translate-x-1 transition-all inline-block">Our Story</Link></li>
              <li><Link to="/reservations" className="text-sand/70 hover:text-teal hover:translate-x-1 transition-all inline-block">Bookings</Link></li>
              <li><Link to="/blog" className="text-sand/70 hover:text-teal hover:translate-x-1 transition-all inline-block">Notes</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 text-teal/60 font-lora">Visit</h4>
            <ul className="space-y-6 text-sm text-sand/70 font-lora">
              <li className="flex items-start italic leading-relaxed hover:translate-x-1 transition-transform cursor-default">
                <MapPin size={18} className="mr-4 mt-1 text-teal flex-shrink-0" />
                <span>{config.address}</span>
              </li>
              <li className="flex items-center italic hover:translate-x-1 transition-transform cursor-default">
                <Phone size={18} className="mr-4 text-teal flex-shrink-0" />
                <span>{config.phone}</span>
              </li>
              <li className="flex items-center italic group">
                <Mail size={18} className="mr-4 text-teal flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href={`mailto:${config.email}`} className="hover:text-teal transition-colors group-hover:translate-x-1 transform inline-block">{config.email}</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 text-teal/60 font-lora">Dispatch</h4>
            <p className="text-[11px] mb-6 italic opacity-50 uppercase tracking-widest font-bold">Join the inner circle.</p>
            <div className="flex group border-b border-teal/30 pb-2 focus-within:border-teal transition-colors">
              <input type="email" placeholder="Email" className="bg-transparent px-0 py-2 w-full text-xs outline-none text-sand font-lora placeholder-sand/30" />
              <button className="text-teal p-2 hover:translate-x-2 active:scale-75 transition-all cursor-pointer"><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-teal/10 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.4em] text-sand/40 font-lora">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center text-center md:text-left">
            <p>© {new Date().getFullYear()} {config.name}. All Rights Reserved.</p>
            <button onClick={handleStaffToggle} className="flex items-center gap-3 hover:text-teal transition-all group cursor-pointer font-bold hover:scale-105 active:scale-95">
              {isAuthenticated ? <Settings size={14} className="group-hover:rotate-90 transition-transform" /> : <Lock size={14} />} Staff Login
            </button>
          </div>
          <div className="flex space-x-10 mt-8 md:mt-0">
            <a href="#" className="hover:text-teal transition-colors hover:scale-105">Privacy</a>
            <a href="#" className="hover:text-teal transition-colors hover:scale-105">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ThemePanel = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'blog' | 'menu' | 'logo'>('general');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const { 
    config, updateConfig, menu, addItem, updateItem, deleteItem, 
    posts, addPost, updatePost, deletePost, seo, updateSEO, 
    isAuthenticated, login, logout, userEmail, isDashboardOpen, setIsDashboardOpen, showLoginModal, setShowLoginModal 
  } = useApp();
  const location = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === 'Dame Staff' && passwordInput === 'DAMESTAFF@0012') {
      login(usernameInput);
      setLoginError('');
      setUsernameInput('');
      setPasswordInput('');
      setShowLoginModal(false);
      setIsDashboardOpen(true);
    } else {
      setLoginError('Invalid username or password.');
      setPasswordInput('');
    }
  };

  const handleManualSave = () => {
    setIsSaving(true);
    // Simulating a brief delay for user feedback
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 600);
  };

  const currentSEO = seo[location.pathname] || { title: config.name, description: config.tagline, keywords: 'seafood, restaurant' };

  return (
    <>
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/98 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="max-w-md w-full bg-navy-light border border-teal/30 rounded-[48px] p-16 relative overflow-hidden shadow-2xl">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-12 right-12 text-sand/40 hover:text-teal transition-all hover:rotate-90 cursor-pointer active:scale-75"><X size={28} /></button>
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"><Lock size={36} /></div>
              <h2 className="text-3xl font-serif italic text-white mb-3 uppercase tracking-tighter">Staff Portal</h2>
              <p className="text-[10px] uppercase tracking-widest text-teal/60 font-bold">Authorized Access Only</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-sand/40 ml-4">Username</label>
                <input 
                  type="text" 
                  required 
                  value={usernameInput} 
                  onChange={(e) => { setUsernameInput(e.target.value); if (loginError) setLoginError(''); }} 
                  placeholder="Dame Staff" 
                  className={`w-full bg-navy border ${loginError ? 'border-red-500/50' : 'border-teal/20'} px-8 py-4 rounded-2xl outline-none text-sand placeholder-sand/10 text-sm focus:border-teal transition-colors`} 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-sand/40 ml-4">Password</label>
                <input 
                  type="password" 
                  required 
                  value={passwordInput} 
                  onChange={(e) => { setPasswordInput(e.target.value); if (loginError) setLoginError(''); }} 
                  placeholder="••••••••" 
                  className={`w-full bg-navy border ${loginError ? 'border-red-500/50' : 'border-teal/20'} px-8 py-4 rounded-2xl outline-none text-sand placeholder-sand/10 text-sm focus:border-teal transition-colors`} 
                />
              </div>
              {loginError && <p className="text-red-400 text-[10px] italic text-center font-bold tracking-widest uppercase">{loginError}</p>}
              <button type="submit" className="w-full bg-teal text-navy py-5 mt-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white hover:shadow-[0_0_20px_#1ba09888] transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer shadow-lg">Authenticate</button>
            </form>
          </div>
        </div>
      )}
      <div className={`fixed right-0 top-0 h-screen z-[60] transition-transform duration-700 ease-in-out ${isDashboardOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="w-[450px] h-full bg-navy shadow-[0_0_100px_rgba(0,0,0,0.8)] border-l border-teal/20 flex flex-col text-sand relative">
          <button onClick={() => setIsDashboardOpen(false)} className="absolute left-[-48px] top-8 bg-navy text-teal p-3 rounded-l-2xl border-y border-l border-teal/20 cursor-pointer hover:bg-navy-light hover:scale-110 active:scale-90 transition-all shadow-xl"><ChevronRight size={24} /></button>
          
          <div className="p-8 border-b border-teal/10 bg-navy-light/50">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-2xl font-serif italic text-teal tracking-tighter uppercase">Studio</h3>
                <div className="flex items-center gap-3 mt-2"><div className="w-2 h-2 rounded-full bg-teal animate-pulse"></div><span className="text-[9px] font-bold opacity-50 uppercase tracking-widest">{userEmail}</span></div>
              </div>
              <button onClick={() => { logout(); setIsDashboardOpen(false); }} className="p-3 text-sand/30 hover:text-red-400 transition-all hover:bg-red-400/5 hover:scale-110 active:scale-90 cursor-pointer rounded-xl" title="Logout"><LogOut size={20} /></button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[
                { id: 'general', icon: Layout, label: 'Core' }, 
                { id: 'logo', icon: ImageIcon, label: 'Brand' }, 
                { id: 'seo', icon: Globe, label: 'SEO' }, 
                { id: 'blog', icon: PenTool, label: 'Blog' }, 
                { id: 'menu', icon: Utensils, label: 'Menu' }
              ].map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id as any)} 
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all cursor-pointer border hover:scale-105 active:scale-95 ${activeTab === tab.id ? 'bg-teal border-teal text-navy shadow-lg shadow-teal/20' : 'bg-navy/50 border-teal/10 text-teal/60 hover:border-teal/30 hover:text-teal'}`}
                >
                  <tab.icon size={18} />
                  <span className="text-[8px] mt-2 font-bold uppercase tracking-tighter">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-10 pb-32 space-y-12 custom-scrollbar">
            {activeTab === 'general' && (
              <div className="space-y-10 animate-in slide-in-from-bottom duration-500">
                <div className="flex items-center gap-4 border-b border-teal/10 pb-4">
                  <Layout size={20} className="text-teal" />
                  <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-teal opacity-70">General Information</h4>
                </div>
                <div className="space-y-8">
                  <div><label className="block text-[10px] font-bold uppercase opacity-40 mb-3 tracking-widest">Site Name</label><input value={config.name} onChange={(e) => updateConfig({ name: e.target.value })} className="w-full bg-navy-light border border-teal/20 p-4 text-sm rounded-2xl text-sand outline-none focus:border-teal transition-colors" /></div>
                  <div><label className="block text-[10px] font-bold uppercase opacity-40 mb-3 tracking-widest">Tagline</label><input value={config.tagline} onChange={(e) => updateConfig({ tagline: e.target.value })} className="w-full bg-navy-light border border-teal/20 p-4 text-sm rounded-2xl text-sand outline-none focus:border-teal transition-colors" /></div>
                  <div><label className="block text-[10px] font-bold uppercase opacity-40 mb-3 tracking-widest">About Summary</label><textarea value={config.aboutText} onChange={(e) => updateConfig({ aboutText: e.target.value })} className="w-full bg-navy-light border border-teal/20 p-4 text-sm rounded-2xl h-40 text-sand outline-none resize-none focus:border-teal transition-colors" /></div>
                  <div><label className="block text-[10px] font-bold uppercase opacity-40 mb-3 tracking-widest">Address</label><input value={config.address} onChange={(e) => updateConfig({ address: e.target.value })} className="w-full bg-navy-light border border-teal/20 p-4 text-sm rounded-2xl text-sand outline-none focus:border-teal transition-colors" /></div>
                </div>
              </div>
            )}

            {activeTab === 'logo' && (
              <div className="space-y-12 animate-in slide-in-from-bottom duration-500">
                <div className="flex items-center gap-4 border-b border-teal/10 pb-4">
                  <ImageIcon size={20} className="text-teal" />
                  <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-teal opacity-70">Logo & Identity</h4>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-bold uppercase opacity-40 mb-3 tracking-widest">Logo Resource URL</label>
                    <input 
                      value={config.logoUrl} 
                      onChange={(e) => updateConfig({ logoUrl: e.target.value })} 
                      className="w-full bg-navy-light border border-teal/20 p-4 text-sm rounded-2xl text-sand outline-none mb-6 focus:border-teal transition-colors" 
                      placeholder="https://..." 
                    />
                    <div className="w-full aspect-video bg-navy-light flex items-center justify-center rounded-[32px] border border-teal/10 overflow-hidden relative group">
                      {config.logoUrl ? (
                        <img src={config.logoUrl} alt="Logo Preview" className="max-h-[80%] object-contain rounded-full shadow-2xl transition-transform group-hover:scale-110" />
                      ) : (
                        <div className="text-center p-8">
                          <ImageIcon size={40} className="mx-auto mb-4 opacity-10" />
                          <span className="text-[10px] opacity-20 uppercase tracking-widest font-bold">No Resource Link</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="block text-[10px] font-bold uppercase opacity-40 tracking-widest">Header Logo</label>
                      <button 
                        onClick={() => updateConfig({ showLogoHeader: !config.showLogoHeader })} 
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer active:scale-95 ${config.showLogoHeader ? 'border-teal bg-teal/10 text-teal shadow-inner' : 'border-teal/20 text-sand/30 hover:border-teal/40'}`}
                      >
                        <span className="text-[10px] font-bold tracking-widest">{config.showLogoHeader ? 'ENABLED' : 'DISABLED'}</span>
                        {config.showLogoHeader ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[10px] font-bold uppercase opacity-40 tracking-widest">Footer Logo</label>
                      <button 
                        onClick={() => updateConfig({ showLogoFooter: !config.showLogoFooter })} 
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer active:scale-95 ${config.showLogoFooter ? 'border-teal bg-teal/10 text-teal shadow-inner' : 'border-teal/20 text-sand/30 hover:border-teal/40'}`}
                      >
                        <span className="text-[10px] font-bold tracking-widest">{config.showLogoFooter ? 'ENABLED' : 'DISABLED'}</span>
                        {config.showLogoFooter ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] font-bold uppercase opacity-40 tracking-widest">Header Height</label>
                        <span className="text-[10px] font-bold text-teal">{config.logoHeight}px</span>
                      </div>
                      <input type="range" min="30" max="200" value={config.logoHeight} onChange={(e) => updateConfig({ logoHeight: parseInt(e.target.value) })} className="w-full h-1 bg-navy-light rounded-lg appearance-none cursor-pointer accent-teal border border-teal/10" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] font-bold uppercase opacity-40 tracking-widest">Header Container Max Width</label>
                        <span className="text-[10px] font-bold text-teal">{config.headerMaxWidth}px</span>
                      </div>
                      <input type="range" min="800" max="2560" step="20" value={config.headerMaxWidth} onChange={(e) => updateConfig({ headerMaxWidth: parseInt(e.target.value) })} className="w-full h-1 bg-navy-light rounded-lg appearance-none cursor-pointer accent-teal border border-teal/10" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] font-bold uppercase opacity-40 tracking-widest">Footer Height</label>
                        <span className="text-[10px] font-bold text-teal">{config.logoHeightFooter}px</span>
                      </div>
                      <input type="range" min="30" max="200" value={config.logoHeightFooter} onChange={(e) => updateConfig({ logoHeightFooter: parseInt(e.target.value) })} className="w-full h-1 bg-navy-light rounded-lg appearance-none cursor-pointer accent-teal border border-teal/10" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] font-bold uppercase opacity-40 tracking-widest">Outer Padding</label>
                        <span className="text-[10px] font-bold text-teal">{config.logoPadding}px</span>
                      </div>
                      <input type="range" min="0" max="80" value={config.logoPadding} onChange={(e) => updateConfig({ logoPadding: parseInt(e.target.value) })} className="w-full h-1 bg-navy-light rounded-lg appearance-none cursor-pointer accent-teal border border-teal/10" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-10 animate-in slide-in-from-bottom duration-500">
                <div className="flex items-center gap-4 border-b border-teal/10 pb-4">
                  <Globe size={20} className="text-teal" />
                  <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-teal opacity-70">Optimization: {location.pathname}</h4>
                </div>
                <div className="space-y-8">
                  <div><label className="block text-[10px] font-bold uppercase opacity-40 mb-3 tracking-widest">Meta Title</label><input value={currentSEO.title} onChange={(e) => updateSEO(location.pathname, { ...currentSEO, title: e.target.value })} className="w-full bg-navy-light border border-teal/20 p-4 text-sm rounded-2xl text-sand outline-none focus:border-teal transition-colors" /></div>
                  <div><label className="block text-[10px] font-bold uppercase opacity-40 mb-3 tracking-widest">Meta Description</label><textarea value={currentSEO.description} onChange={(e) => updateSEO(location.pathname, { ...currentSEO, description: e.target.value })} className="w-full bg-navy-light border border-teal/20 p-4 text-sm rounded-2xl h-40 text-sand outline-none resize-none focus:border-teal transition-colors" /></div>
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-10 animate-in slide-in-from-bottom duration-500">
                <button onClick={() => addPost({
                  id: Date.now().toString(),
                  title: 'New Dispatch',
                  excerpt: 'Kitchen updates...',
                  content: '',
                  author: 'Dame Staff',
                  date: new Date().toLocaleDateString(),
                  category: 'News',
                  image: 'https://images.unsplash.com/photo-1551632432-c735e8299bc2?auto=format&fit=crop&q=80&w=800'
                })} className="w-full bg-teal text-navy py-5 rounded-2xl font-bold uppercase tracking-widest text-xs cursor-pointer flex items-center justify-center gap-3 shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all"><Plus size={18} /> Add New Entry</button>
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id} className="p-6 bg-navy-light rounded-3xl border border-teal/10 group hover:border-teal/30 transition-all">
                      <div className="flex justify-between items-start mb-6">
                        <input value={post.title} onChange={(e) => updatePost(post.id, { title: e.target.value })} className="flex-grow bg-transparent border-none p-0 font-serif italic text-lg text-white outline-none focus:text-teal transition-colors" />
                        <button onClick={() => deletePost(post.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-red-400/10 hover:scale-110 active:scale-90 rounded-lg"><Trash2 size={16} /></button>
                      </div>
                      <textarea value={post.excerpt} onChange={(e) => updatePost(post.id, { excerpt: e.target.value })} className="w-full bg-navy/50 p-4 rounded-xl text-xs mb-4 border border-teal/5 outline-none h-28 resize-none font-lora italic opacity-60 focus:opacity-100 transition-all" />
                      <div className="grid grid-cols-2 gap-3">
                         <input value={post.author} onChange={(e) => updatePost(post.id, { author: e.target.value })} className="bg-navy/50 p-3 rounded-xl text-[10px] border border-teal/5 outline-none focus:border-teal/30 transition-colors" placeholder="Author" />
                         <input value={post.image} onChange={(e) => updatePost(post.id, { image: e.target.value })} className="bg-navy/50 p-3 rounded-xl text-[10px] border border-teal/5 outline-none focus:border-teal/30 transition-colors" placeholder="Img URL" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="space-y-10 animate-in slide-in-from-bottom duration-500">
                <button onClick={() => addItem({
                  id: Date.now().toString(),
                  name: 'Signature Dish',
                  description: 'Chef\'s selection...',
                  price: '$30',
                  category: 'Mains',
                  image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400'
                })} className="w-full bg-teal text-navy py-5 rounded-2xl font-bold uppercase tracking-widest text-xs cursor-pointer flex items-center justify-center gap-3 shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all"><Plus size={18} /> Add Menu Item</button>
                <div className="space-y-4">
                  {menu.map(item => (
                    <div key={item.id} className="p-6 bg-navy-light rounded-3xl border border-teal/10 group hover:border-teal/30 transition-all">
                      <div className="flex justify-between items-start mb-6">
                        <input value={item.name} onChange={(e) => updateItem(item.id, { name: e.target.value })} className="flex-grow bg-transparent border-none p-0 font-serif italic text-lg text-white outline-none focus:text-teal transition-colors" />
                        <button onClick={() => deleteItem(item.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-red-400/10 hover:scale-110 active:scale-90 rounded-lg"><Trash2 size={16} /></button>
                      </div>
                      <textarea value={item.description} onChange={(e) => updateItem(item.id, { description: e.target.value })} className="w-full bg-navy/50 p-4 rounded-xl text-xs mb-6 border border-teal/5 outline-none h-24 resize-none font-lora italic opacity-60 focus:opacity-100 transition-all" />
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <input value={item.price} onChange={(e) => updateItem(item.id, { price: e.target.value })} className="bg-navy/50 p-3 rounded-xl text-[10px] border border-teal/5 outline-none focus:border-teal/30 font-bold transition-colors" />
                        <select value={item.category} onChange={(e) => updateItem(item.id, { category: e.target.value as any })} className="bg-navy/50 p-3 rounded-xl text-[10px] border border-teal/5 text-teal/80 outline-none appearance-none focus:border-teal/30 transition-colors">
                          <option>Starters</option><option>Mains</option><option>Sides</option><option>Desserts</option><option>Drinks</option>
                        </select>
                      </div>
                      <input value={item.image} onChange={(e) => updateItem(item.id, { image: e.target.value })} className="w-full bg-navy/50 p-3 rounded-xl text-[10px] border border-teal/5 outline-none focus:border-teal/30 transition-colors" placeholder="Image Resource Link" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Dashboard Footer with Save Option */}
          <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-teal/10 bg-navy-light/90 backdrop-blur-md flex items-center justify-center gap-4">
            <button 
              onClick={handleManualSave} 
              disabled={isSaving}
              className={`flex-grow flex items-center justify-center gap-3 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all transform hover:scale-105 active:scale-95 shadow-xl ${
                saveSuccess ? 'bg-green-500 text-white' : 'bg-teal text-navy hover:bg-white'
              }`}
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin"></div>
              ) : saveSuccess ? (
                <Check size={18} />
              ) : (
                <Save size={18} />
              )}
              {isSaving ? 'Saving...' : saveSuccess ? 'All Changes Saved' : 'Save All Changes'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const App = () => {
  const loadInitial = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      console.warn(`Error loading state for ${key}`, e);
      return fallback;
    }
  };

  const [config, setConfig] = useState<SiteConfig>(() => loadInitial('dame_config', INITIAL_CONFIG));
  const [menu, setMenu] = useState<MenuItem[]>(() => loadInitial('dame_menu', MENU_ITEMS));
  const [posts, setPosts] = useState<BlogPost[]>(() => loadInitial('dame_posts', BLOG_POSTS));
  const [seo, setSeo] = useState<Record<string, SEOData>>(() => loadInitial('dame_seo', {}));
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('dame_auth') === 'true');
  const [userEmail, setUserEmail] = useState<string | null>(() => localStorage.getItem('dame_user'));
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => localStorage.setItem('dame_config', JSON.stringify(config)), [config]);
  useEffect(() => localStorage.setItem('dame_menu', JSON.stringify(menu)), [menu]);
  useEffect(() => localStorage.setItem('dame_posts', JSON.stringify(posts)), [posts]);
  useEffect(() => localStorage.setItem('dame_seo', JSON.stringify(seo)), [seo]);
  useEffect(() => {
    localStorage.setItem('dame_auth', isAuthenticated.toString());
    if (userEmail) localStorage.setItem('dame_user', userEmail);
    else localStorage.removeItem('dame_user');
  }, [isAuthenticated, userEmail]);

  const login = (email: string) => { setIsAuthenticated(true); setUserEmail(email); };
  const logout = () => { setIsAuthenticated(false); setUserEmail(null); setIsDashboardOpen(false); };
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
      config, menu, posts, seo, isAuthenticated, userEmail, login, logout, isDashboardOpen, setIsDashboardOpen, showLoginModal, setShowLoginModal, updateConfig, updateMenu, addItem, updateItem, deleteItem, updatePosts, addPost, updatePost, deletePost, updateSEO 
    }}>
      <HashRouter>
        <ScrollToTop />
        <SEOManager />
        <ScrollProgressBar />
        <div className="min-h-screen flex flex-col bg-navy text-sand selection:bg-teal selection:text-navy">
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