import { PokemonGrid } from '@/components/pokemon-grid';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating Pokeball Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-16 left-8 w-40 h-40 bg-red-100 rounded-full opacity-15 animate-bounce" 
          style={{animationDelay: '0s', animationDuration: '8s'}}
        ></div>
        <div 
          className="absolute top-32 right-16 w-32 h-32 bg-yellow-100 rounded-full opacity-15 animate-bounce" 
          style={{animationDelay: '3s', animationDuration: '10s'}}
        ></div>
        <div 
          className="absolute bottom-48 left-16 w-28 h-28 bg-green-100 rounded-full opacity-15 animate-bounce" 
          style={{animationDelay: '6s', animationDuration: '9s'}}
        ></div>
        <div 
          className="absolute bottom-32 right-8 w-36 h-36 bg-blue-100 rounded-full opacity-15 animate-bounce" 
          style={{animationDelay: '2s', animationDuration: '11s'}}
        ></div>
        <div 
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-100 rounded-full opacity-10 animate-bounce" 
          style={{animationDelay: '4s', animationDuration: '7s'}}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-20 h-20 bg-pink-100 rounded-full opacity-10 animate-bounce" 
          style={{animationDelay: '1s', animationDuration: '12s'}}
        ></div>
      </div>
      
      {/* Sparkle effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-24 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-ping" 
          style={{animationDelay: '0s', animationDuration: '3s'}}
        ></div>
        <div 
          className="absolute top-40 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-ping" 
          style={{animationDelay: '1s', animationDuration: '4s'}}
        ></div>
        <div 
          className="absolute bottom-64 left-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" 
          style={{animationDelay: '2s', animationDuration: '3.5s'}}
        ></div>
        <div 
          className="absolute bottom-32 right-1/2 w-2 h-2 bg-purple-400 rounded-full animate-ping" 
          style={{animationDelay: '0.5s', animationDuration: '4.5s'}}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-12">
          {/* Animated title with gradient */}
          <div className="relative">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-pulse">
              Pokédex
            </h1>
            {/* Magical glow effect */}
            <div className="absolute inset-0 text-6xl md:text-7xl font-bold text-blue-300 opacity-20 blur-sm animate-pulse">
              Pokédex
            </div>
          </div>
          
          <p className="text-xl text-gray-700 mb-6 font-medium">
            ✨ Discover and explore the magical world of Pokémon ✨
          </p>
          
          {/* Decorative elements */}
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
            <div className="text-2xl animate-bounce">🎮</div>
            <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          </div>
        </header>
        
        <main className="relative">
          {/* Background decoration for grid */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl border border-white/30 shadow-2xl -z-10"></div>
          <div className="p-6 md:p-8">
            <PokemonGrid />
          </div>
        </main>
      </div>
    </div>
  );
}
