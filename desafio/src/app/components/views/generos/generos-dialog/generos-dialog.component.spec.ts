import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerosDialogComponent } from './generos-dialog.component';

describe('GenerosDialogComponent', () => {
  let component: GenerosDialogComponent;
  let fixture: ComponentFixture<GenerosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerosDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
