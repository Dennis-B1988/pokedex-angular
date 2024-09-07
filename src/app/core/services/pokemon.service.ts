import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { PokeAPI, PokemonDetails, PokemonType, pokemonTypeColors, Results } from '../models/pokemon.interface';


@Injectable({
    providedIn: 'root'
})
export class PokemonService implements OnInit {


    pokeAPI: any;
    pokeSpeciesAPI: any;

    url = environment.pokemonURL;
    pokemons!: PokeAPI;
    pokemonCount = 10

    pokemonSaved: any[] = [];


    constructor(private http: HttpClient) {
        this.pokeAPI = environment.pokemonURL;
        this.pokeSpeciesAPI = environment.pokemonSpeciesURL;
    }


    ngOnInit(): void {
        // this.getPokemons();
        // console.log(this.pokemonSaved);
    }


    fetchPokemon(): Observable<PokeAPI> {
        return this.http
            .get<PokeAPI>(`${this.pokeAPI}?limit=${this.pokemonCount}`)
    }


    fetchPokemonDetails(name: any): Observable<PokemonDetails> {
        return this.http
            .get<PokemonDetails>(`${this.pokeAPI}/${name}`)
    }


    getPokemons(): void {
        this.fetchPokemon().subscribe((data: PokeAPI) => {
            this.pokemons = data;

            if (this.pokemons.results && this.pokemons.results.length) {
                this.pokemons.results.forEach((pokemon) => {
                    pokemon.id = pokemon.url.split('/')[
                        pokemon.url.split('/').length - 2
                    ];
                    this.pokemonSaved.push(pokemon);

                    this.getPokemonDetails(pokemon);
                    // this.getPokemonSpeciesDetails(pokemon);
                });
            }
        });
    }


    getPokemonDetails(pokemon: Results): void {
        this.fetchPokemonDetails(pokemon.name)
            .subscribe((details: PokemonDetails) => {
                pokemon.details = details;

                // if (pokemon.id === '151') {
                // this.pokemonsLoaded = true;
                // this.exportPokemons.emit(this.pokemons.results);
                // console.log(this.pokemonSaved[0].details?.types?.[0]);

                // console.log(`Details for ${pokemon.name}:`, pokemon.details);

                // if (pokemon.details && pokemon.details.types) {
                // console.log(`Types for ${pokemon.name}:`, pokemon.details.types);
                // this.getPokemonTypes();
                // console.log(`${pokemon.name}: ${pokemon.details.types
                //   .map((typeInfo: PokemonType) => typeInfo.type.name)
                //   .join(', ')}`);
            }

            );
    }


    getPokemonTypes(): void {
        this.pokemonSaved.forEach(pokemon => {
            // if (pokemon.types && pokemon.details.types) {
            console.log(`${pokemon.name}: ${pokemon.details.types
                .map((typeInfo: PokemonType) => typeInfo.type.name)
                .join(', ')}`);
            // }
        })
    }


    getPokemonTypeColors(type: string): string {
        if (type) {
            return '#' + pokemonTypeColors[type as keyof typeof pokemonTypeColors];
        } else {
            return '';
        }
    }
}