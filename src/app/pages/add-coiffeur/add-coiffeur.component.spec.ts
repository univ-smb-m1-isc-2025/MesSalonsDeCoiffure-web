import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoiffeurComponent } from './add-coiffeur.component';

describe('AddCoiffeurComponent', () => {
  let component: AddCoiffeurComponent;
  let fixture: ComponentFixture<AddCoiffeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCoiffeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCoiffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
