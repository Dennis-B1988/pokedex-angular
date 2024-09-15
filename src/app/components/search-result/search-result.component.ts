import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CardsComponent } from '../cards/cards.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CardsComponent, CommonModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {

  app = inject(AppComponent);
  search = inject(SearchComponent);
  card = inject(CardsComponent)


  constructor() { }
}
