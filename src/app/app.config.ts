import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BigCardComponent } from './modules/big-card/big-card.component';
import { CardsComponent } from './modules/cards/cards.component';
import { SearchComponent } from './modules/search/search.component';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(),
    CardsComponent,
    BigCardComponent,
    SearchComponent
  ],
};
