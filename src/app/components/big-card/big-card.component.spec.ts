import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppComponent } from '../../app.component';
import { BigCardComponent } from './big-card.component';

describe('BigCardComponent', () => {
  let component: BigCardComponent;
  let fixture: ComponentFixture<BigCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigCardComponent],
      providers: [AppComponent, HttpClient, HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BigCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngAfterViewInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
