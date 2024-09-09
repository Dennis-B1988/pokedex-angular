
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';
import { BigCardComponent } from '../big-card/big-card.component';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, BigCardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  main = inject(MainComponent);
  bigCard = inject(BigCardComponent);


  constructor(public pokemonService: PokemonService) { }


  openBigPokedex(pokemon: any) {
    console.log('Selected Pokemon:', pokemon.name);
    this.bigCard.selectedPokemon = pokemon;
    console.log(this.pokemonService.getPokemonTypeColors(
      pokemon.details?.types[0].type.name
    ));
    this.bigCard.dNone()
  }
}
