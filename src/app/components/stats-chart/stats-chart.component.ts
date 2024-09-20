import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart, { ChartConfiguration } from 'chart.js/auto';

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

  private readonly labels = ['HP', 'ATK', 'DEF', 'SP-ATK', 'SP-DEF', 'SPEED'];
  private readonly backgroundColors = [
    '#FF5959', '#F5AC78', '#FAE078', '#9DB7F5', '#A7DB8D', '#FA92B2'
  ];
  private readonly yMaxValue = 255;


  /**
   * Detects changes in `selectedPokemon` or `ctx` inputs and updates the chart
   * if both are defined.
   * @param changes - Object containing the changes to the inputs.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ctx'] || changes['selectedPokemon']) {
      if (this.ctx && this.selectedPokemon?.details?.stats) {
        this.updateChart();
      }
    }
  }


  /**
   * Set up the Pokemon chart.
   */
  private updateChart(): void {
    this.createOrUpdateChart();
  }


  /**
   * Create or update the Pokemon stats chart.
   */
  private createOrUpdateChart(): void {
    const canvas = this.ctx.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      if (this.chart) {
        this.chart.destroy(); // Destroy the existing chart if it exists
      }

      // Extract the Pokemon stats
      const stats = this.selectedPokemon.details.stats.map((stat: any) => stat?.base_stat ?? 0);

      this.chart = new Chart(context, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Pokemon Stats',
            data: stats,
            backgroundColor: this.backgroundColors,
            borderColor: [
              this.getPokemonBorderColor() ?? '#000' // Use default color if not available
            ],
            borderWidth: 1,
          }],
        },
        options: this.getChartOptions(),
      });
    }
  }


  /**
   * Chart.js configuration options.
   */
  private getChartOptions(): ChartConfiguration<'bar'>['options'] {
    return {
      scales: {
        y: {
          max: this.yMaxValue,
          ticks: {
            color: 'white',
          },
          grid: {
            color: '#6b6b6b',
          }
        },
        x: {
          ticks: {
            color: 'white',
          },
          grid: {
            color: '#6b6b6b',
          }
        },
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            color: 'white',
          }
        },
      },
      indexAxis: 'x',
      responsive: true,
      maintainAspectRatio: false,
      events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
    };
  }


  /**
   * Get the border color based on Pokemon's primary type.
   */
  private getPokemonBorderColor(): string | undefined {
    const primaryType = this.selectedPokemon.details?.types?.[0]?.type?.name;
    return this.selectedPokemon.pokemonTypeColors?.[primaryType];
  }
}