import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, Observable, of } from 'rxjs';
import { environment } from '../../../environment/environment';
import { PokeAPI, PokemonDetails, PokemonSpecies, pokemonTypeColors, Results } from '../models/pokemon.interface';


@Injectable({
    providedIn: 'root'
})
export class PokemonService {

    private pokeAPI = environment.pokemonURL;
    private speciesURL = environment.pokemonSpeciesURL;

    pokemons!: PokeAPI;


    constructor(private http: HttpClient) { }


    fetchPokemon(): Observable<PokeAPI> {
        return this.http.get<PokeAPI>(`${this.pokeAPI}?limit=1025`).pipe(
            catchError((error) => {
                console.error('Error fetching Pokémon', error);
                return of({ count: 0, next: '', results: [] } as PokeAPI);
            })
        )
    }


    fetchPokemonDetails(name: any): Observable<PokemonDetails> {
        return this.http.get<PokemonDetails>(`${this.pokeAPI}/${name}`)
    }


    fetchPokemonSpecies(id: number): Observable<PokemonSpecies> {
        return this.http.get<PokemonSpecies>(`${this.speciesURL}/${id}`)
    }
}