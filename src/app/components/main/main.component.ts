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

  // pokemons = inject(CardsComponent);
  bigCard = inject(BigCardComponent);



  // url = environment.pokemonURL;
  // pokemons!: PokeAPI;

  // pokemonSaved: any[] = [];

  // index: number = 20;

  constructor(private pokemonService: PokemonService) { }


  ngOnInit(): void {
    // this.getPokemons();
    // console.log(this.pokemonSaved);
    // console.log(this.pokemonSaved[0].details.types[0]);
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
}
