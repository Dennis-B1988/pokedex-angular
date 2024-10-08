export const pokemonTypeColors = {
    normal: 'A8A878',
    fire: 'F08030',
    water: '6890F0',
    electric: 'F8D030',
    grass: '78C850',
    ice: '98D8D8',
    fighting: 'C03028',
    poison: 'A040A0',
    ground: 'E0C068',
    flying: 'A890F0',
    psychic: 'F85888',
    bug: 'A8B820',
    rock: 'B8A038',
    ghost: '705898',
    dragon: '7038F8',
    dark: '705848',
    steel: 'B8B8D0',
    fairy: 'EE99AC'
};


export interface Results {
    name: string;
    url: string;
    id?: string;
    details?: PokemonDetails;
    species?: PokemonSpecies;
}


export interface PokeAPI {
    count: number;
    next: string | null;
    previous: string | null;
    results: Results[];
}


export interface PokemonDetails {
    name: string;
    id: number;
    sprites: Sprites;
    types?: PokemonType;
}


export interface PokemonSpecies {
    name: string;
    id: number;
    evolves_from_species?: string;
}


export interface Sprites {
    other: {
        'official-artwork': {
            front_default: string;
        };
    }
    ;
}


export interface PokemonType {
    type: {
        name: string;
    };
}