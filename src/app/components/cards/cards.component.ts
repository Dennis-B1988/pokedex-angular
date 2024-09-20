import { Component, inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { BigCardComponent } from '../big-card/big-card.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [BigCardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  app = inject(AppComponent);
  bigCard = inject(BigCardComponent);


  constructor() { }


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
   * Opens the big card with the selected Pokemon and its list
   * @param pokemon - The selected Pokemon
   */
  openBigPokedex(pokemon: any) {
    this.bigCard.selectedPokemon = pokemon;
    this.bigCard.pokemonList = this.app.pokemonSaved;
    this.bigCard.openPokedex();
  }
}
