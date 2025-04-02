import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowEtablissementComponent } from './row-etablissement.component';

describe('RowEtablissementComponent', () => {
  let component: RowEtablissementComponent;
  let fixture: ComponentFixture<RowEtablissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowEtablissementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
