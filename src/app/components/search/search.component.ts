import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../core/services/pokemon.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  pokemonType: string = '';
  searchTerm!: number;

  constructor(private pokemonService: PokemonService) { }


  ngOnInit(): void { }


  search() {

  }

  // search() {
  //   this.pokemonService.getPokemonId(this.searchTerm).subscribe({
  //     next: (type: string) => {
  //       this.pokemonType = type;
  //       console.log(type);
  //     },

  //   })
  // }
}
