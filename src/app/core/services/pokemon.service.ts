import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../environment/environment';
import { PokeAPI, PokemonDetails, PokemonSpecies } from '../models/pokemon.interface';


@Injectable({
    providedIn: 'root'
})
export class PokemonService {

    private pokeAPI = environment.pokemonURL;
    private speciesURL = environment.pokemonSpeciesURL;

    pokemons!: PokeAPI;


    constructor(private http: HttpClient) { }


    /**
     * Fetches a list of all available Pokémon from the PokeAPI.
     * Returns an Observable of a PokeAPI object, which contains a list of
     * Results objects, each of which contains a name, url, and id.
     * If the API request fails, it returns an Observable of a PokeAPI
     * object with an empty list of Results objects.
     */
    fetchPokemon(): Observable<PokeAPI> {
        return this.http.get<PokeAPI>(`${this.pokeAPI}?limit=1025`).pipe(
            catchError((error) => {
                console.error('Error fetching Pokémon', error);
                return of({ count: 0, next: '', results: [] } as PokeAPI);
            })
        )
    }


    /**
     * Fetches the details of a Pokémon from the PokeAPI.
     * @param name The name of the Pokémon to fetch.
     * @returns An Observable of a PokemonDetails object, which contains
     *          the details of the Pokémon.
     */
    fetchPokemonDetails(name: any): Observable<PokemonDetails> {
        return this.http.get<PokemonDetails>(`${this.pokeAPI}/${name}`)
    }


    /**
     * Fetches the species of a Pokémon from the PokeAPI.
     * @param id The id of the Pokémon to fetch the species of.
     * @returns An Observable of a PokemonSpecies object, which contains
     *          the species of the Pokémon.
     */
    fetchPokemonSpecies(id: number): Observable<PokemonSpecies> {
        return this.http.get<PokemonSpecies>(`${this.speciesURL}/${id}`)
    }
}