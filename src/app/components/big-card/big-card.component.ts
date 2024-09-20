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
   * @returns A CSS linear gradient string or solid color.
   */
  getGradientBackground(): string {
    const typeOne = this.app.getPokemonTypeColors(this.selectedPokemon?.details?.types[0]?.type?.name);
    const typeTwo = this.app.getPokemonTypeColors(this.selectedPokemon?.details?.types[1]?.type?.name);
    return this.gradientColor(typeOne, typeTwo);
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


  /**
   * Formats a Pokemon's ID to be 3 digits.
   * @param id - The Pokemon's ID.
   * @returns The Pokemon's ID as a 3-digit string.
   */
  formatPokemonId(id: number): string {
    if (id < 10) return `000${id}`;
    if (id < 100) return `00${id}`;
    return id.toString();
  }


  /**
   * Returns the URL of the Pokémon's official artwork image.
   * If the image is not available, returns an empty string.
   * @returns The URL of the Pokémon's official artwork image.
   */
  getPokemonImage(): string {
    return this.selectedPokemon?.details?.sprites?.other['official-artwork'].front_default;
  }


  /**
   * Returns the color associated with the given Pokémon type.
   * @param typeName - Name of the Pokémon type.
   * @returns The color associated with the given type.
   */
  getPokemonTypeColor(typeName: string): string {
    return this.app.getPokemonTypeColors(typeName);
  }


  /**
   * Returns the color associated with the first type of the selected Pokémon.
   * @returns The color associated with the first type of the selected Pokémon.
   */
  getPrimaryTypeColor(): string {
    return this.app.getPokemonTypeColors(this.selectedPokemon?.details?.types[0]?.type?.name);
  }


  /**
   * Formats a Pokemon's height in decimeters to be in meters with 1 decimal place.
   * @param height - The Pokemon's height in decimeters.
   * @returns The Pokemon's height in meters as a string with 1 decimal place.
   */
  getFormattedHeight(height: number): string {
    return height ? `${height / 10} m` : '';
  }


  /**
   * Formats a Pokemon's weight in hectograms to be in kilograms with 1 decimal place.
   * @param weight - The Pokemon's weight in hectograms.
   * @returns The Pokemon's weight in kilograms as a string with 1 decimal place.
   */
  getFormattedWeight(weight: number): string {
    return weight ? `${weight / 10} kg` : '';
  }
}
