import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtablishmentComponent } from './add-etablishment.component';

describe('AddEtablishmentComponent', () => {
  let component: AddEtablishmentComponent;
  let fixture: ComponentFixture<AddEtablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEtablishmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEtablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
