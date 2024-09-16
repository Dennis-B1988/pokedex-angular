import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private searchSubject = new BehaviorSubject<string>('');
    search$ = this.searchSubject.asObservable();

    private filteredPokemonSubject = new BehaviorSubject<any[]>([]);
    filteredPokemon$ = this.filteredPokemonSubject.asObservable();


    setSearchTerm(term: string) {
        console.log('Search term:', term);
        this.searchSubject.next(term);
    }

    setFilteredPokemon(pokemonList: any[]) {
        this.filteredPokemonSubject.next(pokemonList);
        console.log('Filtered Pokemon:', pokemonList);
    }
}
