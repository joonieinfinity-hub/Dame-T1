
import { MenuItem, BlogPost, SiteConfig } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  name: "Dame",
  tagline: "Premium Seafood & Modern British Cuisine",
  primaryColor: "#051622", // Deep Navy
  secondaryColor: "#1ba098", // Teal
  accentColor: "#deb992", // Sand
  address: "87 MacDougal Street, New York, NY 10012",
  phone: "(929) 367-7370",
  email: "marmalade@damenewyork.com",
  instagram: "https://www.instagram.com/dame_nyc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  facebook: "https://facebook.com/damerestaurant",
  heroImages: [
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1551632432-c735e8299bc2?auto=format&fit=crop&q=80&w=1920"
  ],
  aboutText: "Dame is a love letter to the British seafood tradition, reimagined with New York energy. Founded on the principle of sourcing the finest sustainable seafood, we focus on clarity of flavor and precision in execution.",
  aboutImage: "https://images.unsplash.com/photo-1550966841-391ad5fed2aa?auto=format&fit=crop&q=80&w=800",
  operatingHours: [
    "Mon - Thu: 5:00 PM - 10:00 PM",
    "Fri - Sat: 5:00 PM - 11:00 PM",
    "Sun: 12:00 PM - 9:00 PM"
  ],
  // Updated Logo Settings with the user-provided image
  logoUrl: "https://image2url.com/r2/default/images/1768915452491-fb96a77d-2a9e-4450-a140-d09dbf6f1d02.jpeg",
  logoHeight: 80,
  logoHeightFooter: 60,
  logoPadding: 16,
  showLogoHeader: true,
  showLogoFooter: true
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Grilled Oysters with Green Chartreuse Hollandaise',
    description: 'Grilled oysters topped with a vibrant green Chartreuse hollandaise sauce.',
    price: '$5 each',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1599481238332-b81e86ac1014?auto=format&fit=crop&q=80&w=600',
    tags: ['GF']
  },
  {
    id: '2',
    name: 'Squid & Scallion Skewers',
    description: 'Char-grilled squid skewers paired with scallions and herbs.',
    price: '$16',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?auto=format&fit=crop&q=80&w=600',
    tags: ['GF']
  },
  {
    id: '3',
    name: 'Crumpet with Smoked Whitefish & Welsh Rarebit',
    description: 'Toasted crumpet with smoked whitefish and rich Welsh rarebit.',
    price: '$18',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1626202114466-411606a7df11?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '4',
    name: 'Raw Scallops with Apple & Kohlrabi',
    description: 'Fresh scallops paired with crisp apple and kohlrabi.',
    price: '$22',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1604544079120-83ef42bac757?auto=format&fit=crop&q=80&w=600',
    tags: ['GF']
  },
  {
    id: '5',
    name: 'Poached Leeks with Gribiche & Cantabrian Anchovies',
    description: 'Delicate poached leeks dressed with gribiche and anchovies.',
    price: '$21',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1588653018267-33f7d4681691?auto=format&fit=crop&q=80&w=600',
    tags: ['GF']
  },
  {
    id: '6',
    name: 'Tuna Tartare & Bottarga on Toast',
    description: 'Hand-chopped tuna tartare and bottarga served on crisp toast.',
    price: '$27',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '7',
    name: 'Butter Beans with Chanterelles & Boquerones',
    description: 'Creamy butter beans with sautéed chanterelles and boquerones.',
    price: '$24',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600',
    tags: ['GF']
  },
  {
    id: '8',
    name: 'Grilled Cabbage with Smoked Mussels & Horseradish',
    description: 'Charred cabbage with smoked mussels and horseradish.',
    price: '$26',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&q=80&w=600',
    tags: ['GF']
  },
  {
    id: '9',
    name: 'Fish & Chips',
    description: 'Classic fish and chips with crispy batter and golden fries.',
    price: '$32',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '10',
    name: 'Kedgeree Rice with Curried Crab',
    description: 'Creamy kedgeree rice with savory curried crab.',
    price: '$36',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1623961990059-28356e226a77?auto=format&fit=crop&q=80&w=600',
    tags: ['GF']
  },
  {
    id: '11',
    name: 'Poached Cod with Lentils & Mushrooms',
    description: 'Delicate poached cod atop lentils and mushrooms.',
    price: '$38',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1534948665115-3bd423986ec2?auto=format&fit=crop&q=80&w=600',
    tags: ['GF']
  },
  {
    id: '12',
    name: 'Whole Dover Sole with Bacon, Parsley & Manila Clams (for two)',
    description: 'Whole Dover sole served with bacon, parsley and Manila clams.',
    price: '$88',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600',
    tags: ['GF']
  },
  {
    id: '13',
    name: 'Proper English Chips',
    description: 'Thick-cut chips, British style.',
    price: '$14',
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&q=80&w=600',
    tags: ['GF', 'V']
  },
  {
    id: '14',
    name: 'Sourdough Bread & Butter',
    description: 'Classic sourdough served with butter.',
    price: '$6',
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80&w=600',
    tags: ['V']
  },
  {
    id: '15',
    name: 'Banoffee Pie',
    description: 'Sweet banoffee pie with banana and toffee.',
    price: '$15',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=600',
    tags: ['V']
  },
  {
    id: '16',
    name: 'Sticky Toffee Pudding',
    description: 'Rich sticky toffee pudding with caramel sauce.',
    price: '$16',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600',
    tags: ['V']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Sourcing: From Sea to Plate',
    excerpt: 'Discover how we partner with local fishermen to bring the freshest catch to our kitchen daily.',
    content: 'Full story about sourcing goes here...',
    author: 'Chef Ed Szymanski',
    date: 'Oct 24, 2024',
    category: 'Chef Notes',
    image: 'https://images.unsplash.com/photo-1498654203945-422837cadc3d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Autumn Menu Preview',
    excerpt: 'As the seasons change, so does our menu. Here is a look at what is coming this fall.',
    content: 'Seasonal menu details...',
    author: 'Dame Team',
    date: 'Nov 02, 2024',
    category: 'Menu Updates',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800'
  }
];