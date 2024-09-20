import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchService = inject(SearchService);

  public input: string = '';
  public getScreenWidth: any;


  /**
   * Sets the initial screen width value.
   */
  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
  }


  @HostListener('window:resize', ['$event'])
  /**
   * Updates the `getScreenWidth` property with the current window width on resize
   */
  onResize() {
    this.getScreenWidth = window.innerWidth;
  }


  /**
   * Calls the `setSearchTerm` method on the `searchService` with the current
   * `input` value.
   */
  onSearchChange() {
    this.searchService.setSearchTerm(this.input);
  }
}
