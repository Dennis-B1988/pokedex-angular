import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environment/environment';
import { PokeAPI, PokemonDetails, PokemonType, pokemonTypeColors, Results } from '../../core/models/pokemon.interface';
import { PokemonService } from '../../core/services/pokemon.service';
import { BigCardComponent } from '../big-card/big-card.component';
import { CardsComponent } from '../cards/cards.component';
import { HeaderComponent } from '../header/header.component';
import { SearchResultComponent } from "../search-result/search-result.component";
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, CardsComponent, SearchComponent, BigCardComponent, SearchResultComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  // pokemon = inject(CardsComponent);
  // @Input() id!: number;


  url = environment.pokemonURL;
  pokemons!: PokeAPI;

  pokemonSaved: any[] = [];

  constructor(private pokemonService: PokemonService) { }


  ngOnInit(): void {
    // this.pokemonService.getPokemonId().subscribe({
    //   next: (name: string) => {
    //     this.pokemonName = name;
    //     console.log(name);
    //   },

    // });
    this.getPokemons();
    console.log(this.pokemonSaved);
    // console.log(this.pokemonSaved[0].details.types[0]);
  }


  getPokemons(): void {
    this.pokemonService.getPokemon().subscribe((data: PokeAPI) => {
      this.pokemons = data;

      if (this.pokemons.results && this.pokemons.results.length) {
        this.pokemons.results.forEach((pokemon, index) => {
          pokemon.id = pokemon.url.split('/')[
            pokemon.url.split('/').length - 2
          ];
          this.pokemonSaved.push(pokemon);

          this.getPokemonDetails(pokemon, index);
          // this.getPokemonSpeciesDetails(pokemon);
        });
      }
    });
  }


  getPokemonDetails(pokemon: Results, index: number): void {
    this.pokemonService
      .getPokemonDetails(pokemon.name)
      .subscribe((details: PokemonDetails) => {
        pokemon.details = details;

        // if (pokemon.id === '151') {
        // this.pokemonsLoaded = true;
        // this.exportPokemons.emit(this.pokemons.results);
        // console.log(this.pokemonSaved[0].details?.types?.[0]);

        // console.log(`Details for ${pokemon.name}:`, pokemon.details);

        // if (pokemon.details && pokemon.details.types) {
        // console.log(`Types for ${pokemon.name}:`, pokemon.details.types);
        // this.getPokemonTypes();
        // console.log(`${pokemon.name}: ${pokemon.details.types
        //   .map((typeInfo: PokemonType) => typeInfo.type.name)
        //   .join(', ')}`);
      }


        // }
        // }
      );
  }


  getPokemonTypes(): void {
    this.pokemonSaved.forEach(pokemon => {
      // if (pokemon.types && pokemon.details.types) {
      console.log(`${pokemon.name}: ${pokemon.details.types
        .map((typeInfo: PokemonType) => typeInfo.type.name)
        .join(', ')}`);
      // }
    })
  }


  getPokemonTypeColors(type: string): string {
    if (type) {
      return '#' + pokemonTypeColors[type as keyof typeof pokemonTypeColors];
    } else {
      return '';
    }
  }
}
