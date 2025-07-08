export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites: {
    front_default: string;
    back_default?: string;
    front_shiny?: string;
    back_shiny?: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny?: string;
      };
      'home': {
        front_default?: string;
        front_shiny?: string;
      };
      'showdown': {
        front_default?: string;
        back_default?: string;
        front_shiny?: string;
        back_shiny?: string;
      };
      'dream_world': {
        front_default?: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionDetail {
  min_level?: number;
  trigger: {
    name: string;
  };
  item?: {
    name: string;
  };
  held_item?: {
    name: string;
  };
  time_of_day?: string;
  location?: {
    name: string;
  };
  min_happiness?: number;
  min_beauty?: number;
  min_affection?: number;
  relative_physical_stats?: number;
  party_species?: {
    name: string;
  };
  party_type?: {
    name: string;
  };
  trade_species?: {
    name: string;
  };
  needs_overworld_rain?: boolean;
  turn_upside_down?: boolean;
}

export interface EvolutionChainLink {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[];
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionChainLink;
}

export interface EvolutionNode {
  pokemon: Pokemon;
  evolutionDetails: EvolutionDetail[];
  evolves_to: EvolutionNode[];
}

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list');
  }
  return response.json();
}

export async function getPokemon(nameOrId: string | number): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon');
  }
  return response.json();
}

export async function getPokemonByUrl(url: string): Promise<Pokemon> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon');
  }
  return response.json();
}

export function getPokemonIdFromUrl(url: string): number {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
}

export async function getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
  const response = await fetch(`${BASE_URL}/pokemon-species/${nameOrId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon species');
  }
  return response.json();
}

export async function getEvolutionChain(url: string): Promise<EvolutionChain> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch evolution chain');
  }
  return response.json();
}

export async function getPokemonEvolutionChain(nameOrId: string | number): Promise<EvolutionNode> {
  try {
    const species = await getPokemonSpecies(nameOrId);
    const evolutionChain = await getEvolutionChain(species.evolution_chain.url);
    
    const buildEvolutionTree = async (chainLink: EvolutionChainLink): Promise<EvolutionNode> => {
      const pokemon = await getPokemon(chainLink.species.name);
      const evolves_to = await Promise.all(
        chainLink.evolves_to.map(link => buildEvolutionTree(link))
      );
      
      return {
        pokemon,
        evolutionDetails: chainLink.evolution_details,
        evolves_to
      };
    };
    
    return buildEvolutionTree(evolutionChain.chain);
  } catch (error) {
    console.error('Error fetching evolution chain:', error);
    throw error;
  }
}

export function formatEvolutionTrigger(details: EvolutionDetail): string {
  if (!details.trigger) return '';
  
  const trigger = details.trigger.name;
  const parts: string[] = [];
  
  if (trigger === 'level-up') {
    if (details.min_level) {
      parts.push(`Level ${details.min_level}`);
    }
    if (details.time_of_day) {
      parts.push(`during ${details.time_of_day}`);
    }
    if (details.location) {
      parts.push(`at ${details.location.name}`);
    }
    if (details.min_happiness) {
      parts.push(`with high happiness`);
    }
    if (details.min_affection) {
      parts.push(`with high affection`);
    }
    if (details.held_item) {
      parts.push(`while holding ${details.held_item.name}`);
    }
    if (details.party_species) {
      parts.push(`with ${details.party_species.name} in party`);
    }
    if (details.party_type) {
      parts.push(`with ${details.party_type.name} type in party`);
    }
    if (details.relative_physical_stats !== undefined) {
      const stat = details.relative_physical_stats;
      if (stat > 0) parts.push('when Attack > Defense');
      else if (stat < 0) parts.push('when Defense > Attack');
      else parts.push('when Attack = Defense');
    }
    return parts.length > 0 ? parts.join(', ') : 'Level up';
  }
  
  if (trigger === 'use-item' && details.item) {
    return `Use ${details.item.name}`;
  }
  
  if (trigger === 'trade') {
    if (details.held_item) {
      return `Trade while holding ${details.held_item.name}`;
    }
    if (details.trade_species) {
      return `Trade with ${details.trade_species.name}`;
    }
    return 'Trade';
  }
  
  return trigger.replace('-', ' ');
}

export function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };
  return colors[type] || 'bg-gray-400';
}