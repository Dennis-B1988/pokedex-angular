import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { PokeAPI, PokemonDetails } from '../models/pokemon.interface';


@Injectable({
    providedIn: 'root'
})
export class PokemonService implements OnInit {


    pokeAPI: any;
    pokeSpeciesAPI: any;

    constructor(private http: HttpClient) {
        this.pokeAPI = environment.pokemonURL;
        this.pokeSpeciesAPI = environment.pokemonSpeciesURL;
    }


    ngOnInit(): void {
        // this.getPokemons();
    }


    getPokemon(): Observable<PokeAPI> {
        return this.http
            .get<PokeAPI>(`${this.pokeAPI}?limit=1000`)
    }


    getPokemonDetails(name: any): Observable<PokemonDetails> {
        return this.http
            .get<PokemonDetails>(`${this.pokeAPI}/${name}`)
    }
}