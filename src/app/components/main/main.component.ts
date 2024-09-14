import { Component, inject, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
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
export class MainComponent {

  bigCard = inject(BigCardComponent);


  constructor(public app: AppComponent) { }


  closePokedex(): void {
    this.bigCard.bigCardOpen = false;
    document.body.style.overflow = 'auto';
    console.log('bigCardOpen: ', this.bigCard.bigCardOpen);
  }
}
