# 🎮 Pokédex App

A modern, interactive Pokédex built with Next.js and TypeScript that allows you to explore, search, and discover Pokémon with a beautiful, responsive interface.

🌐 **[Live Demo](https://poke-app-rose.vercel.app/)**

## ✨ Features

### 🔍 **Smart Search**

- **Real-time search** with 500ms debounce for optimal performance
- **Search by name or type** - find Pokémon instantly in the search bar
- **Intelligent search logic** - searches loaded Pokemon first, then fetches from API

### 🚀 **Performance & UX**

- **Infinite scroll** with optimized intersection observer
- **Batch loading** - Loads 20 Pokémon per page efficiently
- **Skeleton loading states** with smooth animations
- **Responsive design** - works perfectly on mobile, tablet, and desktop
- **Smooth animations** with staggered card appearances

### 🎨 **Beautiful Interface**

- **Gradient backgrounds** with floating animations
- **Glass morphism effects** with backdrop blur
- **Interactive hover states** and scale transformations
- **Type-specific colors** for easy visual identification
- **Loading animations** with spinning icons and pulse effects

### 📱 **Responsive Grid Layout**

- **Adaptive columns**: 1 (mobile) → 2 (sm) → 3 (md) → 4 (lg) → 5 (xl+)
- **Card-based design** with Pokemon images, names, types, and stats
- **Clickable cards** linking to detailed Pokemon pages

### 🔄 **Smart Data Management**

- **PokeAPI integration** - Fetches real-time data from the official Pokemon API
- **Evolution chains** - Interactive evolution trees with detailed requirements
- **Error handling** with graceful fallbacks and user-friendly messages
- **State management** with React hooks for smooth interactions
- **API caching** through browser cache for better performance

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives (shadcn/ui)
- **Icons**: Lucide React
- **API**: PokéAPI for Pokemon data
- **State Management**: React hooks (useState, useEffect, useCallback)
- **Performance**: Intersection Observer API for infinite scroll

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd poke-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint to check code quality |

## 📂 Project Structure

```text
poke-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Home page
│   │   └── pokemon/[id]/       # Dynamic Pokemon detail pages
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── pokemon-card.tsx    # Individual Pokemon card
│   │   ├── pokemon-grid.tsx    # Main grid with infinite scroll
│   │   └── evolution-chain.tsx # Pokemon evolution display
│   └── lib/                    # Utility functions and API
│       ├── pokemon-api.ts      # Pokemon API functions
│       └── utils.ts            # Utility functions
├── public/                     # Static assets
├── components.json             # shadcn/ui configuration
└── package.json               # Dependencies and scripts
```

## 🎯 How to Use

### 🔍 **Searching Pokemon**

1. Use the search bar at the top of the page
2. Type a Pokemon name (e.g., "pikachu") or type (e.g., "fire")
3. Results appear in real-time with 500ms debounce
4. Clear the search to return to browsing mode

### 📜 **Infinite Scrolling**

1. Scroll down to automatically load more Pokemon
2. New Pokemon appear in batches of 20 for optimal performance
3. Loading indicators show progress
4. Manual "Load More" button as fallback

### 👆 **Interactive Elements**

- **Hover effects** on cards and buttons with scale transformations
- **Click Pokemon cards** to view detailed information with full stats
- **Evolution chains** - Interactive evolution trees with requirements
- **Sprite galleries** - Multiple sprite variants (normal, shiny, official artwork)
- **Smooth animations** throughout the interface

## 🔧 Configuration

### Environment Variables

No environment variables are required as the app uses the public PokéAPI.

### Customization

- **Batch size**: Modify `limit` in `pokemon-grid.tsx` (currently 20)
- **Search debounce**: Adjust timeout in search effect (currently 500ms)
- **Animations**: Adjust timing in Tailwind classes

## 🌐 API Integration

The app integrates with PokéAPI:

- **PokéAPI** ([pokeapi.co](https://pokeapi.co)) for all Pokemon data
- **Smart search**: Searches loaded Pokemon first, then fetches from API
- **Efficient pagination**: Loads 20 Pokemon per batch for optimal performance

## 🎨 Design Features

- **Color-coded types** with official Pokemon type colors
- **Smooth transitions** with CSS transforms and animations
- **Glass morphism** effects with backdrop blur
- **Responsive typography** that scales with screen size
- **Accessible design** with proper contrast and keyboard navigation

## 📱 Browser Support

- **Chrome** (recommended)
- **Firefox**
- **Safari**
- **Edge**
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 🚧 Future Improvements

If we had more time, here are some exciting features we could implement:

### 🎮 **Enhanced User Experience**

- **Pokemon type filtering** - Interactive badges to filter Pokemon by type (Fire, Water, Grass, etc.)
- **Advanced search filters** - Filter by stats, generation, region, or abilities
- **Favorites system** - Save and organize your favorite Pokemon
- **Comparison tool** - Side-by-side Pokemon stat comparisons
- **Random Pokemon generator** - "Surprise me!" button for discovery

### 📊 **Data & Analytics**

- **Enhanced stat visualizations** - Charts and graphs for base stats comparison
- **Pokemon abilities database** - Detailed ability descriptions and effects
- **Move sets and learn sets** - Complete move information for each Pokemon
- **Pokemon locations** - Where to find Pokemon in games
- **Type effectiveness chart** - Battle effectiveness calculator

### 🎨 **Visual Enhancements**

- **Shiny Pokemon variants** - Toggle between normal and shiny forms
- **Pokemon size comparisons** - Visual size charts relative to humans
- **Dark mode** - Toggle between light and dark themes

### 🔧 **Technical Improvements**

- **Progressive Web App (PWA)** - Offline functionality and app-like experience
- **Virtual scrolling** - Handle thousands of Pokemon with better performance
- **Image optimization** - Next.js Image component with lazy loading
- **Caching strategy** - Service worker for offline Pokemon data
- **Unit testing** - Comprehensive test coverage with Jest and React Testing Library

### 📱 **Mobile Experience**

- **Swipe gestures** - Swipe through Pokemon cards on mobile
- **Haptic feedback** - Tactile responses for interactions
- **Mobile-first animations** - Optimized animations for touch devices
- **Share functionality** - Share Pokemon cards to social media

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
