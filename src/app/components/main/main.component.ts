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
    this.increasePokemonMax();
    this.pokemonService.getPokemons();
    console.log(this.pokemonService.pokemonCount);
    console.log(this.pokemonService.pokemonMax);
  }


  increasePokemonMax(): void {
    let pokemonCount = this.pokemonService.pokemonCount;
    let pokemonMax = this.pokemonService.pokemonMax;
    if (pokemonCount <= pokemonMax) {
      pokemonCount += 20;
      pokemonMax += 20;
    }
  }


  closePokedex(): void {
    this.bigCard.bigCardOpen = false;
    document.body.style.overflow = 'auto';
    console.log('bigCardOpen: ', this.bigCard.bigCardOpen);
  }
}
