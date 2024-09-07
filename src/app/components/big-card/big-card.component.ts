import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-big-card',
  standalone: true,
  imports: [],
  templateUrl: './big-card.component.html',
  styleUrl: './big-card.component.scss'
})
export class BigCardComponent {

  @Input() selectedPokemon: any;

  bigCardOpen: boolean = false;


  constructor() { }


  dNone() {
    this.bigCardOpen = !this.bigCardOpen;
    // console.log('bigCardOpen: ', this.bigCardOpen);
    if (this.bigCardOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // console.log('Selected Pokemon in Big Card:', this.selectedPokemon);
  }
}
