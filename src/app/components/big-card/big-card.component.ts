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
   * Detects changes in `pokemonList` or `selectedPokemon` inputs and triggers change detection.
   * @param changes - Object containing the changes to the inputs.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonList'] || changes['selectedPokemon']) {
      this.cdRef.detectChanges();
    }
  }


  /**
   * Opens the big card, preventing the document body from scrolling.
   */
  openPokedex(): void {
    this.bigCardOpen = true;
    document.body.style.overflow = 'hidden';
  }


  /**
   * Switches to the next Pokémon in the list, with a short delay to simulate loading.
   * Prevents switching while already loading.
   */
  nextPokemon(): void {
    if (!this.isLoading) {
      this.changePokemon(1);
    }
  }


  /**
   * Switches to the previous Pokémon in the list, with a short delay to simulate loading.
   * Prevents switching while already loading.
   */
  previousPokemon(): void {
    if (!this.isLoading) {
      this.changePokemon(-1);
    }
  }


  /**
   * Changes the selected Pokémon by shifting the index within the list.
   * Adds loading delay before allowing further changes.
   * @param direction - +1 for next, -1 for previous.
   */
  private changePokemon(direction: number): void {
    const currentIndex = this.pokemonList.findIndex(pokemon => pokemon.id === this.selectedPokemon?.id);
    const newIndex = (currentIndex + direction + this.pokemonList.length) % this.pokemonList.length;
    this.selectedPokemon = this.pokemonList[newIndex];
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }


  /**
   * Calculates the gradient background color based on the Pokémon's types.
   * If two types are present, it returns a linear gradient; otherwise, it returns a solid color.
   * @param primaryColor - Primary type color.
   * @param secondaryColor - Secondary type color.
   * @returns A CSS linear gradient string or solid color.
   */
  gradientColor(primaryColor: string, secondaryColor: string): string {
    const hasTwoTypes = !!this.selectedPokemon?.details?.types[1]?.type.name;
    return hasTwoTypes
      ? this.createGradient(primaryColor, secondaryColor)
      : this.app.getPokemonTypeColors(this.selectedPokemon?.details?.types[0]?.type.name);
  }


  /**
   * Helper method to create a linear gradient string.
   * @param color1 - First color in the gradient.
   * @param color2 - Second color in the gradient.
   * @returns A CSS linear gradient string.
   */
  private createGradient(color1: string, color2: string): string {
    return `linear-gradient(90deg, ${color2} 0%, ${color1} 10%, ${color1} 50%, ${color1} 90%, ${color2} 100%)`;
  }
}
