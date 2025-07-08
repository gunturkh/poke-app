/* eslint-disable @typescript-eslint/no-unused-vars */
import { getPokemon, getTypeColor } from '@/lib/pokemon-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EvolutionChain } from '@/components/evolution-chain';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PokemonDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const { id } = await params;
  
  try {
    const pokemon = await getPokemon(id);
    const imageUrl = pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Floating Pokeball Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-32 h-32 bg-red-100 rounded-full opacity-20 animate-bounce" 
            style={{animationDelay: '0s', animationDuration: '6s'}}
          ></div>
          <div 
            className="absolute top-40 right-20 w-24 h-24 bg-yellow-100 rounded-full opacity-20 animate-bounce" 
            style={{animationDelay: '2s', animationDuration: '8s'}}
          ></div>
          <div 
            className="absolute bottom-40 left-20 w-20 h-20 bg-green-100 rounded-full opacity-20 animate-bounce" 
            style={{animationDelay: '4s', animationDuration: '7s'}}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-28 h-28 bg-blue-100 rounded-full opacity-20 animate-bounce" 
            style={{animationDelay: '1s', animationDuration: '9s'}}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="mb-6">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <ArrowLeft className="h-4 w-4" />
                Back to Pokédex
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 via-pink-200/20 to-purple-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-center">
                  <div className="text-sm text-gray-500 font-mono bg-gray-100 px-3 py-1 rounded-full inline-block mb-2 group-hover:bg-yellow-100 transition-colors">#{pokemon.id.toString().padStart(3, '0')}</div>
                  <div className="text-3xl font-bold capitalize bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">{pokemon.name}</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {pokemon.types.map((type, index) => (
                    <Badge
                      key={type.type.name}
                      className={`${getTypeColor(type.type.name)} text-white font-semibold px-4 py-2 text-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse`}
                      style={{animationDelay: `${index * 0.2}s`, animationDuration: '2s'}}
                    >
                      ✨ {type.type.name}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-center mb-6">
                  <div className="relative w-56 h-56 group/image">
                    {/* Magical circle background */}
                    <div 
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 opacity-30 animate-spin" 
                      style={{animationDuration: '20s'}}
                    ></div>
                    <div 
                      className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200 opacity-20 animate-spin" 
                      style={{animationDuration: '15s', animationDirection: 'reverse'}}
                    ></div>
                    
                    {/* Pokemon image with hover effects */}
                    <div className="absolute inset-4 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center group-hover/image:scale-110 transition-transform duration-500">
                      <Image
                        src={imageUrl}
                        alt={pokemon.name}
                        fill
                        className="object-contain drop-shadow-2xl group-hover/image:drop-shadow-3xl transition-all duration-500"
                        sizes="224px"
                        priority
                      />
                    </div>
                    
                    {/* Sparkle effects */}
                    <div 
                      className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping" 
                      style={{animationDelay: '0s'}}
                    ></div>
                    <div 
                      className="absolute bottom-8 left-6 w-2 h-2 bg-pink-400 rounded-full animate-ping" 
                      style={{animationDelay: '1s'}}
                    ></div>
                    <div 
                      className="absolute top-12 left-8 w-2 h-2 bg-blue-400 rounded-full animate-ping" 
                      style={{animationDelay: '2s'}}
                    ></div>
                    <div 
                      className="absolute bottom-6 right-12 w-3 h-3 bg-purple-400 rounded-full animate-ping" 
                      style={{animationDelay: '0.5s'}}
                    ></div>
                  </div>
                </div>
              
                {/* Additional Sprites */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border-2 border-dashed border-blue-200">
                  <h3 className="text-lg font-bold text-center mb-4 text-gray-700">🎨 Sprite Gallery</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {pokemon.sprites.front_default && (
                      <div className="text-center group/sprite">
                        <div className="text-xs text-gray-600 mb-2 font-semibold">👀 Front</div>
                        <div className="relative w-20 h-20 mx-auto border-2 border-blue-200 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover/sprite:scale-110 group-hover/sprite:rotate-3">
                          <Image
                            src={pokemon.sprites.front_default}
                            alt={`${pokemon.name} front`}
                            fill
                            className="object-contain p-1"
                            sizes="80px"
                          />
                        </div>
                      </div>
                    )}
                    {pokemon.sprites.back_default && (
                      <div className="text-center group/sprite">
                        <div className="text-xs text-gray-600 mb-2 font-semibold">🔄 Back</div>
                        <div className="relative w-20 h-20 mx-auto border-2 border-green-200 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover/sprite:scale-110 group-hover/sprite:rotate-3">
                          <Image
                            src={pokemon.sprites.back_default}
                            alt={`${pokemon.name} back`}
                            fill
                            className="object-contain p-1"
                            sizes="80px"
                          />
                        </div>
                      </div>
                    )}
                    {pokemon.sprites.front_shiny && (
                      <div className="text-center group/sprite">
                        <div className="text-xs text-gray-600 mb-2 font-semibold">✨ Shiny</div>
                        <div className="relative w-20 h-20 mx-auto border-2 border-yellow-300 rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 group-hover/sprite:scale-110 group-hover/sprite:rotate-3">
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-20 rounded-xl animate-pulse"></div>
                          <Image
                            src={pokemon.sprites.front_shiny}
                            alt={`${pokemon.name} shiny`}
                            fill
                            className="object-contain p-1 relative z-10"
                            sizes="80px"
                          />
                        </div>
                      </div>
                    )}
                    {pokemon.sprites.other?.['official-artwork']?.front_shiny && (
                      <div className="text-center group/sprite">
                        <div className="text-xs text-gray-600 mb-2 font-semibold">🌟 Shiny Art</div>
                        <div className="relative w-20 h-20 mx-auto border-2 border-yellow-300 rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 group-hover/sprite:scale-110 group-hover/sprite:rotate-3">
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-20 rounded-xl animate-pulse"></div>
                          <Image
                            src={pokemon.sprites.other['official-artwork'].front_shiny}
                            alt={`${pokemon.name} shiny artwork`}
                            fill
                            className="object-contain p-1 relative z-10"
                            sizes="80px"
                          />
                        </div>
                      </div>
                    )}
                    {pokemon.sprites.other?.home?.front_default && (
                      <div className="text-center group/sprite">
                        <div className="text-xs text-gray-600 mb-2 font-semibold">🏠 Home</div>
                        <div className="relative w-20 h-20 mx-auto border-2 border-indigo-200 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 group-hover/sprite:scale-110 group-hover/sprite:rotate-3">
                          <Image
                            src={pokemon.sprites.other.home.front_default}
                            alt={`${pokemon.name} home`}
                            fill
                            className="object-contain p-1"
                            sizes="80px"
                          />
                        </div>
                      </div>
                    )}
                    {pokemon.sprites.other?.dream_world?.front_default && (
                      <div className="text-center group/sprite">
                        <div className="text-xs text-gray-600 mb-2 font-semibold">💭 Dream</div>
                        <div className="relative w-20 h-20 mx-auto border-2 border-purple-200 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg hover:shadow-xl transition-all duration-300 group-hover/sprite:scale-110 group-hover/sprite:rotate-3">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 rounded-xl animate-pulse"></div>
                          <Image
                            src={pokemon.sprites.other.dream_world.front_default}
                            alt={`${pokemon.name} dream world`}
                            fill
                            className="object-contain p-1 relative z-10"
                            sizes="80px"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
            </CardContent>
          </Card>

            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 via-blue-200/20 to-purple-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
                    📏 Physical Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 hover:scale-105 transition-transform duration-300">
                      <div className="text-sm text-blue-600 font-semibold mb-1">📐 Height</div>
                      <div className="text-2xl font-bold text-blue-700">{pokemon.height / 10} m</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 hover:scale-105 transition-transform duration-300">
                      <div className="text-sm text-green-600 font-semibold mb-1">⚖️ Weight</div>
                      <div className="text-2xl font-bold text-green-700">{pokemon.weight / 10} kg</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 via-pink-200/20 to-red-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
                    ⚡ Abilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-3">
                    {pokemon.abilities.map((ability, index) => (
                      <Badge 
                        key={ability.ability.name} 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-4 py-2 text-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse"
                        style={{animationDelay: `${index * 0.3}s`, animationDuration: '3s'}}
                      >
                        🔮 {ability.ability.name.replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 via-yellow-200/20 to-red-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
                    📊 Base Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    {pokemon.stats.map((stat, index) => {
                      const percentage = Math.min((stat.base_stat / 255) * 100, 100);
                      const getStatColor = (statName: string) => {
                        switch (statName) {
                          case 'hp': return 'from-red-400 to-red-600';
                          case 'attack': return 'from-orange-400 to-orange-600';
                          case 'defense': return 'from-blue-400 to-blue-600';
                          case 'special-attack': return 'from-purple-400 to-purple-600';
                          case 'special-defense': return 'from-green-400 to-green-600';
                          case 'speed': return 'from-yellow-400 to-yellow-600';
                          default: return 'from-gray-400 to-gray-600';
                        }
                      };
                      
                      return (
                        <div key={stat.stat.name} className="group/stat">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold capitalize text-gray-700">
                              {stat.stat.name.replace('-', ' ')}
                            </span>
                            <span className="text-sm font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded-full">{stat.base_stat}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                            <div
                              className={`bg-gradient-to-r ${getStatColor(stat.stat.name)} h-3 rounded-full transition-all duration-1000 shadow-lg relative overflow-hidden`}
                              style={{ 
                                width: `${percentage}%`,
                                animationDelay: `${index * 0.2}s`
                              }}
                            >
                              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-8 col-span-full">
            <EvolutionChain pokemonId={id} />
          </div>
        </div>
      </div>
    );
  } catch (_error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Pokémon Not Found</h1>
          <p className="text-gray-600 mb-4">The Pokémon you&rsquo;re looking for doesn&rsquo;t exist.</p>
          <Link href="/">
            <Button>Return to Pokédex</Button>
          </Link>
        </div>
      </div>
    );
  }
}