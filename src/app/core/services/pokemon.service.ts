import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, delay, forkJoin, from, Observable, of } from 'rxjs';
import { environment } from '../../../environment/environment';
import { PokeAPI, PokemonDetails, PokemonSpecies } from '../models/pokemon.interface';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {

    private pokeAPI = environment.pokemonURL;
    private speciesURL = environment.pokemonSpeciesURL;
    private maxPokemon = 1025;

    pokemons!: PokeAPI;

    constructor(private http: HttpClient) { }


    /**
     * Fetches a list of Pokémon from the PokeAPI in batches.
     * @param limit Number of Pokémon to fetch per batch.
     * @param start Offset for the starting Pokémon index.
     * @returns An Observable of a PokeAPI object.
     */
    fetchPokemon(limit: number = 50, start: number = 0): Observable<PokeAPI> {
        // Adjust the limit for the last batch to not exceed maxPokemon
        const adjustedLimit = Math.min(limit, this.maxPokemon - start);

        // If we've reached or exceeded maxPokemon, return an empty result
        if (adjustedLimit <= 0) {
            return of({
                count: this.maxPokemon,
                next: null,
                previous: null,
                results: []
            });
        }

        return this.http.get<PokeAPI>(`${this.pokeAPI}?limit=${adjustedLimit}&offset=${start}`).pipe(
            catchError((error) => {
                console.error('Error fetching Pokémon', error);
                return of({
                    count: 0,
                    next: null,
                    previous: null,
                    results: []
                });
            })
        );
    }


    /**
     * Fetches the details of a Pokémon from the PokeAPI.
     * @param name The name of the Pokémon to fetch.
     * @returns An Observable of a PokemonDetails object.
     */
    fetchPokemonDetails(name: string): Observable<PokemonDetails> {
        return this.http.get<PokemonDetails>(`${this.pokeAPI}/${name}`).pipe(
            catchError((error) => {
                console.error(`Error fetching details for ${name}`, error);
                return of(null as any); // Return null if request fails
            })
        );
    }


    /**
     * Fetches the species of a Pokémon from the PokeAPI.
     * @param id The id of the Pokémon to fetch the species of.
     * @returns An Observable of a PokemonSpecies object.
     */
    fetchPokemonSpecies(id: number): Observable<PokemonSpecies> {
        return this.http.get<PokemonSpecies>(`${this.speciesURL}/${id}`).pipe(
            catchError((error) => {
                console.error(`Error fetching species for Pokemon ID ${id}`, error);
                return of(null as any); // Return null if request fails
            })
        );
    }


    /**
     * Fetches the details and species of Pokémon with a delay between requests.
     * @param pokemonList List of Pokémon to fetch data for.
     * @param delayMs Delay in milliseconds between each request.
     * @returns An Observable stream of fetched Pokémon details and species.
     */
    fetchPokemonDetailsAndSpecies(pokemonList: any[], delayMs: number = 300): Observable<any> {
        return from(pokemonList).pipe(
            concatMap((pokemon) => {
                const pokemonId = this.extractPokemonId(pokemon.url);
                return forkJoin({
                    details: this.fetchPokemonDetails(pokemon.name),
                    species: this.fetchPokemonSpecies(pokemonId),
                }).pipe(
                    delay(delayMs), // Delay between requests
                    catchError((error) => {
                        console.error(`Error fetching data for ${pokemon.name}`, error);
                        return of(null); // Return null if an error occurs
                    })
                );
            })
        );
    }


    /**
     * Extracts the Pokémon ID from the provided URL.
     * @param url The URL from which to extract the ID.
     * @returns The extracted ID as a number, or 0 if no match is found.
     */
    private extractPokemonId(url: string): number {
        const match = url.match(/\/pokemon\/(\d+)\//);
        return match ? parseInt(match[1], 10) : 0;
    }
}
