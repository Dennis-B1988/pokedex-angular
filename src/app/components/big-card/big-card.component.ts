import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';

@Component({
  selector: 'app-big-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './big-card.component.html',
  styleUrl: './big-card.component.scss'
})
export class BigCardComponent {

  @Input() selectedPokemon: any;

  bigCardOpen: boolean = false;


  constructor(private cdRef: ChangeDetectorRef, public pokemonService: PokemonService) { }


  dNone() {
    this.bigCardOpen = !this.bigCardOpen;
    console.log('bigCardOpen: ', this.bigCardOpen);
    if (this.bigCardOpen) {
      document.body.style.overflow = 'hidden';
      console.log('Selected Pokemon in Big Card:', this.selectedPokemon);
    } else {
      document.body.style.overflow = 'auto';
    }
    this.cdRef.detectChanges();
  }


  nextPokemon() {

  }
}
