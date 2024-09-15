
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { BigCardComponent } from '../big-card/big-card.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, BigCardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  app = inject(AppComponent);
  bigCard = inject(BigCardComponent);


  constructor() { }


  openBigPokedex(pokemon: any) {
    console.log('Selected Pokemon:', pokemon.name);
    this.bigCard.selectedPokemon = pokemon;
    this.bigCard.pokemonList = this.app.pokemonSaved;
    this.bigCard.openPokedex();
  }
}
