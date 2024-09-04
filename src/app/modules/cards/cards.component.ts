
import { Component, inject, OnInit } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';
import { BigCardComponent } from '../big-card/big-card.component';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [BigCardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {

  main = inject(MainComponent);
  bigCard = inject(BigCardComponent);


  constructor(private pokemonService: PokemonService) { }


  ngOnInit(): void {

  }


  openBigPokedex() {
    this.bigCard.dNone()
  }
}
