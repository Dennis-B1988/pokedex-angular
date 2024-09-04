import { Component } from '@angular/core';

@Component({
  selector: 'app-big-card',
  standalone: true,
  imports: [],
  templateUrl: './big-card.component.html',
  styleUrl: './big-card.component.scss'
})
export class BigCardComponent {

  bigCard: boolean = false;

  dNone() {
    this.bigCard = !this.bigCard;
  }
}
