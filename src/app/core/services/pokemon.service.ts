import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { color } from 'chart.js/helpers';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { PokeAPI, PokemonDetails, PokemonType, pokemonTypeColors, Results } from '../models/pokemon.interface';


@Injectable({
    providedIn: 'root'
})
export class PokemonService implements OnInit {

    pokeAPI: any;

    url = environment.pokemonURL;

    pokemons!: PokeAPI;
    pokemonCount = 0;
    pokemonShown = 36;
    pokemonMax = 1025;

    pokemonSaved: any[] = [];


    constructor(private http: HttpClient) {
        this.pokeAPI = environment.pokemonURL;
    }


    ngOnInit(): void { }


    fetchPokemon(): Observable<PokeAPI> {
        return this.http
            .get<PokeAPI>(`${this.pokeAPI}?limit=${this.pokemonMax}`)
    }


    fetchPokemonDetails(name: any): Observable<PokemonDetails> {
        return this.http
            .get<PokemonDetails>(`${this.pokeAPI}/${name}`)
    }


    getPokemons(): void {
        this.fetchPokemon().subscribe((data: PokeAPI) => {
            this.pokemons = data;
            // this.pokemonCount = 0;

            if (this.pokemons.results && this.pokemons.results.length) {
                this.pokemons.results
                    .slice(this.pokemonCount)
                    .forEach((pokemon) => {
                        if (this.pokemonCount < this.pokemonShown) {
                            pokemon.id = pokemon.url.split('/')[
                                pokemon.url.split('/').length - 2
                            ];
                            this.pokemonSaved.push(pokemon);
                            this.getPokemonDetails(pokemon);
                            if (this.pokemonCount < this.pokemonMax) {
                                this.pokemonCount++;
                                console.log('PokemonCount: ', this.pokemonCount);
                            }
                        }
                    });
                console.log(this.pokemonSaved);
            }
        });
    }


    getPokemonDetails(pokemon: Results): void {
        this.fetchPokemonDetails(pokemon.name)
            .subscribe((details: PokemonDetails) => {
                pokemon.details = details;
            });
    }


    getPokemonTypeColors(type: string): string {
        if (type) {
            return '#' + pokemonTypeColors[type as keyof typeof pokemonTypeColors];
        } else {
            return '';
        }
    }


    sanitizePokemonName(name: string): string {
        return name.replace(/-\w+$/, '');
    }
}