import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-stats-chart',
  standalone: true,
  imports: [],
  templateUrl: './stats-chart.component.html',
  styleUrl: './stats-chart.component.scss'
})
export class StatsChartComponent implements OnChanges {

  @Input() selectedPokemon: any;
  @Input() ctx!: ElementRef<HTMLCanvasElement>;


  chart: Chart | null = null;

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ctx'] || changes['selectedPokemon']) {
      if (this.ctx && this.selectedPokemon?.details?.stats) {
        this.setCanvasDimensions();
        this.pokemonChart();
      }
    }
  }


  setCanvasDimensions() {
    if (this.ctx) {
      const canvas = this.ctx.nativeElement;
      canvas.width = 350;
      canvas.height = 250;
    }
  }


  pokemonChart() {
    const canvas = this.ctx.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      if (this.chart) {
        this.chart.destroy();
      }

      const stats = this.selectedPokemon.details.stats;

      this.chart = new Chart(context, {
        type: 'bar',
        data: {
          labels: ['HP', 'ATK', 'DEF', 'SP-ATK', 'SP-DEF', 'SPEED'],
          datasets: [{
            label: 'Pokemon Stats',
            data: [
              stats[0]?.base_stat ?? 0,
              stats[1]?.base_stat ?? 0,
              stats[2]?.base_stat ?? 0,
              stats[3]?.base_stat ?? 0,
              stats[4]?.base_stat ?? 0,
              stats[5]?.base_stat ?? 0,
            ],
            backgroundColor: [
              '#FF5959',
              '#F5AC78',
              '#FAE078',
              '#9DB7F5',
              '#A7DB8D',
              '#FA92B2',
            ],
            borderColor: [
              this.selectedPokemon.pokemonTypeColors?.[this.selectedPokemon.types[0]?.type?.name] ?? '#000',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              max: 255,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          indexAxis: 'x',
          responsive: true,
          maintainAspectRatio: false,
          events: ['mousemove', 'mouseout', 'touchstart', 'touchmove'],
        }
      });
    }
  }
}

