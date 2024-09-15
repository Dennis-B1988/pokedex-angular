import { Component, HostListener, inject, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  search = inject(SearchComponent);

  public getScreenWidth: any;

  constructor() { }


  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getScreenWidth = window.innerWidth;
  }


  searchPokemon() { }
}
