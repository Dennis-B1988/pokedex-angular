import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy {

  app = inject(AppComponent);

  search: string = '';
  filteredPokemon: any[] = [];
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor() { }


  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.searchPokemon();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchChange() {
    this.searchSubject.next(this.search);
  }

  searchPokemon() {
    if (this.search.length >= 3) {
      this.filteredPokemon = this.app.pokemonSaved
        .filter(pokemon => pokemon.name.toLowerCase().includes(this.search.toLowerCase()))
        .slice(0, 10);
      console.log(this.filteredPokemon);
    } else {
      this.filteredPokemon = [];
    }
  }

  // searchPokemon() {
  //   this.filteredPokemon = [];

  //   if (this.search.length >= 3) {
  //     let maximumDisplay = 0;
  //     this.app.pokemonSaved.forEach((pokemon) => {
  //       if (pokemon.name.toLowerCase().includes(this.search.toLowerCase())) {
  //         if (maximumDisplay < 10) {
  //           this.filteredPokemon.push(pokemon);
  //           maximumDisplay++;
  //           console.log(this.filteredPokemon);
  //         }
  //       }
  //     })
  //   }
  // }
}
