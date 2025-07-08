'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Pokemon, getPokemonList, getPokemonByUrl, getPokemon } from '@/lib/pokemon-api';
import { PokemonCard } from '@/components/pokemon-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

export function PokemonGrid() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const limit = 20;

  const loadPokemon = async (currentOffset: number, append: boolean = false) => {
    try {
      const response = await getPokemonList(limit, currentOffset);
      const pokemonDetails = await Promise.all(
        response.results.map(p => getPokemonByUrl(p.url))
      );
      
      if (append) {
        setPokemon(prev => [...prev, ...pokemonDetails]);
      } else {
        setPokemon(pokemonDetails);
      }
      
      setHasMore(response.next !== null);
    } catch (error) {
      console.error('Error loading Pokemon:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadPokemon(0);
  }, []);

  const searchPokemon = useCallback(async (searchQuery: string) => {
    if (!searchQuery) {
      setSearchedPokemon(null);
      setFilteredPokemon(pokemon);
      return;
    }

    setSearchLoading(true);
    
    // First, filter existing loaded Pokemon
    const filtered = pokemon.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.types.some(type => type.type.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    // If we find matches in loaded Pokemon, use them
    if (filtered.length > 0) {
      setFilteredPokemon(filtered);
      setSearchedPokemon(null);
      setSearchLoading(false);
      return;
    }
    
    // If no matches found in loaded Pokemon, try to fetch from API
    try {
      const pokemonData = await getPokemon(searchQuery.toLowerCase());
      setSearchedPokemon(pokemonData);
      setFilteredPokemon([]);
    } catch (error) {
      console.error('Pokemon not found:', error);
      setSearchedPokemon(null);
      setFilteredPokemon([]);
    }
    
    setSearchLoading(false);
  }, [pokemon]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchPokemon(searchTerm);
    }, 300); // Debounce search
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchPokemon]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    const newOffset = offset + limit;
    setOffset(newOffset);
    await loadPokemon(newOffset, true);
  }, [loadingMore, hasMore, offset, limit]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !searchTerm) {
          loadMore();
        }
      },
      {
        threshold: 1.0,
        rootMargin: '100px'
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore, loadingMore, searchTerm]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-8">
          <div className="inline-block animate-spin text-6xl mb-4">⚡</div>
          <p className="text-2xl text-gray-600 font-bold">Loading Pokemon...</p>
          <p className="text-gray-500">Get ready for an adventure!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-lg animate-pulse"
              style={{animationDelay: `${i * 0.1}s`}}
            >
              <Skeleton className="h-24 w-24 mx-auto mb-3 rounded-full" />
              <Skeleton className="h-4 w-20 mx-auto mb-2 rounded-full" />
              <Skeleton className="h-6 w-32 mx-auto mb-3 rounded-full" />
              <div className="flex gap-2 justify-center">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="w-full max-w-lg mx-auto">
        <div className="relative group">
          <Input
            type="text"
            placeholder="🔍 Search Pokemon by name or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 text-lg pl-6 pr-12 rounded-2xl border-2 border-purple-200 bg-white/80 backdrop-blur-sm shadow-xl focus:shadow-2xl focus:border-purple-400 transition-all duration-300 placeholder:text-gray-500 group-hover:scale-105"
          />
          {/* Search icon with animation */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl animate-pulse">
            🎯
          </div>
          {/* Magical glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {searchedPokemon && (
          <div className="relative">
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full animate-bounce z-10">
              🎯 Found!
            </div>
            <PokemonCard key={searchedPokemon.id} pokemon={searchedPokemon} />
          </div>
        )}
        {filteredPokemon.map((p, index) => (
          <div 
            key={p.id} 
            className="animate-fadeIn"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <PokemonCard pokemon={p} />
          </div>
        ))}
      </div>
      
      {searchLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin text-4xl mb-4">⚡</div>
          <p className="text-lg text-gray-600 font-medium">Searching for Pokemon...</p>
        </div>
      )}
      
      {filteredPokemon.length === 0 && !searchedPokemon && !loading && !searchLoading && searchTerm && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 animate-bounce">😅</div>
          <p className="text-xl text-gray-600 font-medium mb-2">Oops! No Pokemon found</p>
          <p className="text-gray-500">Try searching for &quot;{searchTerm}&quot; with a different spelling</p>
        </div>
      )}
      
      {/* Intersection observer sentinel */}
      {hasMore && !searchTerm && (
        <div ref={sentinelRef} className="flex justify-center py-6">
          {loadingMore && (
            <div className="w-full space-y-6">
              <div className="text-center">
                <div className="inline-block animate-spin text-4xl mb-4">🔄</div>
                <p className="text-lg text-gray-600 font-medium">Loading more Pokemon...</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-lg animate-pulse">
                    <Skeleton className="h-24 w-24 mx-auto mb-3 rounded-full" />
                    <Skeleton className="h-4 w-20 mx-auto mb-2 rounded-full" />
                    <Skeleton className="h-6 w-32 mx-auto mb-3 rounded-full" />
                    <div className="flex gap-2 justify-center">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Fallback manual load more button */}
      {hasMore && !searchTerm && !loadingMore && (
        <div className="flex justify-center py-6">
          <Button 
            onClick={loadMore} 
            disabled={loadingMore}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="mr-2">🎮</span>
            Load More Pokemon
          </Button>
        </div>
      )}
    </div>
  );
}