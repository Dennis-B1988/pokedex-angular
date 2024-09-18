import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, inject, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { StatsChartComponent } from '../stats-chart/stats-chart.component';

@Component({
  selector: 'app-big-card',
  standalone: true,
  imports: [CommonModule, StatsChartComponent],
  templateUrl: './big-card.component.html',
  styleUrl: './big-card.component.scss'
})
export class BigCardComponent implements OnChanges {

  app = inject(AppComponent);

  @Input() selectedPokemon: any;
  @Input() pokemonList!: any[];

  @ViewChild('ctx', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  bigCardOpen: boolean = false;
  isLoading = false;

  constructor(private cdRef: ChangeDetectorRef) { }


  /**
   * Called when the component's inputs change.
   *
   * Checks if either the pokemonList or selectedPokemon inputs have changed.
   * If either has changed, it calls ChangeDetectorRef.detectChanges() to
   * trigger a change detection cycle, which will update the component's
   * template with the new values.
   *
   * @param changes The changes object as passed to the ngOnChanges lifecycle
   *                hook.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemonList'] || changes['selectedPokemon']) {
      this.cdRef.detectChanges();
    }
  }


  /**
   * Opens the big card by setting bigCardOpen to true and changing the
   * document body's overflow style to "hidden" to prevent scrolling.
   */
  openPokedex() {
    this.bigCardOpen = true;
    document.body.style.overflow = 'hidden';
  }


  /**
   * Switches to the next Pokemon in the list by setting selectedPokemon to the
   * next Pokemon in the list and setting isLoading to true. After 300ms, sets
   * isLoading to false.
   *
   * If isLoading is true, does nothing.
   */
  nextPokemon() {
    if (!this.isLoading) {
      const currentIndex = this.pokemonList.findIndex(pokemon => pokemon.id === this.selectedPokemon.id);
      const nextIndex = (currentIndex + 1) % this.pokemonList.length;
      this.selectedPokemon = this.pokemonList[nextIndex];
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    }
  }


  /**
   * Switches to the previous Pokemon in the list by setting selectedPokemon to the
   * previous Pokemon in the list and setting isLoading to true. After 300ms, sets
   * isLoading to false.
   *
   * If isLoading is true, does nothing.
   */
  previousPokemon() {
    if (!this.isLoading) {
      const currentIndex = this.pokemonList.findIndex(pokemon => pokemon.id === this.selectedPokemon.id);
      const previousIndex = (currentIndex - 1 + this.pokemonList.length) % this.pokemonList.length;
      this.selectedPokemon = this.pokemonList[previousIndex];
      console.log('PokemonList: ', this.pokemonList[previousIndex]);
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    }
  }


  /**
   * Returns a CSS linear gradient string based on the Pokemon's types.
   *
   * If the Pokemon has two types, the gradient will go from the first type's color
   * to the second type's color. If the Pokemon only has one type, the gradient will
   * be a solid color of that type.
   *
   * @param pokeonColorOne The color of the Pokemon's first type.
   * @param pokeonColorTwo The color of the Pokemon's second type.
   * @returns A CSS linear gradient string.
   */
  gradientColor(pokeonColorOne: string, pokeonColorTwo: string) {
    if (this.app.getPokemonTypeColors(
      this.selectedPokemon.details?.types[1]?.type.name
    )) {
      return `linear-gradient(90deg, 
              ${pokeonColorTwo} 0%, 
              ${pokeonColorOne} 10%, 
              ${pokeonColorOne} 50%, 
              ${pokeonColorOne} 90%, 
              ${pokeonColorTwo} 100%)`;
    } else {
      return this.app.getPokemonTypeColors(
        this.selectedPokemon.details?.types[0]?.type.name
      )
    }
  }
}
