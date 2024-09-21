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
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pokedex-angular';

  @ViewChild('cardContainer', { static: false }) cardContainer!: ElementRef;

  pokemonCount = 0;
  pokemonShown = 36;
  pokemonMax = 1025;
  batchSize = 50;

  pokemonSaved: any[] = [];
  loading: boolean = false;
  loadingTime: number = 0;

  showScrollToTop: boolean = false;

  constructor(private pokemonService: PokemonService) { }


  ngOnInit(): void {
    this.loadAllPokemons();
  }


  /**
   * Loads all Pokémon in batches. It starts the loading process and records the time it takes to load the first batch.
   * The loading time is used to calculate the delay for subsequent batches.
   */
  private loadAllPokemons(): void {
    this.startLoading();
    const startTime = performance.now();

    this.loadPokemonBatch(0);

    const endTime = performance.now();
    this.loadingTime = endTime - startTime;
  }


  /**
   * Loads a batch of Pokémon from the API. It starts the loading process for this batch, processes the results
   * and loads the next batch if there are more Pokémon to load. If the last batch is loaded, it finishes the
   * loading process.
   * @param startIndex - The starting index of the batch.
   */
  private loadPokemonBatch(startIndex: number): void {
    this.pokemonService.fetchPokemon(this.batchSize, startIndex).subscribe((data: PokeAPI) => {
      this.pokemonService.pokemons = data;

      this.processBatchPokemonResults(data.results);

      if (startIndex + this.batchSize < this.pokemonMax && data.results.length > 0) {
        setTimeout(() => {
          this.loadPokemonBatch(startIndex + this.batchSize);
        }, 50); // Adjust delay time as needed
      } else {
        this.finishLoading();
      }
    });
  }


  /**
   * Processes a batch of Pokémon from the API by extracting the ID from the URL, saving it to the list of
   * saved Pokémon and loading additional details and species data. Finally, it displays the Pokémon
   * on the page.
   * @param pokemonBatch - An array of Results, with each result containing the URL of the Pokémon.
   */
  private processBatchPokemonResults(pokemonBatch: Results[]): void {
    pokemonBatch.forEach((pokemon) => {
      pokemon.id = this.extractPokemonId(pokemon.url);
      this.pokemonSaved.push(pokemon);

      this.loadPokemonData(pokemon);
    });
    this.displayPokemons();
  }

  /**
   * Extracts the Pokémon ID from the provided URL.
   */
  private extractPokemonId(url: string): string {
    return url.split('/').slice(-2, -1)[0];
  }


  /**
   * Loads additional details and species data for a specific Pokémon.
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
   * Displays the currently loaded Pokémon up to the specified limit.
   */
  displayPokemons(): void {
    const pokemonsToDisplay = this.pokemonSaved.slice(this.pokemonCount, this.pokemonShown);
    pokemonsToDisplay.forEach(() => this.incrementPokemonCount());
  }


  /**
   * Increments the count of displayed Pokémon.
   */
  private incrementPokemonCount(): void {
    if (this.pokemonCount < this.pokemonMax) {
      this.pokemonCount++;
    }
  }


  /**
   * Gets the color associated with a specific Pokémon type.
   */
  getPokemonTypeColors(type: string): string {
    return type ? `#${pokemonTypeColors[type as keyof typeof pokemonTypeColors]}` : '';
  }


  /**
   * Loads more Pokémon when the user scrolls or requests more.
   */
  loadMorePokemons(): void {
    if (this.pokemonCount < this.pokemonMax) {
      this.increasePokemonMax();
      this.displayPokemons();
    }
  }


  /**
   * Increases the limit of displayed Pokémon.
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
  scrollToTop(): void {
    if (this.cardContainer) {
      this.cardContainer.nativeElement.scrollTop = 0;
    }
  }
}