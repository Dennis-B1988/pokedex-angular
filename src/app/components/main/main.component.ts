import { Component, inject, OnInit } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';
import { BigCardComponent } from '../big-card/big-card.component';
import { CardsComponent } from '../cards/cards.component';
import { HeaderComponent } from '../header/header.component';
import { SearchResultComponent } from '../search-result/search-result.component';
import { SearchComponent } from '../search/search.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, CardsComponent, BigCardComponent, SearchComponent, SearchResultComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  bigCard = inject(BigCardComponent);


  constructor(public pokemonService: PokemonService) { }


  ngOnInit(): void {
    this.pokemonService.getPokemons();
  }


  loadMorePokemons(): void {
    if (this.pokemonService.pokemonCount < this.pokemonService.pokemonMax) {
      this.increasePokemonMax();
      this.pokemonService.getPokemons();
      console.log(this.pokemonService.pokemonCount);
      console.log(this.pokemonService.pokemonShown);
    }
  }


  increasePokemonMax(): void {
    if ((this.pokemonService.pokemonCount + 36) < this.pokemonService.pokemonMax) {
      this.pokemonService.pokemonShown += 36;
    } else {
      this.pokemonService.pokemonShown = this.pokemonService.pokemonMax;
    }
  }


  closePokedex(): void {
    this.bigCard.bigCardOpen = false;
    document.body.style.overflow = 'auto';
    console.log('bigCardOpen: ', this.bigCard.bigCardOpen);
  }
}
