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


    /**
     * Sets the current search term.
     * This will trigger the filteredPokemon$ observable to update the filtered Pokemon list.
     * @param term - The search term to set.
     */
    setSearchTerm(term: string) {
        this.searchSubject.next(term);
    }


    /**
     * Sets the filtered list of Pokemon to the given list.
     * This will trigger the filteredPokemon$ observable to update the filtered Pokemon list.
     * @param pokemonList - The filtered list of Pokemon to set.
     */
    setFilteredPokemon(pokemonList: any[]) {
        this.filteredPokemonSubject.next(pokemonList);
    }
}
