'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { EvolutionNode, getPokemonEvolutionChain, formatEvolutionTrigger, getTypeColor } from '@/lib/pokemon-api';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface EvolutionChainProps {
  pokemonId: string | number;
}

export function EvolutionChain({ pokemonId }: EvolutionChainProps) {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        setLoading(true);
        setError(null);
        const chain = await getPokemonEvolutionChain(pokemonId);
        setEvolutionChain(chain);
      } catch (err) {
        console.error('Error fetching evolution chain:', err);
        setError('Failed to load evolution chain');
      } finally {
        setLoading(false);
      }
    };

    fetchEvolutionChain();
  }, [pokemonId]);

  const renderEvolutionNode = (node: EvolutionNode, level: number = 0): React.ReactNode => {
    const imageUrl = node.pokemon.sprites.other['official-artwork']?.front_default || node.pokemon.sprites.front_default;
    
    return (
      <div key={node.pokemon.id} className="flex flex-col md:flex-row items-center">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Evolution requirement */}
          {level > 0 && node.evolutionDetails.length > 0 && (
            <div className="flex flex-col items-center text-center">
              <ChevronRight className="h-6 w-6 text-gray-400 mb-2 rotate-90 md:rotate-0" />
              <div className="text-xs text-gray-500 max-w-32 leading-tight bg-gray-50 p-2 rounded-md border">
                <div className="font-semibold text-gray-700 mb-1">Evolution</div>
                {node.evolutionDetails.map((detail, index) => (
                  <div key={index} className="mb-1">
                    {formatEvolutionTrigger(detail)}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Pokemon card */}
          <Link href={`/pokemon/${node.pokemon.id}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105 w-36">
              <CardContent className="p-3">
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-xs text-gray-500">
                    #{node.pokemon.id.toString().padStart(3, '0')}
                  </div>
                  <div className="relative w-20 h-20 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={imageUrl}
                      alt={node.pokemon.name}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                  <h4 className="text-sm font-semibold capitalize text-center group-hover:text-blue-700 transition-colors">
                    {node.pokemon.name}
                  </h4>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {node.pokemon.types.map((type) => (
                      <Badge
                        key={type.type.name}
                        className={`${getTypeColor(type.type.name)} text-white text-xs px-1 py-0.5 group-hover:scale-105 transition-transform duration-300`}
                      >
                        {type.type.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        {/* Render evolutions */}
        {node.evolves_to.length > 0 && (
          <div className="mt-4 md:mt-0 md:ml-4 flex flex-col md:flex-row flex-wrap gap-4 justify-center">
            {node.evolves_to.map((evolution) => 
              renderEvolutionNode(evolution, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evolution Chain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                {i > 0 && <ChevronRight className="h-6 w-6 text-gray-400" />}
                <div className="border rounded-lg p-3 w-32">
                  <Skeleton className="h-4 w-12 mx-auto mb-2" />
                  <Skeleton className="h-16 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-20 mx-auto mb-2" />
                  <div className="flex gap-1 justify-center">
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evolution Chain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-4">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!evolutionChain) {
    return null;
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/20 via-purple-200/20 to-pink-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="text-2xl font-bold text-gray-700 flex items-center justify-center gap-2">
          🔄 Evolution Chain
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-dashed border-indigo-200">
          <div className="flex justify-center overflow-x-auto pb-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
              {renderEvolutionNode(evolutionChain)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}