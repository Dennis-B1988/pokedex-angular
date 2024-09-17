import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HeaderComponent } from "./components/header/header.component";
import { PokeAPI, pokemonTypeColors, Results } from './core/models/pokemon.interface';
import { PokemonService } from './core/services/pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pokedex-angular';

  @ViewChild('cardContainer', { static: false }) cardContainer!: ElementRef;

  pokemonCount = 0;
  pokemonShown = 36;
  pokemonMax = 1025;

  pokemonSaved: any[] = [];
  loading: boolean = false;
  loadingTime: number = 0;

  constructor(private pokemonService: PokemonService) { }


  ngOnInit(): void {
    this.loadAllPokemons();
  }


  loadAllPokemons(): void {
    this.loading = true;  // Start loading
    const startTime = performance.now();

    this.pokemonService.fetchPokemon().subscribe((data: PokeAPI) => {
      this.pokemonService.pokemons = data;
      this.processPokemonResults();

      console.log(this.pokemonSaved);

      const endTime = performance.now();
      this.loadingTime = endTime - startTime;  // Calculate loading time
      this.loading = false;  // Stop loading
      console.log(`Data loading completed in ${this.loadingTime}ms`);
    });
  }


  private processPokemonResults(): void {
    this.pokemonService.pokemons.results.forEach((pokemon) => {
      pokemon.id = this.extractPokemonId(pokemon.url);
      this.pokemonSaved.push(pokemon);
      this.loadPokemonData(pokemon);
    });
  }


  private extractPokemonId(url: string): string {
    return url.split('/').slice(-2, -1)[0];
  }


  private loadPokemonData(pokemon: Results): void {
    if (pokemon.id) {
      const pokemonId = parseInt(pokemon.id, 10);
      forkJoin({
        details: this.pokemonService.fetchPokemonDetails(pokemon.name),
        species: this.pokemonService.fetchPokemonSpecies(pokemonId)
      }).subscribe(({ details, species }) => {
        pokemon.details = details;
        pokemon.species = species;
      });
    }
  }


  displayPokemons(): void {
    const pokemonsToDisplay = this.pokemonSaved.slice(this.pokemonCount, this.pokemonShown);
    pokemonsToDisplay.forEach(() => this.incrementPokemonCount());
  }


  private incrementPokemonCount(): void {
    if (this.pokemonCount < this.pokemonMax) {
      this.pokemonCount++;
    }
  }


  getPokemonTypeColors(type: string): string {
    return type ? `#${pokemonTypeColors[type as keyof typeof pokemonTypeColors]}` : '';
  }


  loadMorePokemons(): void {
    if (this.pokemonCount < this.pokemonMax) {
      this.increasePokemonMax();
      this.displayPokemons();
    }
  }


  private increasePokemonMax(): void {
    if ((this.pokemonCount + 36) < this.pokemonMax) {
      this.pokemonShown += 36;
    } else {
      this.pokemonShown = this.pokemonMax;
    }
  }


  onScroll(): void {
    const scrollContainer = this.cardContainer.nativeElement;
    const morePokemon = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight;
    if (morePokemon) {
      this.loadMorePokemons();
    }
  }


  scrollToTop() {
    if (this.cardContainer) {
      this.cardContainer.nativeElement.scrollTop = 0;
    }
  }
}