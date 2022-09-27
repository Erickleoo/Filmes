import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmesDialogComponent } from './filmes-dialog.component';

describe('FilmesDialogComponent', () => {
  let component: FilmesDialogComponent;
  let fixture: ComponentFixture<FilmesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
