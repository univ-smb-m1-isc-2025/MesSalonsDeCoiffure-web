import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEtablissementComponent } from './card-etablissement.component';

describe('CardEtablissementComponent', () => {
  let component: CardEtablissementComponent;
  let fixture: ComponentFixture<CardEtablissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEtablissementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
