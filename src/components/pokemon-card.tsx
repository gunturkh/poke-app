'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pokemon, getTypeColor } from '@/lib/pokemon-api';
import Image from 'next/image';
import Link from 'next/link';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const imageUrl = pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default;

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardContent className="p-4 relative z-10">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">#{pokemon.id.toString().padStart(3, '0')}</div>
            <div className="relative w-24 h-24 mb-2 group-hover:scale-110 transition-transform duration-300">
              <Image
                src={imageUrl}
                alt={pokemon.name}
                fill
                className="object-contain"
                sizes="96px"
                priority
              />
            </div>
            <h3 className="text-lg font-semibold capitalize text-center group-hover:text-blue-700 transition-colors">{pokemon.name}</h3>
            <div className="flex flex-wrap gap-1 justify-center">
              {pokemon.types.map((type) => (
                <Badge
                  key={type.type.name}
                  className={`${getTypeColor(type.type.name)} text-white text-xs px-2 py-1 group-hover:scale-110 transition-transform duration-300`}
                >
                  {type.type.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}