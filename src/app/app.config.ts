import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { BigCardComponent } from './components/big-card/big-card.component';
import { CardsComponent } from './components/cards/cards.component';
import { MainComponent } from './components/main/main.component';
import { SearchComponent } from './components/search/search.component';
import { StatsChartComponent } from './components/stats-chart/stats-chart.component';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(),
    AppComponent,
    MainComponent,
    CardsComponent,
    BigCardComponent,
    SearchComponent,
    StatsChartComponent
  ],
};
