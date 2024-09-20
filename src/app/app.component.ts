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

  showScrollToTop: boolean = false;


  constructor(private pokemonService: PokemonService) { }


  ngOnInit(): void {
    this.loadAllPokemons();
  }


  /**
   * Fetches the list of all Pokemons and starts processing the data.
   */
  private loadAllPokemons(): void {
    this.startLoading();
    const startTime = performance.now();

    this.pokemonService.fetchPokemon().subscribe((data: PokeAPI) => {
      this.pokemonService.pokemons = data;
      this.processPokemonResults();

      const endTime = performance.now();
      this.loadingTime = endTime - startTime;
      this.finishLoading();
    });
  }


  /**
   * Processes the fetched Pokemon results by extracting IDs and loading additional data.
   */
  private processPokemonResults(): void {
    this.pokemonService.pokemons.results.forEach((pokemon) => {
      pokemon.id = this.extractPokemonId(pokemon.url);
      this.pokemonSaved.push(pokemon);
      this.loadPokemonData(pokemon);
    });
  }


  /**
   * Extracts the Pokemon ID from the provided URL.
   */
  private extractPokemonId(url: string): string {
    return url.split('/').slice(-2, -1)[0];
  }


  /**
   * Loads additional details and species data for a specific Pokemon.
   */
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


  /**
   * Displays a portion of the Pokemon list based on the current count and limit.
   */
  displayPokemons(): void {
    const pokemonsToDisplay = this.pokemonSaved.slice(this.pokemonCount, this.pokemonShown);
    pokemonsToDisplay.forEach(() => this.incrementPokemonCount());
  }


  /**
   * Increments the count of displayed Pokemons.
   */
  private incrementPokemonCount(): void {
    if (this.pokemonCount < this.pokemonMax) {
      this.pokemonCount++;
    }
  }


  /**
   * Gets the color associated with a specific Pokemon type.
   */
  getPokemonTypeColors(type: string): string {
    return type ? `#${pokemonTypeColors[type as keyof typeof pokemonTypeColors]}` : '';
  }


  /**
   * Loads more Pokemons when the user scrolls or requests more.
   */
  loadMorePokemons(): void {
    if (this.pokemonCount < this.pokemonMax) {
      this.increasePokemonMax();
      this.displayPokemons();
    }
  }


  /**
   * Increases the limit of displayed Pokemons.
   */
  private increasePokemonMax(): void {
    if ((this.pokemonCount + 36) < this.pokemonMax) {
      this.pokemonShown += 36;
    } else {
      this.pokemonShown = this.pokemonMax;
    }
  }


  /**
   * Helper method to mark the loading state as true.
   */
  private startLoading(): void {
    this.loading = true;
  }


  /**
   * Helper method to mark the loading state as false.
   */
  private finishLoading(): void {
    this.loading = false;
  }


  /**
   * Checks if the user has scrolled to the bottom of the card container
   * and if so, loads more Pokemons. Also shows/hides the "scroll to top" button
   * based on the scroll position.
   * @returns {void}
   */
  onScroll(): void {
    const scrollContainer = this.cardContainer.nativeElement;
    const scrollTop = scrollContainer.scrollTop;
    const shouldLoadMore = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight;

    this.showScrollToTop = scrollTop > 200;

    if (shouldLoadMore) {
      this.loadMorePokemons();
      console.log('Pokemon shown: ', this.pokemonShown, 'Pokemon max: ', this.pokemonMax, 'Pokemon count: ', this.pokemonCount);
    }
  }


  /**
   * Scrolls the Pokemon card container back to the top.
   */
  scrollToTop() {
    if (this.cardContainer) {
      this.cardContainer.nativeElement.scrollTop = 0;
    }
  }
}