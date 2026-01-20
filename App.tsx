import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu as MenuIcon, X, Instagram, Facebook, Mail, MapPin, 
  Phone, Settings, Check, ChevronRight, ArrowRight,
  Plus, Trash2, Globe, Layout, Utensils, PenTool, ExternalLink,
  Lock, LogOut, UserCheck, Image as ImageIcon
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
    <nav className="sticky top-0 z-50 bg-navy text-sand border-b border-teal/30 shadow-xl backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex flex-col items-center group">
            <span className="text-3xl font-normal tracking-[0.15em] font-serif text-sand drop-shadow-[0_0_8px_rgba(222,185,146,0.3)] group-hover:tracking-[0.2em] transition-all duration-500">{config.name}</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-teal font-bold hidden sm:block">Fine Dining & Seafood</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              link.external ? (
                <a key={link.path} href={link.path} target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-widest uppercase font-lora hover:text-teal transition-all text-sand">
                  {link.name}
                </a>
              ) : (
                <Link key={link.path} to={link.path} className={`text-xs font-bold tracking-widest uppercase font-lora hover:text-teal transition-all ${location.pathname === link.path ? 'text-teal border-b border-teal' : 'text-sand'}`}>
                  {link.name}
                </Link>
              )
            ))}
          </div>
          <div className="hidden md:block">
            <Link to="/reservations" className="bg-teal text-navy px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-sand hover:shadow-[0_0_15px_rgba(27,160,152,0.4)] transition-all font-lora">Book Now</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-sand hover:text-teal transition-colors">
              {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-navy border-t border-teal/30 animate-in fade-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              link.external ? (
                <a key={link.path} href={link.path} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-sand hover:text-teal border-b border-teal/10 font-lora">
                  {link.name}
                </a>
              ) : (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-sand hover:text-teal border-b border-teal/10 font-lora">
                  {link.name}
                </Link>
              )
            ))}
            <div className="pt-6">
               <Link to="/reservations" onClick={() => setIsOpen(false)} className="block w-full text-center bg-teal text-navy px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest font-lora shadow-lg">Make a Reservation</Link>
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
    <footer className="bg-navy text-sand pt-20 pb-10 border-t border-teal/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-3xl font-normal font-serif mb-6 text-teal tracking-[0.1em]">{config.name}</h3>
            <p className="text-sand text-sm leading-relaxed mb-6 opacity-80 font-lora italic">Modern British seafood in the heart of Greenwich Village.</p>
            <div className="flex space-x-4">
              <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-teal/30 flex items-center justify-center text-sand hover:text-navy hover:bg-teal transition-all"><Instagram size={18} /></a>
              <a href={config.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-teal/30 flex items-center justify-center text-sand hover:text-navy hover:bg-teal transition-all"><Facebook size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-teal font-lora opacity-80">Navigation</h4>
            <ul className="space-y-4 text-sm font-lora">
              <li><Link to="/menu" className="text-sand hover:text-teal transition-colors">The Menu</Link></li>
              <li><Link to="/reservations" className="text-sand hover:text-teal transition-colors">Reservations</Link></li>
              <li><Link to="/blog" className="text-sand hover:text-teal transition-colors">Kitchen Notes</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-teal font-lora opacity-80">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-sand font-lora">
              <li className="flex items-start"><MapPin size={16} className="mr-3 mt-0.5 text-teal" /><span className="opacity-80 leading-relaxed">{config.address}</span></li>
              <li className="flex items-center"><Phone size={16} className="mr-3 text-teal" /><span className="opacity-80">{config.phone}</span></li>
              <li className="flex items-center"><Mail size={16} className="mr-3 text-teal" /><a href={`mailto:${config.email}`} className="opacity-80 hover:text-teal transition-colors">{config.email}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-teal font-lora opacity-80">Newsletter</h4>
            <div className="flex group">
              <input type="email" placeholder="Email address" className="bg-navy-light border border-teal/30 px-4 py-3 w-full text-sm outline-none text-sand font-lora placeholder-sand/30" />
              <button className="bg-teal px-5 py-3 hover:bg-sand transition-colors text-navy flex items-center justify-center"><ArrowRight size={20} /></button>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-teal/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-sand opacity-40 font-lora">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <p>© {new Date().getFullYear()} {config.name}. Built with Precision.</p>
            <button onClick={handleStaffToggle} className="flex items-center gap-2 hover:text-teal transition-colors group cursor-pointer">
              {isAuthenticated ? <Settings size={12} className="group-hover:rotate-90 transition-transform" /> : <Lock size={12} />} Staff Portal
            </button>
          </div>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-teal transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ThemePanel = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'blog' | 'menu'>('general');
  const [emailInput, setEmailInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const { 
    config, updateConfig, menu, addItem, updateItem, deleteItem, 
    posts, addPost, updatePost, deletePost, seo, updateSEO, 
    isAuthenticated, login, logout, userEmail, isDashboardOpen, setIsDashboardOpen, showLoginModal, setShowLoginModal 
  } = useApp();
  const location = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailInput.toLowerCase();
    if (email.includes('@damenewyork.com') || email === 'admin') {
      login(email === 'admin' ? 'admin@damenewyork.com' : email);
      setLoginError('');
      setShowLoginModal(false);
      setIsDashboardOpen(true);
    } else {
      setLoginError('Access denied. Staff email required.');
    }
  };

  const currentSEO = seo[location.pathname] || { title: config.name, description: config.tagline, keywords: 'seafood, restaurant' };

  return (
    <>
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="max-w-md w-full bg-navy-light border border-teal/30 rounded-[40px] p-12 relative overflow-hidden shadow-2xl">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-8 right-8 text-sand/50 hover:text-teal transition-colors cursor-pointer"><X size={24} /></button>
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto mb-6"><Lock size={32} /></div>
              <h2 className="text-3xl font-serif italic text-white mb-2 uppercase tracking-tighter">Staff Portal</h2>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <input type="text" required value={emailInput} onChange={(e) => { setEmailInput(e.target.value); if (loginError) setLoginError(''); }} placeholder="Staff Email or ID" className={`w-full bg-navy border ${loginError ? 'border-red-400' : 'border-teal/20'} px-6 py-4 rounded-2xl outline-none text-sand placeholder-sand/20`} />
              {loginError && <p className="text-red-400 text-[10px] italic">{loginError}</p>}
              <button type="submit" className="w-full bg-teal text-navy py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-sand transition-all cursor-pointer">Enter Dashboard</button>
            </form>
          </div>
        </div>
      )}
      <div className={`fixed right-0 top-0 h-screen z-[60] transition-transform duration-500 ease-in-out ${isDashboardOpen ? 'translate-x-0' : 'translate-x-full shadow-none'}`}>
        <div className="w-[420px] h-full bg-navy shadow-2xl border-l border-teal/30 flex flex-col text-sand relative">
          <button onClick={() => setIsDashboardOpen(false)} className="absolute left-[-40px] top-6 bg-navy text-sand p-2 rounded-l-lg border-y border-l border-teal/30 cursor-pointer hover:text-teal transition-colors"><ChevronRight size={24} /></button>
          
          <div className="p-6 border-b border-teal/30 bg-navy-light">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold font-serif text-teal tracking-wider uppercase italic">CMS Dashboard</h3>
                <div className="flex items-center gap-2 mt-1"><UserCheck size={10} className="text-teal" /><span className="text-[9px] font-bold opacity-40 truncate max-w-[150px]">{userEmail}</span></div>
              </div>
              <button onClick={() => { logout(); setIsDashboardOpen(false); }} className="p-2 text-sand/40 hover:text-red-400 transition-colors cursor-pointer" title="Sign Out"><LogOut size={18} /></button>
            </div>
            <div className="flex gap-2">
              {[{ id: 'general', icon: Layout, label: 'Global' }, { id: 'seo', icon: Globe, label: 'SEO' }, { id: 'blog', icon: PenTool, label: 'Blog' }, { id: 'menu', icon: Utensils, label: 'Menu' }].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl transition-all cursor-pointer ${activeTab === tab.id ? 'bg-teal text-navy' : 'bg-navy text-teal/60 hover:text-teal'}`}><tab.icon size={18} /><span className="text-[8px] mt-1 font-bold uppercase">{tab.label}</span></button>
              ))}
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {activeTab === 'general' && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <p className="text-[10px] font-bold text-teal uppercase tracking-[0.2em] mb-4">Restaurant Identity</p>
                <div><label className="block text-[10px] font-bold uppercase opacity-50 mb-2">Name</label><input value={config.name} onChange={(e) => updateConfig({ name: e.target.value })} className="w-full bg-navy-light border border-teal/30 p-3 text-sm rounded-xl text-sand outline-none" /></div>
                <div><label className="block text-[10px] font-bold uppercase opacity-50 mb-2">Tagline</label><input value={config.tagline} onChange={(e) => updateConfig({ tagline: e.target.value })} className="w-full bg-navy-light border border-teal/30 p-3 text-sm rounded-xl text-sand outline-none" /></div>
                <div><label className="block text-[10px] font-bold uppercase opacity-50 mb-2">About Summary</label><textarea value={config.aboutText} onChange={(e) => updateConfig({ aboutText: e.target.value })} className="w-full bg-navy-light border border-teal/30 p-3 text-sm rounded-xl h-32 text-sand outline-none resize-none" /></div>
                <div><label className="block text-[10px] font-bold uppercase opacity-50 mb-2">Address</label><input value={config.address} onChange={(e) => updateConfig({ address: e.target.value })} className="w-full bg-navy-light border border-teal/30 p-3 text-sm rounded-xl text-sand outline-none" /></div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <p className="text-[10px] font-bold text-teal uppercase tracking-[0.2em] mb-4">SEO Config: {location.pathname}</p>
                <div><label className="block text-[10px] font-bold uppercase opacity-50 mb-2">Meta Title</label><input value={currentSEO.title} onChange={(e) => updateSEO(location.pathname, { ...currentSEO, title: e.target.value })} className="w-full bg-navy-light border border-teal/30 p-3 text-sm rounded-xl text-sand outline-none" /></div>
                <div><label className="block text-[10px] font-bold uppercase opacity-50 mb-2">Meta Description</label><textarea value={currentSEO.description} onChange={(e) => updateSEO(location.pathname, { ...currentSEO, description: e.target.value })} className="w-full bg-navy-light border border-teal/30 p-3 text-sm rounded-xl h-32 text-sand outline-none resize-none" /></div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <button onClick={() => addPost({
                  id: Date.now().toString(),
                  title: 'New Dispatch',
                  excerpt: 'Kitchen updates...',
                  content: '',
                  author: 'Dame Staff',
                  date: new Date().toLocaleDateString(),
                  category: 'News',
                  image: 'https://images.unsplash.com/photo-1551632432-c735e8299bc2?auto=format&fit=crop&q=80&w=800'
                })} className="w-full bg-teal text-navy py-4 rounded-xl font-bold uppercase tracking-widest text-xs cursor-pointer flex items-center justify-center gap-2"><Plus size={16} /> New Post</button>
                {posts.map(post => (
                  <div key={post.id} className="p-4 bg-navy-light rounded-2xl border border-teal/10 group">
                    <div className="flex justify-between items-start mb-3">
                      <input value={post.title} onChange={(e) => updatePost(post.id, { title: e.target.value })} className="flex-grow bg-transparent border-none p-0 font-bold text-white focus:ring-0 outline-none" />
                      <button onClick={() => deletePost(post.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                    </div>
                    <textarea value={post.excerpt} onChange={(e) => updatePost(post.id, { excerpt: e.target.value })} className="w-full bg-navy p-2 rounded-lg text-[10px] mb-2 border border-teal/10 outline-none h-20 resize-none" placeholder="Excerpt..." />
                    <div className="flex gap-2">
                       <input value={post.author} onChange={(e) => updatePost(post.id, { author: e.target.value })} className="flex-1 bg-navy p-2 rounded-lg text-[10px] border border-teal/10 outline-none" placeholder="Author..." />
                       <input value={post.image} onChange={(e) => updatePost(post.id, { image: e.target.value })} className="flex-1 bg-navy p-2 rounded-lg text-[10px] border border-teal/10 outline-none" placeholder="Image URL..." />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <button onClick={() => addItem({
                  id: Date.now().toString(),
                  name: 'Signature Dish',
                  description: 'Chef\'s selection...',
                  price: '$30',
                  category: 'Mains',
                  image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400'
                })} className="w-full bg-teal text-navy py-4 rounded-xl font-bold uppercase tracking-widest text-xs cursor-pointer flex items-center justify-center gap-2"><Plus size={16} /> New Item</button>
                {menu.map(item => (
                  <div key={item.id} className="p-4 bg-navy-light rounded-2xl border border-teal/10 group">
                    <div className="flex justify-between items-start mb-3">
                      <input value={item.name} onChange={(e) => updateItem(item.id, { name: e.target.value })} className="flex-grow bg-transparent border-none p-0 font-bold text-white focus:ring-0 outline-none" />
                      <button onClick={() => deleteItem(item.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                    </div>
                    <textarea value={item.description} onChange={(e) => updateItem(item.id, { description: e.target.value })} className="w-full bg-navy p-2 rounded-lg text-[10px] mb-3 border border-teal/10 outline-none h-16 resize-none" placeholder="Description..." />
                    <div className="flex gap-2 mb-2">
                      <input value={item.price} onChange={(e) => updateItem(item.id, { price: e.target.value })} className="w-20 bg-navy p-2 rounded-lg text-[10px] border border-teal/10 outline-none" placeholder="Price..." />
                      <select value={item.category} onChange={(e) => updateItem(item.id, { category: e.target.value as any })} className="flex-grow bg-navy p-2 rounded-lg text-[10px] border border-teal/10 text-white/50">
                        <option>Starters</option><option>Mains</option><option>Sides</option><option>Desserts</option><option>Drinks</option>
                      </select>
                    </div>
                    <input value={item.image} onChange={(e) => updateItem(item.id, { image: e.target.value })} className="w-full bg-navy p-2 rounded-lg text-[10px] border border-teal/10 outline-none" placeholder="Image URL..." />
                  </div>
                ))}
              </div>
            )}
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