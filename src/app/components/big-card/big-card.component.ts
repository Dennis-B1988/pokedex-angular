import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, inject, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { StatsChartComponent } from '../stats-chart/stats-chart.component';

@Component({
  selector: 'app-big-card',
  standalone: true,
  imports: [CommonModule, StatsChartComponent],
  templateUrl: './big-card.component.html',
  styleUrl: './big-card.component.scss'
})
export class BigCardComponent implements OnChanges {

  app = inject(AppComponent);

  @Input() selectedPokemon: any;
  @Input() pokemonList!: any[];

  @ViewChild('ctx', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  bigCardOpen: boolean = false;
  isLoading = false;

  constructor(private cdRef: ChangeDetectorRef) { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemonList'] || changes['selectedPokemon']) {
      this.cdRef.detectChanges();
    }
  }


  openPokedex() {
    this.bigCardOpen = true;
    console.log('bigCardOpen: ', this.bigCardOpen);
    document.body.style.overflow = 'hidden';
    console.log('Selected Pokemon in Big Card:', this.selectedPokemon);
    document.body.style.overflow = 'auto';
    this.cdRef.detectChanges();
  }


  nextPokemon() {
    if (!this.isLoading) {
      const currentIndex = this.pokemonList.findIndex(pokemon => pokemon.id === this.selectedPokemon.id);
      const nextIndex = (currentIndex + 1) % this.pokemonList.length;
      this.selectedPokemon = this.pokemonList[nextIndex];
      console.log('PokemonList: ', this.pokemonList[nextIndex]);
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    }
  }


  previousPokemon() {
    if (!this.isLoading) {
      const currentIndex = this.pokemonList.findIndex(pokemon => pokemon.id === this.selectedPokemon.id);
      const previousIndex = (currentIndex - 1 + this.pokemonList.length) % this.pokemonList.length;
      this.selectedPokemon = this.pokemonList[previousIndex];
      console.log('PokemonList: ', this.pokemonList[previousIndex]);
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    }
  }


  gradientColor(pokeonColorOne: string, pokeonColorTwo: string) {
    if (this.app.getPokemonTypeColors(
      this.selectedPokemon.details?.types[1]?.type.name
    )) {
      return `linear-gradient(90deg, 
              ${pokeonColorTwo} 0%, 
              ${pokeonColorOne} 10%, 
              ${pokeonColorOne} 50%, 
              ${pokeonColorOne} 90%, 
              ${pokeonColorTwo} 100%)`;
    } else {
      return this.app.getPokemonTypeColors(
        this.selectedPokemon.details?.types[0]?.type.name
      )
    }
  }
}
