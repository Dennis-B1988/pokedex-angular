import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppComponent } from '../../app.component';
import { BigCardComponent } from '../big-card/big-card.component';
import { CardsComponent } from '../cards/cards.component';
import { SearchComponent } from '../search/search.component';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [AppComponent, HttpClient, HttpHandler, BigCardComponent, SearchComponent, CardsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
